"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getActivity } from "../page";
import { getAuthToken } from "@/utils/auth";

const page = ({ params }) => {
  const router = useRouter();
  const activityId = params.id;
  console.log("activityId", activityId);
  const isAuthenticated = getAuthToken();

  const [bookingStatus, setBookingStatus] = useState("pending");
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [activity, setActivity] = useState({});

  const { price, capacity, activityTimes } = activity;
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedActivity = await getActivity(activityId);
      setActivity(fetchedActivity);
    };

    fetchData();
  }, []);

  const handleReservation = async () => {
    // Check if the number of persons is less than 1 or if the price is negative
    if (numberOfPersons < 1 || (price !== undefined && price < 0)) {
      console.error("Invalid number of persons or negative price");
      return;
    }
    if (isAuthenticated) {
      try {
        const response = await fetch(
          `/api/activities/${activityId}/reservations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bookingStatus,
              numberOfPersons,
            }),
          }
        );

        if (response.ok) {
          // Reservation successful
          router.push(
            `/payment?activityId=${activityId}&bookingStatus=${bookingStatus}&numberOfPersons=${numberOfPersons}&selectedTimeSlot=${selectedTimeSlot}`
          );
        } else {
          // Handle errors
          console.error("Reservation failed:", await response.json());
          return;
        }
      } catch (error) {
        console.error("Error during reservation:", error.message);
      }
    }
  };

  return (
    <div>
      <div className="reservation-details">
        <label>
          Number of Persons:
          <input
            type="number"
            value={numberOfPersons}
            onChange={(e) => setNumberOfPersons(e.target.value)}
          />
        </label>
        <div className="price-details">
          <p>Price:${price}</p>
          <p>Total: ${price * numberOfPersons}</p>
          <div className="spaces">
            <span> Spaces left:</span>
            <span
              className={` ${capacity < 5 ? "text-red-500" : "text-grey-500"}`}
            >
              {capacity}
            </span>
          </div>
        </div>
        <label>
          Booking Status:
          <select
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value)}
          >
            <option value="reserved">pending</option>
            <option value="pending">confirmed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </label>
      </div>
      <div className="time-slot">
        <select
          value={selectedTimeSlot}
          onChange={handleTimeSlotChange}
          className="border border-gray-300 p-2 rounded-md"
        >
          <option value="" disabled>
            Select a time slot
          </option>
          {activityTimes &&
            activityTimes.map((timeSlot, index) => (
              <option key={index} value={timeSlot.startTime}>
                {`${new Date(
                  timeSlot.startTime
                ).toLocaleTimeString()} - ${new Date(
                  timeSlot.endTime
                ).toLocaleTimeString()}`}
              </option>
            ))}
        </select>
      </div>

      <button
        className="bg-primary-blue p-2 "
        onClick={handleReservation}
        disabled={numberOfPersons > capacity || numberOfPersons < 1}
      >
        Book Activity
      </button>
    </div>
  );
};

export default page;
