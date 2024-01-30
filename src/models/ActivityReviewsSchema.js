import { Schema, model, models } from "mongoose";

const ActivityReviewsSchema = new Schema(
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
  },
  { timestamps: true }
);

const review = models.Review || model("Review", ActivityReviewsSchema);
export default review;
