"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getActivity } from "../activities/[id]/page";

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
        <p>
          Total: ${price} X {numberOfPersons} = ${price * numberOfPersons}
        </p>
        <p>Number of persons: {numberOfPersons}</p>

        <div className="payment">
          
        </div>
      </div>
    </>
  );
};

export default page;
