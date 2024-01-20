// reservation for loggedin user
export const GET = async () => {
  try {
    await connectToDB();
    const session = getSession();
    const userId = session?.payload.userInfo._id;

    const reservation = await ReservationModel.find({ userId }).populate(
      "activityId"
    );

    if (!reservation) {
      return new Response(`Reservation with id ${userId} not found`, {
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
