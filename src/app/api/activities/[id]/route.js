import ActivityModel from "@/models/ActivityModel";
import UserModel from "@/models/UserModel";
import { getSession } from "@/utils/session";
import connectToDB from "@/utils/connectDB";

// get activity by id
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const activity = await ActivityModel.findById(params.id).populate(
      "creator"
      
    );
   
    if (!activity) {
      return new Response(`Activity with id ${params.id} not found`, {
        status: 404,
      });
    }

    return Response.json(activity, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Activity not found", { status: 404 });
  }
};

// update activity
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const session = getSession();
    const userId = session?.payload.id;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await UserModel.findById(userId);

    const activity = await ActivityModel.findById(params.id);
    if (!activity) {
      return new Response("Activity not found", { status: 404 });
    }

    if (activity.creator._id !== user._id && user.role !== "trainer") {
      return new Response("user is not authorised to update acticity", {
        status: 401,
      });
    }
    console.log("creatorId", activity.creator._id);
    console.log("userId", user._id);
    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      params.id,
      reqBody,
      { new: true }
    );

    await updatedActivity.save();

    return Response.json(updatedActivity, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Activity update failed", { status: 500 });
  }
};

// delete activity
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const reqBody = await request.json();
    const session = getSession();
    const userId = session?.payload.id;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await UserModel.findById(userId);
    

    const activity = await ActivityModel.findById(params.id);
    if (!activity) {
      return new Response("Activity not found", { status: 404 });
    }

    if (activity.creator._id !== user._id && user.role !== "trainer") {
      return new Response("user is not authorised to update acticity", {
        status: 401,
      });
    }

    await ActivityModel.findByIdAndRemove(params.id);

    return new Response("activity deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError" && error.kind === "ObjectId") {
      return new Response(`Invalid ID format for activity: ${params.id}`, {
        status: 400,
      });
    }

    return new Response("Failed to delete activity", { status: 500 });
  }
};
