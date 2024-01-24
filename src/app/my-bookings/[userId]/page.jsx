"use client";

import { useEffect, useState } from "react";
import { getUserReservations } from "@/utils/api";

const page = ({ params }) => {
  const [reservations, setReservations] = useState([]);

  console.log("reservations", reservations);

  useEffect(() => {
    const getReservations = async () => {
      const fetchedReservation = await getUserReservations(params.userId);
      setReservations(fetchedReservation);
    };
    getReservations();
  }, []);
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
