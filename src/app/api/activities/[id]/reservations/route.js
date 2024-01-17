import connectToDB from "@/utils/connectDB";
import { getSession } from "@/utils/session";
import ActivityModel from "@/models/ActivityModel";
import ReservationModel from "@/models/reservationModel";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();
    const session = getSession();
    const userId = session?.payload.id;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { bookingStatus } = body;
    const numberOfPersons = parseInt(body.numberOfPersons, 10);
    //const totalPrice = parseInt(body.totalPrice, 10);
    const activityId = params.id;

    // Validate input
    if (isNaN(numberOfPersons)) {
      return new Response("Invalid input for numberOfPersons or totalPrice.", {
        status: 400,
      });
    }

    const activity = await ActivityModel.findById(activityId).populate(
      "reservations"
    );

    if (!activity) {
      return new Response("Activity not found", { status: 404 });
    }

    const availableCapacity = activity.capacity - activity.reservations.length;
    if (numberOfPersons > availableCapacity) {
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
      await handleReservation(activity, userId, numberOfPersons, bookingStatus);

      return new Response("reservation created", { status: 201 });
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

const handleReservation = async (
  activity,
  userId,
  numberOfPersons,
  bookingStatus
) => {
  try {
    // check if this user has already reserved this activity
    const existingReservation = activity.reservations.find(
      (reservation) => reservation.userId.toString() === userId.toString()
    );

    if (existingReservation) {
      return new Response("There is already a reservation for this user", {
        status: 400,
      });
    }

    const newReservation = new ReservationModel({
      userId,
      activityId: activity.id,
      numberOfPersons,
      bookingStatus,
    });

    await newReservation.save();
    // reduce the number of spaces for that activity
    activity.capacity -= numberOfPersons;

    // Update the activity status to reserved and reduce the number of available spaces
    await ActivityModel.findByIdAndUpdate(activity.id, {
      $push: { reservations: newReservation },
      $inc: { capacity: -numberOfPersons },
      activityStatus: "reserved",
    });

    return newReservation;
  } catch (error) {
    console.error("Error handling reservation:", error);
    throw new Error("Failed to handle reservation");
  }
};

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const session = getSession();
    const userId = session?.payload.id;

    // Check if the user is logged in
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const activityId = params.id;
    // Check if the user is the creator of the activity
    const activity = await ActivityModel.findById(activityId);
    if (!activity || activity.creator.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const reservations = await ReservationModel.find({
      activityId: activityId,
    })
      .populate("userId", "firstName lastName")
      .populate("activityId", "creator typeOfActivity");

    return Response.json(reservations, { status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
