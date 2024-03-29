"use client";

import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import { getUserInfoFromAuthToken } from "@/utils/userInfo";
import { getReservationById } from "@/utils/api";
import ReservationList from "@/app/components/ReservationList";
import { formatTime } from "@/utils/formatTime";
import jwt from "jsonwebtoken";

const page = ({ params }) => {
  const isAuthenticated = getAuthToken();
  const userInfo = getUserInfoFromAuthToken();

  const [reservation, setReservation] = useState(null);

  const formattedTime = formatTime(reservation?.createdAt);

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

    /*  if (
      userInfo._id === reservation?.activityId?.creator ||
      userInfo._id === reservation?.userId._id
    ) {
      fetchReservation();
    } */
  }, [params.id]);

  console.log("reservation", reservation, userInfo);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-screen-sm mx-auto p-6 bg-white rounded-md shadow-md">
        {reservation ? (
          <>
            <ReservationList
              reservation={reservation && reservation}
              user={userInfo}
            />
          </>
        ) : (
          <p className="text-lg font-semibold">Loading reservation...</p>
        )}
      </div>
    </div>
  );
};

export default page;
