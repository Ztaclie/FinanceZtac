import React, { useState } from "react";

function Modal({ isOpen, onClose, onAddTransaction, transactions }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderNumber = transactions.filter((t) => t.type === type).length + 1;
    const transaction = {
      type,
      amount: parseFloat(amount),
      category,
      tags: tags.split(",").map((tag) => tag.trim()),
      date,
      description:
        description ||
        (type === "income"
          ? `Income #${orderNumber}`
          : `Expense #${orderNumber}`),
    };
    onAddTransaction(transaction);
    setDescription("");
    setAmount("");
    setType("income");
    setCategory("");
    setTags("");
    setDate(() => {
      const today = new Date();
      return today.toISOString().split("T")[0];
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-base-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="mb-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="textarea textarea-bordered w-full"
            />
          </div>
          {showAdvanced && (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Tags (comma separated)"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
            </>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="btn btn-secondary mr-2"
            >
              {showAdvanced ? "Hide Advanced" : "Show Advanced"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;
