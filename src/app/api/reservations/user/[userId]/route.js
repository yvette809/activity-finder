import { getSession } from "@/utils/session";
import ReservationModel from "@/models/reservationModel";
import connectToDB from "@/utils/connectDB";

// reservation for loggedin user
/* export const GET = async () => {
  try {
    await connectToDB();
    const session = getSession();
    const userId = session?.payload.userInfo._id;

    const reservation = await ReservationModel.find(
      (reservation) => reservation.userId.toString() === userId.toString()
    )
      .populate("activityId")
      .exec();

    if (!reservation) {
      return new Response(`There is no reservation for this user ${userId} `, {
        status: 404,
      });
    }

    // Check if the user trying to get the reservation is the person who made it
    const isReservationOwner = reservation.userId._id.toString() === userId;

    if (isReservationOwner) {
      return Response.json(reservation, { status: 200 });
    } else {
      return new Response(
        "Unauthorized. You don't have permission to view this reservation.",
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response("Error retrieving reservation", { status: 500 });
  }
};
 */

import mongoose from "mongoose";

// ... Other imports

// Get reservations by user ID
export const GET = async (req, { params }) => {
  const userId = await params.userId;

  try {
    await connectToDB();

    const userReservations = await ReservationModel.find({ userId })
      .populate("userId")
      .populate("activityId");

    //return new Response(userReservations, { status: 200 });
    return new Response(JSON.stringify(userReservations), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to retrieve reservations", { status: 500 });
  }
};
