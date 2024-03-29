import ActivityModel from "@/models/ActivityModel";
import ReservationModel from "@/models/reservationModel";
import UserModel from "@/models/UserModel";
import { getSession } from "@/utils/session";
import connectToDB from "@/utils/connectDB";

// get reservation by id
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const session = getSession();
    const userId = session?.payload.userInfo._id;

    const reservation = await ReservationModel.findById(params.id)
      .populate("userId", "firstName lastName")
      .populate("activityId");

    if (!reservation) {
      return new Response(`Reservation with id ${params.id} not found`, {
        status: 404,
      });
    }

    const activity = await ActivityModel.findById(reservation.activityId);
    console.log("activity", activity);

    if (!activity) {
      return new Response("Associated activity not found", { status: 404 });
    }

    /*   // Check if the user trying to get the reservation is the creator of the activity
    const isActivityCreator = activity.creator._id.toString() === userId;

    // Check if the user trying to get the reservation is the person who made it
    const isReservationOwner = reservation.userId._id.toString() === userId;

      if (isActivityCreator || isReservationOwner) {
      return new Response(JSON.stringify(reservation), { status: 200 });
    } else {
      return new Response(
        "Unauthorized. You don't have permission to view this reservation.",
        {
          status: 401,
        }
      );
    }  */
    if (session) {
      return new Response(JSON.stringify(reservation), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response("Error retrieving reservation", { status: 500 });
  }
};

// update reservation
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const session = getSession();
    const userId = session?.payload.userInfo._id;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await UserModel.findById(userId);

    const reservation = await ReservationModel.findById(params.id);
    if (!reservation) {
      return new Response("Reservation not found", { status: 404 });
    }

    // Check if the user updating the reservation is the same user who created it
    if (reservation.userId.toString() !== userId) {
      return new Response("User is not authorized to update the reservation", {
        status: 401,
      });
    }

    const updatedReservation = await ReservationModel.findByIdAndUpdate(
      params.id,
      reqBody,
      { new: true }
    );

    await updatedReservation.save();

    return Response.json(updatedReservation, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Reservation update failed", { status: 500 });
  }
};

// delete reservation
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const session = getSession();
    const userId = session?.payload.userInfo._id;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Fetch the reservation from the database
    const reservation = await ReservationModel.findById(params.id).populate(
      "userId"
    );

    const activity = await ActivityModel.findById(
      reservation.activityId._id
    ).populate("creator");

    if (!activity) {
      return new Response("Activity not found", { status: 404 });
    }

    // Check if the user trying to delete the reservation is the creator of the activity
    const isActivityCreator = activity.creator._id.toString() === userId;

    // Check if the user trying to delete the reservation is the owner of the reservation
    const isReservationOwner = reservation?.userId?._id.toString() === userId;
    console.log("isReservationOwner", isReservationOwner);

    if (isActivityCreator || isReservationOwner) {
      // Remove the reservation from the Activity's reservations array
      await ActivityModel.findByIdAndUpdate(activity._id, {
        $pull: { reservations: params.id },
        $inc: { capacity: reservation.numberOfPersons },
      });

      // Update the reservation status
      reservation.bookingStatus = "cancelled";
      if (activity.activityStatus === "full-booked") {
        activity.activityStatus = "available";
      }
      await reservation.save();

      // Delete the reservation
      await ReservationModel.findByIdAndDelete(params.id);

      return new Response("Reservation deleted successfully", { status: 200 });
    } else {
      return new Response(
        "Unauthorized. You don't have permission to delete this reservation.",
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.error(error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return new Response(`Invalid ID format for reservation: ${params.id}`, {
        status: 400,
      });
    }

    return new Response("Failed to delete reservation", { status: 500 });
  }
};
