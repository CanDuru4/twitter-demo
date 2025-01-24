
# Twitter Replica

## **Project Overview**
This project is a **Twitter Replica**, a simple social media application where users can:
- Register and log in.
- Post tweets.
- Like or unlike tweets (only logged-in users).
- View tweets dynamically sorted by time and track the number of likes for each tweet.

The application uses **Firebase** as the backend for authentication and Firestore as the database. The frontend is built using **React** and styled with **CSS** for a clean and responsive user interface.

---

## **Features**
### Core Features:
1. **User Authentication**:
   - Users can register, log in, and log out securely using Firebase Authentication.
   - Passwords are hashed and stored securely.

2. **Tweet Functionality**:
   - Logged-in users can post tweets.
   - Tweets include the content, author, timestamp, and the number of likes.

3. **Like/Unlike Functionality**:
   - Users can like and unlike tweets.
   - A user can only like or unlike a tweet once.

4. **Real-Time Updates**:
   - Tweets and likes are dynamically fetched and updated in real time.

5. **User-Friendly Design**:
   - The UI is responsive and mimics Twitter’s basic layout, focusing on simplicity and usability.

---

## **Development Time**
- **Total Development Time**: Approximately **6-10 hours**.
  - Backend API development: 3 hours
  - Frontend development: 5 hours
  - Styling and bug fixes: 1 hours

---

## **Running the Project Locally**

### Prerequisites
1. **Node.js** (version 14+)
2. **NPM** or **Yarn** package manager
3. **Firebase Account**:
   - Set up a Firebase project.
   - Enable **Firestore** and **Authentication** (Email/Password).
   - Download the `serviceAccountKey.json` file for Firebase Admin SDK.

---

### **Setup Instructions**

#### **1. Clone the Repository**
```bash
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
```

#### **2. Install Dependencies**
For both the frontend and backend, install the required dependencies:
```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

#### **3. Add Firebase Configuration**
- Backend:
  - Place the `serviceAccountKey.json` file in the `backend` directory.
- Frontend:
  - Update the Firebase configuration in `frontend/src/firebase.js` with your Firebase project credentials.

#### **4. Start the Backend**
Run the following command to start the backend server:
```bash
cd backend
node server.js
```
- Backend runs on `http://localhost:5001`.

#### **5. Start the Frontend**
Run the following command to start the frontend:
```bash
cd ../frontend
npm start
```
- Frontend runs on `http://localhost:3000`.

#### **6. Using the Application**
1. Open `http://localhost:3000` in your browser.
2. Register a new user or log in with an existing account.
3. Post tweets and interact with the application.

---

## **Live Deployment or Video Link**
- **Deployment Link** (if deployed): [Add the link to your live deployment]
- **Working Video**: [Add a YouTube or video link if available]

---

## **Future Enhancements**
- Add support for comments on tweets.
- Implement a follow/unfollow system.
- Add hashtag-based tweet filtering.
- Enhance the UI for mobile responsiveness.