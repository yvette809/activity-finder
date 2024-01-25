"use client";

import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import { getReservationById } from "@/utils/api";
import jwt from "jsonwebtoken";

const page = ({ params }) => {
  const isAuthenticated = getAuthToken();
  const decodedToken = jwt.decode(isAuthenticated);
  const userInfo = decodedToken?.userInfo || {};

  const [reservation, setReservation] = useState(null);

  console.log("reservation", reservation);

  useEffect(() => {
  if (
      reservation?.userId === userInfo._id ||
      reservation?.activityId?.creator
    ) {
      const fetchReservation = async () => {
        const fetchedReservation = await getReservationById(params.id);
        console.log("fetchedReservation", fetchReservation);
        setReservation(fetchedReservation);
      };
      fetchReservation();
    }
  }, [params.id, userInfo._id]);

  return (
    <>
      <p>{reservation?.numberOfPersons}</p>
    </>
  );
};

export default page;
