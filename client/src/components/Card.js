const Card = ({ title, description }) => {
  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-lg Card">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-2xl">{description}</p>
    </div>
  );
};

export default Card;
