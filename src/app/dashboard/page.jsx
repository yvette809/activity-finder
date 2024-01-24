"use client";

import { useState, useEffect } from "react";
import { getAuthToken } from "@/utils/auth";
import ActivityForm from "../components/ActivityForm";
import { getActivities } from "@/utils/api";
import ActivitiesByTrainer from "../components/ActivitiesByTrainer";
import ClientOnly from "../components/ClientOnly";
import jwt from "jsonwebtoken";
import Link from "next/link";

const page = () => {
  const isAuthenticated = getAuthToken();
  const decodedToken = jwt.decode(isAuthenticated);
  const userInfo = decodedToken?.userInfo || {};

  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const fetchedActivities = await getActivities();
      setActivities(fetchedActivities);
    };

    fetchActivities();
  }, []);

  const userBookingsLink = isAuthenticated && userInfo.role === "user" && (
    <Link href={`/my-bookings/${userInfo._id}`}>
      <button className="bg-primary-blue">Go to Your Bookings</button>
    </Link>
  );

  return (
    <ClientOnly>
      <>
        <div>Welcome to Your dashboard {userInfo.firstName}</div>
        {userBookingsLink}

        <ActivitiesByTrainer activities={activities} />
        {isAuthenticated && userInfo.role === "trainer" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-blue text-white py-2 px-4 rounded-md mt-2"
          >
            Create Activity
          </button>
        )}

        {showModal && (
          <ActivityForm
            isAuthenticated={isAuthenticated}
            userInfo={userInfo}
            setShowModal={setShowModal}
          />
        )}
      </>
    </ClientOnly>
  );
};

export default page;
