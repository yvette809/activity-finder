"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const activityId = router.params.activityId;

  console.log("activityId", activityId);
  const [bookingStatus, setBookingStatus] = useState("reserved");
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [totalPrice, setTotalPrice] = useState(15); // Assuming a default price

  const handleReservation = async () => {
    try {
      const response = await fetch(
        `/api/activities/${activityId}/reservation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingStatus,
            numberOfPersons,
            totalPrice,
          }),
        }
      );

      if (response.ok) {
        // Reservation successful
        console.log("Reservation successful");
      } else {
        // Handle errors
        console.error("Reservation failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during reservation:", error.message);
    }
  };

  return (
    <div>
      <label>
        Number of Persons:
        <input
          type="number"
          value={numberOfPersons}
          onChange={(e) => setNumberOfPersons(e.target.value)}
        />
      </label>
      <label>
        Total Price:
        <input
          type="number"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
        />
      </label>
      <label>
        Booking Status:
        <select
          value={bookingStatus}
          onChange={(e) => setBookingStatus(e.target.value)}
        >
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
        </select>
      </label>
      <button onClick={handleReservation}>Book Activity</button>
    </div>
  );
};

export default page;
