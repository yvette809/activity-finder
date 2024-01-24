"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getActivity } from "@/utils/api";
import { formatTime } from "@/utils/formatTime";
import CreditCardForm from "../components/CreditCardForm";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const numberOfPersons = searchParams.get("numberOfPersons");
  const activityId = searchParams.get("activityId");
  const bookingStatus = searchParams.get("bookingStatus");
  const timeSlot = searchParams.get("selectedTimeSlot");
  const [activity, setActivity] = useState(false);

  const { price, typeOfActivity } = activity;

  const total = price * numberOfPersons;
  const formattedTimeSlot = formatTime(timeSlot);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedActivity = await getActivity(activityId);
      setActivity(fetchedActivity);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="intro">
        <p>You are booked for : {typeOfActivity}</p>
        <p>Date:{formattedTimeSlot.date}</p>
        <p>Time:{formattedTimeSlot.time}</p>
        <p>Total: ${total}</p>
        <p>Number of persons: {numberOfPersons}</p>

        <div className="payment">
          <CreditCardForm
            activityId={activityId}
            price={price}
            persons={numberOfPersons}
          />
        </div>
      </div>
    </>
  );
};

export default page;
