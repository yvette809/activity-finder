"use client";

import { useState } from "react";
import { getAuthToken } from "@/utils/auth";
import { deleteActivity } from "@/utils/api";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ActivitiesByTrainer = ({ activities }) => {
  const router = useRouter();
  const authToken = getAuthToken();
  const decodedToken = jwt.decode(authToken);
  const userInfo = decodedToken?.userInfo || {};

  let activitiesByTrainer = [];

  if (activities) {
    activitiesByTrainer = activities.filter((activity) => {
      return activity.creator._id === userInfo._id;
    });
  }

  return (
    <>
      {activitiesByTrainer.length <= 0 && userInfo.role === "trainer" && (
        <p>There are no activities for this Trainer</p>
      )}
      <div className="w-full">
        {activitiesByTrainer.length > 0 && (
          <table className="min-w-full bg-white border border-gray-300 mt-20">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border">Activity Type</th>
                <th className="py-2 px-4 border">Location</th>
                <th className="py-2 px-4 border">Reservations</th>
              </tr>
            </thead>
            <tbody>
              {activitiesByTrainer.map((activity) => (
                <tr key={activity._id} className="border-b">
                  <td className="py-2 px-4 border">
                    <Link href={`/activities/${activity._id}`}>
                      {activity.typeOfActivity}
                    </Link>
                  </td>

                  <td className="py-2 px-4 border">{activity.location}</td>
                  <td className="py-2 px-4 border">
                    {activity.reservations.map((reservation) => (
                      <div className="" key={reservation}>
                        <Link href={`/reservations/${reservation}`}>
                          <p className="cursor-pointer text-blue-500 underline">
                            Reservation Id: {reservation}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => {
                        window.confirm(
                          "Are you sure you want to delete this activity"
                        );
                        deleteActivity(activity?._id);
                        router.push("/");
                      }}
                      className="text-red-500"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ActivitiesByTrainer;
