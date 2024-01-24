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

  const { price, capacity, activityTimes } = activity;

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
    e.preventDefault(); // Prevent the default form submission

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
          console.log("details", bookingStatus, numberOfPersons);
          router.push(
            `/payment?activityId=${activityId}&bookingStatus=${bookingStatus}&numberOfPersons=${numberOfPersons}&selectedTimeSlot=${selectedTimeSlot}`
          );
        } else {
          // Handle errors
          console.error("Reservation failed:", await response.statusText);
        }
      } catch (error) {
        console.error("Error during reservation:", error.message);
      }
    }
  };

  return (
    <>
      <div className="my-2 text-red-500">
        {activity.activityStatus === "full-booked" && (
          <div className="fully-booked-message">
            This activity is fully booked. No more reservations are allowed.
          </div>
        )}
      </div>
      <form onSubmit={handleReservation}>
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
                  className={` ${
                    capacity - activity?.reservations?.length < 5
                      ? "text-red-500"
                      : "text-grey-500"
                  }`}
                >
                  {capacity - activity?.reservations?.length}
                </span>
              </div>
            </div>
            <label>
              Booking Status:
              <select
                value={bookingStatus}
                onChange={(e) => setBookingStatus(e.target.value)}
              >
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
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
            className="outline_btn "
            disabled={
              numberOfPersons > capacity - activity?.reservations?.length ||
              numberOfPersons < 1 ||
              activity.activityStatus === "full-booked"
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
