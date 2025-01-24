const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const app = express();

app.use(cors());
app.use(express.json());

// Firebase Admin SDK Setup
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Register User
app.post("/api/register", async (req, res) => {
    const { email, password, username, bio } = req.body;

    try {
        const user = await admin.auth().createUser({ email, password });
        await db.collection("users").doc(user.uid).set({
            userId: user.uid,
            username,
            email,
            bio: bio || "No bio available",
            joinedAt: new Date(),
        });
        res.status(200).send({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Like a Tweet
app.post("/api/tweets/:id/like", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const tweetRef = db.collection("tweets").doc(id);
        const tweetDoc = await tweetRef.get();

        if (!tweetDoc.exists) {
            return res.status(404).send({ error: "Tweet not found" });
        }

        const tweetData = tweetDoc.data();
        const likedBy = tweetData.likedBy || [];

        if (likedBy.includes(userId)) {
            return res.status(400).send({ error: "User has already liked this tweet" });
        }

        likedBy.push(userId);
        await tweetRef.update({
            likes: (tweetData.likes || 0) + 1,
            likedBy: likedBy,
        });

        res.status(200).send({ message: "Tweet liked successfully" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Post a Tweet
app.post("/api/tweets", async (req, res) => {
    const { content, userId } = req.body;

    try {
        await db.collection("tweets").add({
            content,
            userId,
            likes: 0,
            likedBy: [],
            timestamp: new Date(),
        });
        res.status(200).send({ message: "Tweet posted successfully" });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
