import { Schema, model, models } from "mongoose";

const ActivityReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   /*  activityId: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
      required: true,
    }, */
    
  },
  { timestamps: true }
);

const review = models.Review || model("Review", ActivityReviewSchema);
export default review;
