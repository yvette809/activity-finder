"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getActivity } from "@/utils/api";
import { getAuthToken } from "@/utils/auth";

const ReservationForm = ({ params }) => {
  const router = useRouter();
  const activityId = params.id;

  const isAuthenticated = getAuthToken();

  const [bookingStatus, setBookingStatus] = useState("pending");
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [activity, setActivity] = useState({});
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const { price, capacity, activityTimes, activityStatus } = activity;

  useEffect(() => {
    const fetchData = async () => {
      const fetchedActivity = await getActivity(activityId);
      setActivity(fetchedActivity);
    };

    fetchData();
  }, []);

  const handleTimeSlotChange = (e) => {
    setSelectedTimeSlot(e.target.value);
  };

  const handleReservation = async (e) => {
    e.preventDefault();

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
          //const data = await response.json();
          console.log("details", bookingStatus, numberOfPersons);
          setBookingStatus("confirmed");

          router.push(
            `/payment?activityId=${activityId}&bookingStatus=${bookingStatus}&numberOfPersons=${numberOfPersons}&selectedTimeSlot=${selectedTimeSlot}`
          );
        } else {
          console.error("Reservation failed:", await response.statusText);
        }
      } catch (error) {
        console.error("Error during reservation:", error.message);
      }
    }
  };

  return (
    <>
      <div className="my-4 text-red-500">
        {activityStatus === "full-booked" && (
          <div className="fully-booked-message bg-red-100 text-red-500 p-3 rounded-md">
            This activity is fully booked. No more reservations are allowed.
          </div>
        )}
      </div>
      <form onSubmit={handleReservation} className="max-w-md mx-auto mt-10 ">
        <div className="bg-white p-6 rounded-md shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Number of Persons:
              <input
                type="number"
                value={numberOfPersons}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value, 10);
                  if (
                    !isNaN(newValue) &&
                    newValue >= 0 &&
                    newValue <= capacity
                  ) {
                    setNumberOfPersons(newValue);
                  }
                }}
                /*   onChange={(e) => setNumberOfPersons(e.target.value)} */
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </label>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="price-details">
              <p className="text-gray-700">Price: ${price}</p>
              <p className="text-gray-700">Total: ${price * numberOfPersons}</p>
              <div className="spaces">
                <span className="mr-1">Spaces left:</span>
                <span
                  className={` ${
                    capacity - activity?.reservations?.length < 5
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {/* {Math.max(0, capacity - activity?.reservations?.length)} */}
                  {Math.max(
                    0,
                    capacity - activity?.reservations?.length - numberOfPersons
                  )}
                </span>
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">
                Booking Status:
                <select
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Time Slot:
              <select
                value={selectedTimeSlot}
                onChange={handleTimeSlotChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
            </label>
          </div>
          <button
            className={`outline_btn ${
              numberOfPersons > capacity ||
              numberOfPersons < 1 ||
              activityStatus === "full-booked"
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={
              numberOfPersons > capacity ||
              numberOfPersons < 1 ||
              activityStatus === "full-booked"
            }
            type="submit"
          >
            Book Activity
          </button>
        </div>
      </form>
    </>
  );
};

export default ReservationForm;
