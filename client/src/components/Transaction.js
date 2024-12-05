const Transaction = ({ id, description, amount, onDeleteClick }) => {
  return (
    <div className="Transaction">
      <li
        key={id}
        className="flex justify-between items-center p-4 bg-base-100 rounded-lg shadow-md"
      >
        <span>
          {description} - ${amount}
        </span>
        <button
          onClick={() => onDeleteClick(id)}
          className="btn btn-error text-white"
        >
          Delete
        </button>
      </li>
    </div>
  );
};

export default Transaction;
