const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  tags: [{ type: String }],
  date: { type: Date, default: Date.now },
  description: { type: String },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
