import Link from "next/link";

// getactivity
export async function getActivity(id) {
  const apiUrl = `http://localhost:3000/api/activities/${id}`;

  try {
    const response = await fetch(apiUrl);
    console.log("response", response);

    if (!response.ok) {
      throw new Error("Failed to fetch activity");
    }

    const activity = await response.json();
    return activity;
  } catch (error) {
    console.error("Error fetching activity:", error.message);
    throw error;
  }
}

// Helper function to format duration
const formatDuration = (startTime, endTime) => {
  const startTimestamp = new Date(startTime).getTime();
  const endTimestamp = new Date(endTime).getTime();

  // Check if the timestamps are valid
  if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
    return "Invalid Time";
  }

  const durationInMilliseconds = endTimestamp - startTimestamp;

  // Convert duration to hours
  const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

  if (durationInHours < 1) {
    return `${Math.round(durationInHours * 60)} mins`;
  } else {
    return durationInHours === 1
      ? `${durationInHours} hr`
      : `${durationInHours} hrs`;
  }
};

const page = async ({ params }) => {
  const { id } = params;
  const activity = await getActivity(id);
  const {
    _id,
    creator,
    typeOfActivity,
    location,
    description,
    capacity,
    price,
    status,
    imageSrc,
    activityTimes,
  } = activity;
  const { firstName, lastName } = creator;

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-4 rounded-md shadow-md">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={`Image for ${firstName}'s activity`}
            className="w-full h-60 object-cover mb-4 rounded-md"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">
          {typeOfActivity} with {firstName} {lastName}
        </h1>
        <div className="details flex justify-between">
          <div className="details-specs w-2/3 pr-4">
            <p className="text-lg font-semibold mb-2">Location: {location}</p>
            <p className="text-gray-600 mb-2">Description: {description}</p>
            <p className="text-gray-600 mb-2">Capacity: {capacity} people</p>
            <p className="text-gray-600 mb-2">Price: ${price}</p>
            <p className="text-gray-600 mb-2">Status: {status}</p>

            <div>
              {activityTimes.map((timeSlot, index) => (
                <div key={index} className="time-slot mb-2">
                  <p className="text-gray-600">
                    Date: {new Date(timeSlot.date).toDateString()}
                  </p>
                  <p className="text-gray-600">
                    Start Time:{" "}
                    {new Date(timeSlot.startTime).toLocaleTimeString()}
                  </p>
                  <p className="text-gray-600">
                    End Time: {new Date(timeSlot.endTime).toLocaleTimeString()}
                  </p>
                  <p>
                    <p>
                      Duration:{" "}
                      {formatDuration(timeSlot.startTime, timeSlot.endTime)}
                    </p>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="book w-1/3">
            <Link href={`/activities/${_id}/booking`}>
              <button className="bg-primary-blue text-white py-2 px-4 rounded-md">
                Book Activity
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Activity reviews will go in here */}
      {/* edit activity button that will open up a modal */}
    </div>
  );
};

export default page;
