import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
    collection,
    addDoc,
    getDocs,
    orderBy,
    query,
    doc,
    updateDoc,
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import "./App.css";

function App() {
    const [tweets, setTweets] = useState([]);
    const [content, setContent] = useState("");
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const fetchTweets = async () => {
        const q = query(collection(db, "tweets"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        setTweets(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const postTweet = async () => {
        if (!user) {
            alert("You must be logged in to post a tweet!");
            return;
        }
        await addDoc(collection(db, "tweets"), {
            content,
            userId: user.email,
            username: user.displayName || "",
            likes: 0,
            likedBy: [],
            timestamp: new Date(),
        });
        setContent("");
        fetchTweets();
    };

    const handleRegister = async () => {
        if (!email || !password || !username) {
            alert("All fields are required!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            user.displayName = username;
            await addDoc(collection(db, "users"), {
                userId: user.uid,
                username,
                email,
                bio: "New user",
                profilePicture: "",
                joinedAt: new Date(),
            });
            alert("User registered successfully!");
        } catch (error) {
            alert("Registration failed: " + error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setEmail("");
        setPassword("");
        setUsername("");
    };

    const toggleLikeTweet = async (id) => {
        if (!user) {
            alert("You must be logged in to like/unlike tweets!");
            return;
        }

        const tweetRef = doc(db, "tweets", id);
        const tweet = tweets.find((tweet) => tweet.id === id);

        const updatedLikedBy = tweet.likedBy?.includes(user.uid)
            ? tweet.likedBy.filter((uid) => uid !== user.uid)
            : [...(tweet.likedBy || []), user.uid];

        await updateDoc(tweetRef, {
            likes: updatedLikedBy.length,
            likedBy: updatedLikedBy,
        });

        fetchTweets();
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    return (
        <div className="app">
            <header className="app-header">
                <h1>Twitter Replica</h1>
                {user ? (
                    <div className="user-info">
                        <p>Welcome, {user.email}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="auth-container">
                        <div className="register-container">
                            <h3>Register</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button onClick={handleRegister}>Register</button>
                        </div>
                        <div className="login-container">
                            <h3>Login</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                )}
            </header>
            <main>
                {user && (
                    <div className="tweet-box">
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's happening?"
                        />
                        <button onClick={postTweet}>Tweet</button>
                    </div>
                )}
                <div className="tweets-container">
                    {tweets.map((tweet) => (
                        <div key={tweet.id} className="tweet-card">
                            <p>{tweet.content}</p>
                            <small>By: {tweet.username || tweet.userId}</small>
                            <small>Likes: {tweet.likes || 0}</small>
                            <button
                                onClick={() => toggleLikeTweet(tweet.id)}
                                className={`like-button ${tweet.likedBy?.includes(user?.uid) ? "liked" : ""}`}
                                disabled={!user}
                            >
                                {tweet.likedBy?.includes(user?.uid) ? "Unlike" : "Like"}
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default App;