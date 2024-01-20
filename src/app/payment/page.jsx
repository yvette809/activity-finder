"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getActivity } from "@/utils/api";
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

  console.log("search", numberOfPersons, activityId, bookingStatus);

  const total = price * numberOfPersons;
  console.log("total", total);

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
        <p>{timeSlot}</p>
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
