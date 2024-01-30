// StarRating.js
const StarRating = ({ rating }) => {
  const starColors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF"];

  return (
    <div className="flex">
      {starColors.map((color, index) => (
        <svg
          key={index}
          fill={index < rating ? color : "gray"}
          stroke="gray"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 18l2.6 1.75-.975-3.175L14.2 14l-3.2-.225L12 10l-1.025 3.775-3.2.225L9.4 14l.375 2.575L12 18zm0 0" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
