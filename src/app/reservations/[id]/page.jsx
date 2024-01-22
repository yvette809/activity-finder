"use client";

import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import { getReservationById } from "@/utils/api";
import jwt from "jsonwebtoken";
import Link from "next/link";

const page = ({ params }) => {
  const isAuthenticated = getAuthToken();
  const decodedToken = jwt.decode(isAuthenticated);
  const userInfo = decodedToken?.userInfo || {};

  const [reservation, setReservation] = useState({});

  console.log("reservation", reservation);

  useEffect(() => {
    if (reservation.userId === userInfo._id || reservation.activityId.creator) {
      const fetchReservation = async () => {
        const fetchedReservation = await getReservationById(params.id);
        setReservation(fetchedReservation);
      };
      fetchReservation();
    }
  }, []);

  return <>reservation</>;
};

export default page;
