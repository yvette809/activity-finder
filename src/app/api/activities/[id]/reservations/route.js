import connectToDB from "@/utils/connectDB";
import { getSession } from "@/utils/session";
import ActivityModel from "@/models/ActivityModel";
import ReservationModel from "@/models/reservationModel";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();
    const session = getSession();
    const userId = session.payload.id;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { bookingStatus, bookingDate } = body;
    const numberOfPersons = parseInt(body.numberOfPersons, 10);
    const totalPrice = parseInt(body.totalPrice, 10);
    const activityId = params.id;
    console.log("activityId", activityId);

    // Validate if parsing was successful
    if (isNaN(numberOfPersons) || isNaN(totalPrice)) {
      return new Response("Invalid input for numberOfPersons or totalPrice.", {
        status: 400,
      });
    }

    // Validate if booking date is in the future
    if (new Date(bookingDate) < new Date()) {
      return new Response(
        "Invalid booking date. Please choose a date in the future.",
        { status: 400 }
      );
    }

    const activity = await ActivityModel.findById(activityId).populate(
      "reservations"
    );

    if (!activity) {
      return new Response("Activity not found", { status: 404 });
    }

    if (numberOfPersons > activity.capacity) {
      return new Response(
        "Number of persons greater than required for this activity",
        { status: 400 }
      );
    }

    if (activity.status === "cancelled") {
      return new Response(
        "Booking is not allowed! Activity has been cancelled",
        { status: 400 }
      );
    }

    if (activity.status === "available") {
      const newReservation = new ReservationModel({
        userId,
        numberOfPersons,
        bookingStatus,
        totalPrice,
      });

      await newReservation.save();
      // check if this user has already reserved this activity

      const existingReservation = activity.reservations.find(
        (reservation) => reservation.userId.toString() === userId.toString()
      );

      if (existingReservation) {
        return new Response("There is already a reservation for this user", {
          status: 400,
        });
      }

      // update activity status to booked
      // reduce the number of spaces for that activity
      await ActivityModel.findByIdAndUpdate(activity._id, {
        $push: { reservations: newReservation },
        $inc: { capacity: -1 },
        status: "booked",
      });
      // check if activity has already been reserved

    

      console.log("Reservation", newReservation);

      return new Response("Activity reserved", { status: 201 });
    } else {
      return new Response(
        "Invalid activity status. The activity is not available for booking.",
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response("Failed to create a new reservation", { status: 500 });
  }
};
