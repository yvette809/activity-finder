import { getSession } from "@/utils/session";
import ActivityModel from "@/models/ActivityModel";
import UserModel from "@/models/UserModel";
import connectToDB from "@/utils/connectDB";

export const POST = async (request) => {
  try {
    await connectToDB();

    const session = getSession();
    const userId = session?.payload.userInfo._id;

    if (session) {
      const user = await UserModel.findById(userId);

      if (!session || (session && user?.role !== "trainer")) {
        return new Response("User not allowed to create an activity", {
          status: 401,
        });
      }

      const {
        typeOfActivity,
        location,
        description,
        date,
        activityTimes,
        capacity,
        price,
        activityStatus,
        skillLevel,
        ageGroup,
        imageSrc,
      } = await request.json();

      const newActivity = new ActivityModel({
        creator: user._id,
        typeOfActivity,
        location,
        description,
        date,
        activityTimes,
        capacity,
        price,
        activityStatus,
        skillLevel,
        ageGroup,
        imageSrc,
      });

      await newActivity.populate("creator", "firstName lastName");
      await newActivity.save();

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
