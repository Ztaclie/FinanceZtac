# Personal Finance Tracker

A web application for tracking personal finances, including income and expenses. Built with a React frontend, Node.js backend, and MongoDB database.

## Features
- User authentication (register/login) with JWT-based authorization.
- Add, view, update, and delete income/expense transactions.
- Categorize transactions and view detailed history.
- Dashboard summarizing income, expenses, and net balance.

## Tech Stack
### Frontend
- **React**: For building the user interface.
- **React Router**: For routing between pages.
- **Axios**: For making HTTP requests.

### Backend
- **Node.js** and **Express**: For building the RESTful API.
- **MongoDB**: For storing user data and transactions.
- **Mongoose**: For interacting with MongoDB.
- **JWT (jsonwebtoken)**: For user authentication.
- **bcrypt**: For secure password hashing.

## Installation
### Prerequisites
- Node.js and npm installed.
- MongoDB connection string (local or MongoDB Atlas).

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-uri>
   JWT_SECRET=<your-secret-key>
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

## Usage
1. Open the application in your browser:
   ```
   http://localhost:3000
   ```
2. Register a new account or log in with existing credentials.
3. Add income or expense transactions via the dashboard.
4. View, edit, or delete transactions.

## API Endpoints
### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in and receive a JWT token.

### Transactions
- `GET /api/transactions`: Get all transactions for the logged-in user.
- `POST /api/transactions`: Add a new transaction.
- `PUT /api/transactions/:id`: Update a transaction by ID.
- `DELETE /api/transactions/:id`: Delete a transaction by ID.

## Folder Structure
```
.
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
├── server
│   ├── models
│   │   ├── User.js
│   │   ├── Transaction.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── transactions.js
│   ├── controllers
│   ├── config
│   │   ├── db.js
│   └── index.js
└── README.md
```

## Future Enhancements
- Add graphical reports for visualizing financial data.
- Include budgeting functionality with category limits.
- Add search and filter options for transactions.
