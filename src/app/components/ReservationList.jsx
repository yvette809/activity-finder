import React from "react";
import { formatTime } from "@/utils/formatTime";

const ReservationList = ({ reservation }) => {
  return (
    <div
      key={reservation._id}
      className="mb-8 p-6 border rounded mt-20 shadow-md>"
    >
      <div className="flex items-center mb-4">
        <span className="font-bold mr-2">
          Name: {reservation?.userId?.firstName} {reservation?.userId?.lastName}
        </span>
      </div>
      <p className="mb-2">Activity Id: {reservation?.activityId?._id}</p>
      <p className="text-lg font-semibold mb-2">
        Price of Activity: ${reservation.activityId.price}
      </p>
      <p className="text-lg font-semibold mb-2">
        Number of Persons: {reservation.numberOfPersons}
      </p>
      <p className="mb-2">
        Total price: $
        {reservation.activityId.price * reservation.numberOfPersons}
      </p>
      <p className="text-lg font-semibold mb-2">
        Activity Name: {reservation.activityId.typeOfActivity}
      </p>
      <div>
        <p className="text-gray-600 mb-2">
          Date: {formatTime(reservation.createdAt).date}
        </p>
        <p className="text-gray-600 mb-2">
          Time: {formatTime(reservation.createdAt).time}h
        </p>
      </div>
    </div>
  );
};

export default ReservationList;
