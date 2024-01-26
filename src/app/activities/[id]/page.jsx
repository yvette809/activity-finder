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
      <div className="bg-white p-8 rounded-md shadow-md">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={`Image for ${
              creator?.firstName && creator.firstName
            }'s activity`}
            className="w-full h-64 object-cover mb-6 rounded-md shadow-lg"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">
          {typeOfActivity} with {creator?.firstName} {creator?.lastName}
        </h1>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-2/3 pr-4">
            <p className="text-lg font-semibold mb-2">Location: {location}</p>
            <p className="text-gray-700 mb-2">Description: {description}</p>
            <p className="text-gray-700 mb-2">Capacity: {capacity} people</p>
            <p
              className={`text-gray-700 mb-2 ${
                capacity - activity?.reservations?.length < 5
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              <div className="spaces">
                {activity.activityStatus === "full-booked" ? (
                  <span className="text-red-500">
                    Not Available! Full-booked
                  </span>
                ) : (
                  <>
                    <span className="mr-1">Spaces left:</span>
                    <span
                      className={`${
                        capacity - activity?.reservations?.length < 5
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {Math.max(0, capacity - activity?.reservations?.length)}
                    </span>
                  </>
                )}
              </div>
            </p>
            <p className="text-gray-700 mb-2">Price: ${price}</p>
            <p className="text-gray-700 mb-2">Status: {status}</p>
            <p className="text-gray-700 mb-2">
              Skill Level: {skillLevel && skillLevel}
            </p>
            <p className="text-gray-700 mb-2">
              Age Group: {ageGroup && ageGroup}
            </p>

            <div>
              {activityTimes &&
                activityTimes.map((timeSlot, index) => (
                  <div key={index} className="time-slot mb-4">
                    <p className="text-gray-700">
                      Date: {new Date(timeSlot.startTime).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700">
                      Start Time:{" "}
                      {new Date(timeSlot.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-gray-700">
                      End Time:{" "}
                      {new Date(timeSlot.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-gray-700">
                      Duration:{" "}
                      {formatDuration(timeSlot.startTime, timeSlot.endTime)}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            <button
              disabled={activity.activityStatus === "full-booked"}
              className={`outline_btn mb-4 md:mb-6 ${
                activity.activityStatus === "full-booked"
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleActivityBtnClick}
            >
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
      {/* Edit activity button that will open up a modal */}
    </div>
  );
};

export default page;
