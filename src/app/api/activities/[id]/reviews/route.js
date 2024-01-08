import ActivityModel from "@/models/ActivityModel";
import ActivityReviewModel from "@/models/ActivityReviewModel";
import { getSession } from "@/utils/session";
import connectToDB from "@/utils/connectDB";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const session = getSession();
    const userId = session?.payload.id;

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }
    console.log("params", params);
    const { rating, comment } = await request.json();
    const activityId = params?.id;
    if (!activityId) {
      return new Response("Invalid activity ID", { status: 400 });
    }
    console.log("avtivityId", activityId);

    const activity = await ActivityModel.findById(activityId);

    if (!activity) {
      return new Response("Activity not found", { status: 404 });
    }

    const existingReview = activity.reviews.find((review) =>
      review.userId.equals(userId)
    );
    if (existingReview) {
      return new Response("This activity has already been reviewed", {
        status: 400,
      });
    }

    const newReview = new ActivityReviewModel({ rating, comment, userId });
    const updatedActivity = await ActivityModel.findByIdAndUpdate(
      activityId,
      { $push: { reviews: newReview } },
      { new: true }
    );

    return new Response("Review added", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to write a review", { status: 500 });
  }
};
