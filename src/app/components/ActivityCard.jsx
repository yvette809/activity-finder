import Link from "next/link";

const ActivityCard = ({ activity }) => {
  if (!activity || !activity.creator) {
    // Handle the case where creator is missing
    return <p>Creator information not available</p>;
  }

  const { imageSrc, creator, typeOfActivity, location, _id, date } = activity;
  const { firstName, lastName } = creator;

  return (
    <div className="bg-white p-4 m-2 rounded-md shadow-md" key={_id}>
      {imageSrc && (
        <Link href={`/activities/${_id}`}>
          <img
            src={imageSrc}
            alt={`Image for ${firstName && firstName}'s activity`}
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
        </Link>
      )}
      <p className="text-lg font-semibold">{firstName && firstName}</p>
      <p className="text-gray-600 mb-2">{typeOfActivity}</p>
      <p className="text-gray-600">{location}</p>
      <p>Date: {date}</p>
    </div>
  );
};

export default ActivityCard;
