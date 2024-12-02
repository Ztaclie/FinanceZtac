const Transaction = ({ id, description, amount, onDeleteClick }) => {
  return (
    <div className="Transaction">
      <li
        key={id}
        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
      >
        <span>
          {description} - ${amount}
        </span>
        <button
          onClick={() => onDeleteClick(id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
        >
          Delete
        </button>
      </li>
    </div>
  );
};

export default Transaction;
