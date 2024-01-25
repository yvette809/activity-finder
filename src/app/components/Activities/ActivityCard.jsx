import Link from "next/link";
import moment from "moment";

const ActivityCard = ({ activity }) => {
  /* if (!activity || !activity.creator) {
    // Handle the case where creator is missing
    return <p>Creator information not available</p>;
  } */

  const { imageSrc, creator, typeOfActivity, location, _id, activityTimes } =
    activity;
  const { firstName } = creator;

  return (
    <>
      <div className="shadow-md bg-deep-green rounded-md transition-transform transform hover:scale-105">
        {imageSrc && (
          <Link href={`/activities/${_id}`}>
            <img
              src={imageSrc}
              alt={`Image for ${firstName && firstName}'s activity`}
              className="w-full h-40 object-cover mb-4 rounded-md cursor-pointer"
            />
          </Link>
        )}
        {/* <p className="text-lg font-semibold">{firstName}</p> */}
        <p className="text-gray-900 font-extrabold mb-2">{typeOfActivity}</p>
        <p className="text-gray-600">Location: {location}</p>
        <div>
          <h2>Activity Times</h2>
          <ul>
            {activityTimes.map((activityTime) => (
              <li key={activityTime._id} >
                {moment(activityTime.startTime).format("dddd, MMMM Do")} -{" "}
                {moment(activityTime.endTime).format("h:mm A")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
