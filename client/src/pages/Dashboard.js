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
    <div className="flex min-h-screen bg-base-200">
      <div className="w-64 bg-base-100 p-8 shadow-lg">
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
                className={`btn ${
                  showTotalSummary ? "btn-primary" : "btn-outline btn-primary"
                }`}
                onClick={() => handleToggleSummary(true)}
              >
                Total Summary
              </button>
              <button
                type="button"
                className={`btn ${
                  !showTotalSummary ? "btn-primary" : "btn-outline btn-primary"
                }`}
                onClick={() => handleToggleSummary(false)}
              >
                Custom Summary
              </button>
              {!showTotalSummary && (
                <input
                  id="summaryDate"
                  type="date"
                  className="input input-bordered"
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
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Add Transaction
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-bold mb-4">Incomes</h3>
                <ul className="space-y-4">
                  {transactions
                    .filter((t) => t.type === "income")
                    .map((transaction) => (
                      <Transaction
                        key={transaction._id}
                        id={transaction._id}
                        description={transaction.description}
                        amount={transaction.amount}
                        onDeleteClick={handleDelete}
                      />
                    ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Expenses</h3>
                <ul className="space-y-4">
                  {transactions
                    .filter((t) => t.type === "expense")
                    .map((transaction) => (
                      <Transaction
                        key={transaction._id}
                        id={transaction._id}
                        description={transaction.description}
                        amount={transaction.amount}
                        onDeleteClick={handleDelete}
                      />
                    ))}
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-5">Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <Card title={"Total Income"} description={"$" + totalIncome} />
                <Card
                  title={"Total"}
                  description={"$" + (totalIncome - totalExpense)}
                />
                <Card
                  title={"Total Expense"}
                  description={"$" + totalExpense}
                />
              </div>
            </div>
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
        transactions={transactions} // Pass transactions to Modal
      />
    </div>
  );
}

export default Dashboard;
