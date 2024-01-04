import connectToDB from "@/utils/connectDB";
import { getSession } from "@/utils/session";
import ReservationModel from "@/models/ActivityModel";
import ActivityModel from "@/models/ActivityModel";
import connectToDB from "@/utils/connectDB";
import { getSession } from "@/utils/session";
import ReservationModel from "@/models/reservationModel";
import ActivityModel from "@/models/ActivityModel";

export const POST = async (request) => {
  try {
    await connectToDB();
    const session = getSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { activityId, bookingStatus, bookingDate } = body;
    const numberOfPersons = parseInt(body.numberOfPersons, 10);
    const totalPrice = parseInt(body.totalPrice, 10);

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

    const activity = await ActivityModel.findById(activityId);

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
        userId: session.payload.id,
        activityId,
        numberOfPersons,
        bookingStatus,
        totalPrice,
      });

      await newReservation.save();

      console.log("Reservation", newReservation);

      // update activity status to booked
      await ActivityModel.findByIdAndUpdate(activityId, { status: "booked" });

      return new Response({
        newReservation,
        status: 201,
      });
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
