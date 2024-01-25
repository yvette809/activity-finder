import ActivityModel from "@/models/ActivityModel";
import ReservationModel from "@/models/reservationModel";
import UserModel from "@/models/UserModel";
import { getSession } from "@/utils/session";
import connectToDB from "@/utils/connectDB";

//get all reservations

export const GET = async (request) => {
  const session = getSession();
  const userId = session?.payload.userInfo._id;

  try {
    await connectToDB();

    // Find all reservations and populate userId and activityId fields
    const reservations = await ReservationModel.find({})
      .populate("userId")
      .populate("activityId")
      .exec();

    // Filter reservations based on the condition that the current user is the creator
    const userReservations = reservations.filter((reservation) => {
      const activityCreatorId = reservation.activityId.creator;
      return userId.toString() === activityCreatorId;
    });

    return new Response(userReservations, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to retrieve reservations", { status: 500 });
  }
};
