const express = require("express");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth"); // Assumes you have an auth middleware for protected routes

const router = express.Router();

// Add a new transaction
router.post("/", auth, async (req, res) => {
  try {
    const { type, amount, category, tags, date, description } = req.body;
    const newTransaction = new Transaction({
      userId: req.user.id,
      type,
      amount,
      category,
      tags,
      date,
      description,
    });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all transactions for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a transaction
router.put("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update fields
    Object.assign(transaction, req.body);
    await transaction.save();

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    // Check if transaction exists
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Check if the transaction belongs to the user
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Use deleteOne() on the transaction document
    await Transaction.deleteOne({ _id: req.params.id });
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /:id:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
