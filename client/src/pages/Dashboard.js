import React, { useState, useEffect } from "react";
import {
  deleteTransaction,
  getTransactions,
} from "../services/transactionService";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions(token);
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id, token);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <li
              key={transaction._id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
            >
              <span>
                {transaction.description} - ${transaction.amount}
              </span>
              <button
                onClick={() => handleDelete(transaction._id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
