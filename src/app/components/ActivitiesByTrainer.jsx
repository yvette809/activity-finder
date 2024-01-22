"use client";

import React from "react";
import { getAuthToken } from "@/utils/auth";
import jwt from "jsonwebtoken";
import Link from "next/link";

const ActivitiesByTrainer = ({ activities }) => {
  const authToken = getAuthToken();
  const decodedToken = jwt.decode(authToken);
  const userInfo = decodedToken?.userInfo || {};

  let activitiesByTrainer = [];

  if (activities) {
    activitiesByTrainer = activities.filter((activity) => {
      return activity.creator._id === userInfo._id;
    });
  }

  console.log("activities", activities);

  return (
    <>
      {activitiesByTrainer.length <= 0 && (
        <p>There are no activities for this Trainer</p>
      )}
      <div className=" w-full ">
        {activitiesByTrainer.map((activity) => (
          <div key={activity._id}>
            <p>{activity.typeOfActivity}</p>
            <p>{activity.location}</p>

            {activity.reservations.map((reservation) => (
              <div className="bg-rose-400" key={reservation}>
                <Link href={`/reservations/${reservation}`}>
                  <p>Reservation Id: {reservation}</p>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ActivitiesByTrainer;
