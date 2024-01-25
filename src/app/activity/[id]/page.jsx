"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuthToken } from "@/utils/auth";
import jwt from "jsonwebtoken";
import DatePicker from "react-datepicker";
import { getActivity } from "@/utils/api";
import "react-datepicker/dist/react-datepicker.css";

const page = ({ params }) => {
  const { id } = params;

  const isAuthenticated = getAuthToken();
  const decodedToken = jwt.decode(isAuthenticated);
  const userInfo = decodedToken?.userInfo || {};

  const router = useRouter();
  const [activityData, setActivityData] = useState({
    typeOfActivity: "",
    location: "",
    description: "",
    activityTimes: [],
    capacity: 0,
    price: 0,
    activityStatus: "available",
    imageSrc: "",
  });

 /*  useEffect(() => {
    const fetchData = async () => {
      const fetchedActivity = await getActivity(id);

      setActivityData(fetchedActivity);
    };

    fetchData();
  }, []); */

  useEffect(() => {
    const fetchData = async () => {
      const fetchedActivity = await getActivity(id);
      setActivityData(fetchedActivity);
      if (fetchedActivity) {
        setActivityData({
          ...activityData,
          typeOfActivity: fetchedActivity.typeOfActivity,
          location: fetchedActivity.location,
          description: fetchedActivity.description,
          activityTimes: fetchedActivity.activityTimes.map((timeSlot) => ({
            startTime: timeSlot.startTime,
            endTime: timeSlot.endTime,
          })),
          capacity: fetchedActivity.capacity,
          price: fetchedActivity.price,
          activityStatus: fetchedActivity.activityStatus,
          imageSrc: fetchedActivity.imageSrc,
        });
      }
    };

    fetchData();
  }, []);

  console.log("activityData", activityData);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setActivityData({
      ...activityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeChange = (time, index, isStartTime) => {
    const updatedActivityTimes = [...activityData.activityTimes];
    const timeKey = isStartTime ? "startTime" : "endTime";
    updatedActivityTimes[index][timeKey] = time;
    setActivityData({
      ...activityData,
      activityTimes: updatedActivityTimes,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!activityData.typeOfActivity || !activityData.location) {
      setError("Type of Activity and Location are required fields");
      return;
    }

    if (isAuthenticated && userInfo && userInfo.role === "trainer") {
      // Call your API route to create the activity
      try {
        const response = await fetch(
          `http://localhost:3000/api/activities/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(activityData),
          }
        );

        if (response.ok) {
          // Handle success
          const data = await response.json();
          console.log("data", data);
          /*   setActivityData({
            typeOfActivity: "",
            location: "",
            description: data.description,
            activityTimes: data.activityTimes,
            capacity: data.capacity,
            price: data.price,
            activityStatus: data.activityStatus,
            imageSrc: data.imageSrc,
          }); */
          console.log("Activity updated successfully");
          router.push(`/activities(${id})`);
        } else {
          // Handle errors
          console.error("Failed to update activity:", await response.text());
        }
      } catch (error) {
        console.error("Error creating activity:", error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 bg-white shadow-md rounded-md ">
      <form onSubmit={handleSubmit} className="w-full">
        <label className="block mb-2">
          Type of Activity:
          <input
            type="text"
            name="typeOfActivity"
            value={activityData.typeOfActivity}
            onChange={handleChange}
            className="form_input"
          />
        </label>

        <label className="block mb-2">
          Location:
          <input
            type="text"
            name="location"
            value={activityData.location}
            onChange={handleChange}
            className="form_input"
          />
        </label>
        <div>
          <label className="form_textarea ">
            Description:
            <textarea
              name="description"
              value={activityData.description}
              onChange={handleChange}
              className="form_textarea "
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Capacity:
            <input
              type="number"
              name="capacity"
              value={activityData.capacity}
              onChange={handleChange}
              className="form_input"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Price:
            <input
              type="number"
              name="price"
              value={activityData.price}
              onChange={handleChange}
              className="form_input"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Activity Status:
            <select
              name="activityStatus"
              value={activityData.activityStatus}
              onChange={handleChange}
              className="form_input"
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="reserved">Reserved</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Image Source:
            <input
              type="text"
              name="imageSrc"
              value={activityData.imageSrc}
              onChange={handleChange}
              className="form_input"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Activity Times:</label>
          {activityData.activityTimes &&
            activityData.activityTimes.map((timeSlot, index) => (
              <div key={index} className="flex space-x-4 mb-2">
                {timeSlot.startTime && timeSlot.endTime && (
                  <>
                    <DatePicker
                      selected={timeSlot.startTime}
                      onChange={(date) => handleTimeChange(date, index, true)}
                      showTimeSelect
                      dateFormat="Pp"
                      className="border p-2 rounded-md"
                    />
                    <DatePicker
                      selected={timeSlot.endTime}
                      onChange={(date) => handleTimeChange(date, index, false)}
                      showTimeSelect
                      dateFormat="Pp"
                      className="border p-2 rounded-md"
                    />
                  </>
                )}
              </div>
            ))}
          <button
            type="button"
            onClick={() =>
              setActivityData({
                ...activityData,
                activityTimes: [
                  ...activityData.activityTimes,
                  { startTime: null, endTime: null },
                ],
              })
            }
            className="bg-blue-500 text-white py-1 px-2 rounded-md"
          >
            Add Time Slot
          </button>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-primary-blue text-white py-2 px-4 rounded-md"
          >
            update Activity
          </button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default page;
