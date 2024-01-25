"use client";

import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import { getReservationById } from "@/utils/api";
import ReservationList from "@/app/components/ReservationList";
import { formatTime } from "@/utils/formatTime";
import jwt from "jsonwebtoken";

const page = ({ params }) => {
  const isAuthenticated = getAuthToken();
  const decodedToken = jwt.decode(isAuthenticated);
  const userInfo = decodedToken?.userInfo || {};

  const [reservation, setReservation] = useState(null);

  const formattedTime = formatTime(reservation?.createdAt);

  console.log("reservation", reservation);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const fetchedReservation = await getReservationById(params.id);
        console.log("fetchedReservation", fetchedReservation);
        setReservation(fetchedReservation);
      } catch (error) {
        console.error("Error fetching reservation:", error);
      }
    };

    if (isAuthenticated) {
      fetchReservation();
    }

    /* if (
      userInfo._id === reservation?.activityId?.creator ||
      userInfo._id === reservation?.userId._id
    ) {
      fetchReservation();
    } */
  }, [params.id]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-screen-sm mx-auto p-6 bg-white rounded-md shadow-md">
        {reservation ? (
          <>
          <ReservationList reservation={reservation}/>
            {/* <div className="flex items-center mb-4">
              <span className="font-bold mr-2">
                Name: {reservation.userId.firstName}{" "}
                {reservation.userId.lastName}
              </span>
            </div>
            <p> Activity Id : {reservation?.activityId._id}</p>
            <p className="text-lg font-semibold">
              Price of Activity: {reservation.activityId.price}
            </p>
            <p className="text-lg font-semibold mb-2">
              Number of Persons: {reservation.numberOfPersons}
            </p>
            <p>
              Total price:{" "}
              {reservation.activityId.price * reservation.numberOfPersons}
            </p>
            <p className="text-lg font-semibold">
              Activity Name: {reservation.activityId.typeOfActivity}
            </p>
            <div>
              <p className="text-gray-600 mb-2">Date: {formattedTime.date}</p>
              <p className="text-gray-600 mb-2">Time: {formattedTime.time}</p>
            </div> */}
          </>
        ) : (
          <p className="text-lg font-semibold">Loading reservation...</p>
        )}
      </div>
    </div>
  );
};

export default page;
