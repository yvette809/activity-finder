import { getSession } from "@/utils/session";
import ActivityModel from "@/models/ActivityModel";
import UserModel from "@/models/UserModel";
import connectToDB from "@/utils/connectDB";

export const POST = async (request) => {
  try {
    await connectToDB();

    const session = getSession();
    const userId = session?.payload.id;
    console.log("usersession", session, userId);

    if (session) {
      const user = await UserModel.findById(userId);
      console.log("user", user);
      if (!user || user.role !== "trainer") {
        return new Response("User not allowed to create an activity", {
          status: 401,
        });
      }

      const {
        creator,
        typeOfActivity,
        location,
        description,
        date,
        duration,
        capacity,
        price,
        status,
        imageSrc
      } = await req.json();

      const newActivity = new ActivityModel({
        creator: user._id,
        typeOfActivity,
        location,
        description,
        date,
        duration,
        capacity,
        price,
        status,
        imageSrc
      });
      await newActivity.populate("creator", "firstName lastName");
      await newActivity.save();

      console.log("activity", newActivity);

      return Response.json({
        newActivity,
        status: 201,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new activity", {
      status: 500,
    });
  }
};

// get all activities

export const GET = async (request) => {
  try {
    await connectToDB();
    const activities = await ActivityModel.find().populate(
      "creator",
      "firstName lastName"
    );

    return Response.json(activities, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to retrieve activities", { status: 500 });
  }
};