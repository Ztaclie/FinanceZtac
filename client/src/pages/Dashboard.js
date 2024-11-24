import React, { useState, useEffect } from "react";
import {
  deleteTransaction,
  getTransactions,
  addTransaction,
} from "../services/transactionService";
import Modal from "../components/Modal";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("main");
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

  const handleAddTransaction = async (transaction) => {
    try {
      const response = await addTransaction(transaction, token);
      setTransactions([...transactions, response.data]);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const getTodaySummary = () => {
    const today = new Date().toISOString().split("T")[0];
    const todayTransactions = transactions.filter(
      (transaction) => transaction.date === today
    );
    const totalIncome = todayTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalExpense = todayTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return { totalIncome, totalExpense };
  };

  const { totalIncome, totalExpense } = getTodaySummary();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li
            className={`mb-4 cursor-pointer ${
              activeSection === "main" ? "font-bold" : ""
            }`}
            onClick={() => setActiveSection("main")}
          >
            Main
          </li>
          <li
            className={`mb-4 cursor-pointer ${
              activeSection === "transactions" ? "font-bold" : ""
            }`}
            onClick={() => setActiveSection("transactions")}
          >
            Transactions
          </li>
          <li
            className={`mb-4 cursor-pointer ${
              activeSection === "users" ? "font-bold" : ""
            }`}
            onClick={() => setActiveSection("users")}
          >
            Users
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        {activeSection === "main" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Today's Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Total Income</h3>
                <p className="text-2xl">${totalIncome}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold">Total Expense</h3>
                <p className="text-2xl">${totalExpense}</p>
              </div>
            </div>
          </div>
        )}
        {activeSection === "transactions" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Transactions</h2>
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                onClick={() => setIsModalOpen(true)}
              >
                Add Transaction
              </button>
            </div>
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
        )}
        {activeSection === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Users</h2>
            {/* Add your user management UI here */}
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}

export default Dashboard;
