"use client";

import { useEffect, useState } from "react";
import { getUserReservation } from "@/utils/api";
import { getAuthToken } from "@/utils/auth";
import jwt from "jsonwebtoken";

const page = () => {
  const authToken = getAuthToken();
  const decodedToken = jwt.decode(authToken);
  const [reservations, setReservations] = useState([]);
  const userInfo = decodedToken?.userInfo || {};
  const { _id } = userInfo;

  console.log("reservations", reservations, userInfo);

  useEffect(() => {
    const getReservation = async (_id) => {
      const fetchedReservation = await getUserReservation(_id);
      setReservation(fetchedReservation);
    };
  });
  return (
    <>
      {reservations.length === 0 && (
        <p>There are no reservations for the loggedIn user</p>
      )}
      {reservations.map((reservation) => (
        <>
          <p>{reservation._id}</p>
          <p>{reservation.numberOfPersons}</p>
        </>
      ))}
    </>
  );
};

export default page;
