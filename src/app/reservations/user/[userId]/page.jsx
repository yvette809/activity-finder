"use client";

import { useEffect, useState } from "react";
import { getUserReservations } from "@/utils/api";
import { formatTime } from "@/utils/formatTime";
import ReservationList from "@/app/components/ReservationList";

const Page = ({ params }) => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const getReservations = async () => {
      const fetchedReservations = await getUserReservations(params.userId);
      setReservations(fetchedReservations);
    };

    getReservations();
  }, [params.userId]);

  console.log("reservationsofuser", reservations);

  return (
    <div>
      {reservations.map((reservation) => (
        <>
          <h1 className="text-2xl font-bold mb-4 mt-20">
            Hello, {reservation?.userId.firstName}! You have made the following
            reservation(s):
          </h1>
          <ReservationList reservation={reservation} />
        </>
      ))}
    </div>
  );
};

export default Page;
