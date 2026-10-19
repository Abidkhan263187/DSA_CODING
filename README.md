# AK AlgoTrack — DSA Tracker

A full-stack DSA Sheet Web Application built using Next.js, Node.js, Express.js, and MongoDB. It helps users organize their DSA preparation and track problem-solving progress.

## Tech Stack

- **Frontend:** Next.js, React, JavaScript, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT **

## Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- A MongoDB database or MongoDB Atlas connection string
- Git (optional, if downloading the ZIP)

## Getting Started

### 1. Download or Clone the Repository

**Option A: Clone using Git**

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd DSA_TRACKER
```

**Option B: Download ZIP**

1. Open the GitHub repository.
2. Click **Code → Download ZIP**.
3. Extract the ZIP file.
4. Open the extracted project folder in your terminal or VS Code.

### 2. Configure the Backend

Open a terminal in the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your actual MongoDB connection string and a secure JWT secret.

Start the backend:

```bash
npm run dev
```

Use `npm start` instead if that is the start script defined in your backend `package.json`.

### 3. Configure the Frontend

Open a **new terminal** in the frontend folder:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Make sure the URL matches your backend API configuration.

Start the frontend:

```bash
npm run dev
```

### 4. Open the Application

Visit:

**http://localhost:3000**

Register an account or sign in to start using the application.

## Important Notes

- Both frontend and backend servers must be running simultaneously.
- Configure valid environment variables before starting the application.
- Never commit `.env` or `.env.local` files containing secrets.
- Ensure MongoDB is accessible from your machine or configured database network.

## Author

**Abid Khan**

MERN Stack Developer

[LinkedIn](https://www.linkedin.com/in/abid-khan-325795182/)