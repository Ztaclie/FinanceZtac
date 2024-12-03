import React, { useState, useEffect } from "react";
import {
  deleteTransaction,
  getTransactions,
  addTransaction,
} from "../services/transactionService";

import Modal from "../components/Modal";
import Transaction from "../components/Transaction";
import Card from "../components/Card";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summaryDate, setSummaryDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("main");
  const [showTotalSummary, setShowTotalSummary] = useState(true);
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

  const getTotalSummary = (date) => {
    const dateTransactions = date
      ? transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date)
            .toISOString()
            .split("T")[0];
          return transactionDate === date;
        })
      : transactions;

    const totalIncome = dateTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const totalExpense = dateTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    return { totalIncome, totalExpense };
  };

  const handleToggleSummary = (isTotal) => {
    setShowTotalSummary(isTotal);
    if (isTotal) {
      setSummaryDate(new Date().toISOString().split("T")[0]);
    }
  };

  const { totalIncome, totalExpense } = getTotalSummary(
    showTotalSummary ? "" : summaryDate
  );

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
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            <div className="mb-4 flex justify-start items-center gap-4">
              <button
                type="button"
                className={`border-2 px-4 py-2 rounded-lg transition duration-200 ${
                  showTotalSummary
                    ? "bg-blue-600 text-white"
                    : "border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white"
                }`}
                onClick={() => handleToggleSummary(true)}
              >
                Total Summary
              </button>
              <button
                type="button"
                className={`border-2 px-4 py-2 rounded-lg transition duration-200 ${
                  !showTotalSummary
                    ? "bg-blue-600 text-white"
                    : "border-blue-600 text-blue-600 hover:bg-blue-700 hover:text-white"
                }`}
                onClick={() => handleToggleSummary(false)}
              >
                Custom Summary
              </button>
              {!showTotalSummary && (
                <input
                  id="summaryDate"
                  type="date"
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-200 shadow-lg"
                  value={summaryDate}
                  onChange={(e) => setSummaryDate(e.target.value)}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card title={"Total Income"} description={"$" + totalIncome} />
              <Card title={"Total Expense"} description={"$" + totalExpense} />
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
                <Transaction
                  id={transaction._id}
                  description={transaction.description}
                  amount={transaction.amount}
                  onDeleteClick={handleDelete}
                />
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
