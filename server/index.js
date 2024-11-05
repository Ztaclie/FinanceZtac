const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
