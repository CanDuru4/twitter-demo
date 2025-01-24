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
async function addUsers() {
    console.log("Starting to add users...");
    const users = [
        {
            userId: "user001",
            username: "Alice",
            email: "alice@example.com",
            passwordHash: "hashed_password_001",
            profilePicture: "https://example.com/profile/alice.jpg",
            bio: "Lover of tech and art.",
            joinedAt: new Date(),
        },
        {
            userId: "user002",
            username: "Bob",
            email: "bob@example.com",
            passwordHash: "hashed_password_002",
            profilePicture: "https://example.com/profile/bob.jpg",
            bio: "Avid traveler and photographer.",
            joinedAt: new Date(),
        },
    ];

    for (const user of users) {
        await db.collection("users").doc(user.userId).set(user);
        console.log(`User added: ${user.username}`);
    }

    console.log("Finished adding users.");
}

async function addTweets() {
    console.log("Starting to add tweets...");
    const tweets = [
        {
            tweetId: "tweet001",
            content: "Hello world! #welcome",
            authorId: "user001",
            timestamp: new Date(),
            likes: 15,
            hashtags: ["welcome"],
        },
        {
            tweetId: "tweet002",
            content: "Exploring Firebase is fun! #developer #tech",
            authorId: "user002",
            timestamp: new Date(),
            likes: 20,
            hashtags: ["developer", "tech"],
        },
    ];

    for (const tweet of tweets) {
        await db.collection("tweets").doc(tweet.tweetId).set(tweet);
        console.log(`Tweet added: ${tweet.tweetId}`);
    }

    console.log("Finished adding tweets.");
}

async function addTrends() {
    console.log("Starting to add trends...");
    const trends = [
        {
            hashtag: "welcome",
            tweetCount: 150,
            lastUpdated: new Date(),
        },
        {
            hashtag: "developer",
            tweetCount: 200,
            lastUpdated: new Date(),
        },
    ];

    for (const trend of trends) {
        await db.collection("trends").doc(trend.hashtag).set(trend);
        console.log(`Trend added: ${trend.hashtag}`);
    }

    console.log("Finished adding trends.");
}

async function populateDatabase() {
    console.log("Populating the database...");
    await addUsers();
    await addTweets();
    await addTrends();
    console.log("Database populated successfully.");
}

populateDatabase().catch((error) => {
    console.error("Error populating the database:", error);
});
