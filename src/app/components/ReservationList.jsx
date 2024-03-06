"use client";

import React from "react";
import { formatTime } from "@/utils/formatTime";
import { cancelReservation } from "@/utils/api";
import { useRouter } from "next/navigation";

const ReservationList = ({ reservation, user }) => {
  const router = useRouter();
  const handleReservationDelete = async () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );

    if (shouldDelete) {
      try {
        if (
          reservation.userId._id === user._id ||
          reservation.activityId.creator === user._id
        ) {
          await cancelReservation(reservation._id);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error deleting reservation", error);
      }
    }
  };

  return (
    <div
      key={reservation._id}
      className="mb-8 p-2 border rounded mt-20 shadow-md mx-5"
    >
      <div className="flex items-center mb-4">
        <span className="font-bold mr-2">
          Name: {reservation?.userId?.firstName} {reservation?.userId?.lastName}
        </span>
      </div>
      <p className="mb-2">Activity Id: {reservation?.activityId?._id}</p>
      <p className="text-lg font-semibold mb-2">
        Price of Activity: ${reservation?.activityId?.price}
      </p>
      <p className="text-lg font-semibold mb-2">
        Number of Persons: {reservation?.numberOfPersons}
      </p>
      <p className="mb-2">
        Total price: $
        {reservation?.activityId?.price * reservation?.numberOfPersons}
      </p>
      <p className="text-lg font-semibold mb-2">
        Activity Name: {reservation?.activityId?.typeOfActivity}
      </p>
      <div>
        <p className="text-gray-600 mb-2">
          Date: {formatTime(reservation?.createdAt).date}
        </p>
        <p className="text-gray-600 mb-2">
          Time: {formatTime(reservation?.createdAt).time}h
        </p>
        <p className="text-lg font-semibold mb-2">
          Booking status:{" "}
          {reservation.bookingStatus && reservation.bookingStatus}
        </p>
      </div>

      <button
        onClick={handleReservationDelete}
        className="bg-red-500 text-white py-2 px-4 rounded-full mt-4"
      >
        Cancel Reservation
      </button>
    </div>
  );
};

export default ReservationList;
