import React, { useState, useEffect } from "react";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
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
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.description} - ${transaction.amount}
            <button onClick={() => handleDelete(transaction._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
