# MERN Test Case Management System

A simple Test Case Management System built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- Display, add, update, and delete test cases
- Real-time synchronization with WebSockets

## Prerequisites

- Node.js (v12 or later)
- npm (v6 or later)
- MongoDB (local or Atlas)

## Installation

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/mern-testcase-management.git
    cd testdb/backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file with your MongoDB connection string:

    ```plaintext
    MONGODB_URI=mongodb+srv://yourusername:yourpassword@yourcluster.mongodb.net/yourdbname?retryWrites=true&w=majority&appName=Cluster0
    ```

4. Start the backend server:

    ```bash
    node server.js
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd ..
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the React application:

    ```bash
    npm run dev
    ```

## Usage

- Open your browser and navigate to `http://localhost:5173/`
- Manage your test cases in real-time

## License

MIT

