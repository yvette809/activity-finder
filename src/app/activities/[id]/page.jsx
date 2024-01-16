import Link from "next/link";
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

const page = async ({ params }) => {
  const { id } = params;
  const activity = await getActivity(id);
  const {
    _id,
    creator,
    typeOfActivity,
    location,
    description,
    date,
    duration,
    capacity,
    price,
    status,
    imageSrc,
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
        <p className="text-lg font-semibold mb-2">Location: {location}</p>
        <p className="text-gray-600 mb-2">Description: {description}</p>
        <p className="text-gray-600 mb-2">Date: {date}</p>
        <p className="text-gray-600 mb-2">Duration: {duration} hours</p>
        <p className="text-gray-600 mb-2">Capacity: {capacity} people</p>
        <p className="text-gray-600 mb-2">Price: ${price}</p>
        <p className="text-gray-600 mb-2">Status: {status}</p>
      </div>
      <div className="book">
        <Link href={`/activities/${_id}/booking`}>
          <button className="bg-primary-blue">Book Activity</button>
        </Link>
      </div>
    </div>
  );
};

export default page;
