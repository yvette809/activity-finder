// ReviewForm.js
import { useState } from "react";
import { toast } from "react-hot-toast";

const ReviewForm = ({ activityId, user, setShowModal }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/activities/${activityId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating, comment }),
        }
      );

      if (response.ok) {
        toast.success("Review added successfully!");

        setShowModal(false);
      } else {
        console.error("Failed to add a review:", await response.statusText);
      }
    } catch (error) {
      console.error("Error during review submission:", error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md relative">
        <button
          className="absolute top-2 right-2 text-2xl cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Rating:</label>
            <input
            max={5}
            min={0}
              type="number"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value, 10))}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="text-center">
            <button type="submit" className="outline_btn">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
