"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getActivity } from "@/utils/api";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/utils/auth";
import { formatDuration } from "@/utils/formatTime";
import jwt from "jsonwebtoken";

const page = ({ params }) => {
  const [activity, setActivity] = useState({});
  const isAuthenticated = getAuthToken();
  const decodedToken = jwt.decode(isAuthenticated);
  const userInfo = decodedToken?.userInfo || {};
  const router = useRouter();
  const { id } = params;

  // fetch activity
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const fetchedActivity = await getActivity(id);
        setActivity(fetchedActivity);
      } catch (error) {
        console.error("Error fetching activity:", error.message);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

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
    skillLevel,
    ageGroup,
  } = activity;
  // const { firstName, lastName } = creator;

  // handle activity click

  const handleActivityBtnClick = () => {
    if (!isAuthenticated) {
      router.push("/");
    } else {
      router.push(`/activities/${_id}/booking`);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-4 rounded-md shadow-md">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={`Image for ${
              creator?.firstName && creator.firstName
            }'s activity`}
            className="w-full h-60 object-cover mb-4 rounded-md"
          />
        )}
        <h1 className="text-3xl font-bold mb-4">
          {typeOfActivity} with {creator?.firstName} {creator?.lastName}
        </h1>
        <div className="details flex justify-between">
          <div className="details-specs w-2/3 pr-4">
            <p className="text-lg font-semibold mb-2">Location: {location}</p>
            <p className="text-gray-600 mb-2">Description: {description}</p>
            <p className="text-gray-600 mb-2">Capacity: {capacity} people</p>
            <p
              className={`text-gray-600 mb-2 ${
                capacity - activity?.reservations?.length < 5
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Spaces left: {capacity - activity?.reservations?.length}
            </p>
            <p className="text-gray-600 mb-2">Price: ${price}</p>
            <p className="text-gray-600 mb-2">Status: {status}</p>
            <p className="text-gray-600 mb-2">
              Skill Level: {skillLevel && skillLevel}
            </p>
            <p className="text-gray-600 mb-2">
              Age Group: {ageGroup && ageGroup}
            </p>

            <div>
              {activityTimes &&
                activityTimes.map((timeSlot, index) => (
                  <div key={index} className="time-slot mb-2">
                    <p className="text-gray-600">
                      Date: {new Date(timeSlot.startTime).toDateString()}
                    </p>
                    <p className="text-gray-600">
                      Start Time:{" "}
                      {new Date(timeSlot.startTime).toLocaleTimeString()}
                    </p>
                    <p className="text-gray-600">
                      End Time:{" "}
                      {new Date(timeSlot.endTime).toLocaleTimeString()}
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
            <button className="outline_btn mb-3" onClick={handleActivityBtnClick}>
              Book Activity
            </button>
            {isAuthenticated &&
              userInfo?.role === "trainer" &&
              creator?._id === userInfo?._id && (
                <Link href={`/activity/${_id}`}>
                  <button className="blue_btn">Edit Activity</button>
                </Link>
              )}
          </div>
        </div>
      </div>
      {/* Activity reviews will go in here */}
      {/* edit activity button that will open up a modal */}
    </div>
  );
};

export default page;
