"use client";

import { useEffect, useState } from "react";
import { getUserReservations } from "@/utils/api";
import { formatTime } from "@/utils/formatTime";
import ReservationList from "@/app/components/ReservationList";

import { getUserInfoFromAuthToken } from "@/utils/userInfo";
import jwt from "jsonwebtoken";
import Link from "next/link";

const Page = ({ params }) => {
  const [reservations, setReservations] = useState([]);

  const userInfo = getUserInfoFromAuthToken();

  useEffect(() => {
    const getReservations = async () => {
      const fetchedReservations = await getUserReservations(params.userId);
      setReservations(fetchedReservations);
    };

    getReservations();
  }, [params.userId]);

  return (
    <>
      {reservations.length === 0 && (
        <>
          <p className="text-2xl mt-20 text-center">
            You have not made any reservation yet!
          </p>
          <Link href="/">
            <button className="outline_btn">Go Back</button>
          </Link>
        </>
      )}
      {reservations.map((reservation) => (
        <>
          <h1 className="text-2xl font-bold mb-4 mt-20">
            Hello, {reservation?.userId.firstName}! You have made the following
            reservation(s):
          </h1>
          <ReservationList reservation={reservation} user={userInfo} />
        </>
      ))}
    </>
  );
};

export default Page;
