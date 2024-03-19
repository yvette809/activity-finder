/* "use client";

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

  if (!activity) {
    // Render loading state until activity data is fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-[2rem]">
      <div className="max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
        <div className="mb-4">
          <p className="text-gray-700">You are booked for: {typeOfActivity}</p>
          <p className="text-gray-700">Date: {formattedTimeSlot.date}</p>
          <p className="text-gray-700">Time: {formattedTimeSlot.time}</p>
          <p className="text-gray-700">Total: ${total}</p>
          <p className="text-gray-700">Number of persons: {numberOfPersons}</p>
        </div>
        <div className="payment">
          <CreditCardForm
            activityId={activityId}
            price={price}
            persons={numberOfPersons}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getActivity } from "@/utils/api";
import { formatTime } from "@/utils/formatTime";
import CreditCardForm from "../components/CreditCardForm";

const page = () => {
  const router = useRouter();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Content />
    </Suspense>
  );
};

function Content() {
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

  if (!activity) {
    // Data hasn't been fetched yet, Suspense will render fallback
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-[2rem]">
      <div className="max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Booking Details</h1>
        <div className="mb-4">
          <p className="text-gray-700">You are booked for: {typeOfActivity}</p>
          <p className="text-gray-700">Date: {formattedTimeSlot.date}</p>
          <p className="text-gray-700">Time: {formattedTimeSlot.time}</p>
          <p className="text-gray-700">Total: ${total}</p>
          <p className="text-gray-700">Number of persons: {numberOfPersons}</p>
        </div>
        <div className="payment">
          <CreditCardForm
            activityId={activityId}
            price={price}
            persons={numberOfPersons}
          />
        </div>
      </div>
    </div>
  );
}

export default page;