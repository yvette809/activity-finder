import { Schema, model, models } from "mongoose";

const ActivitySchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    typeOfActivity: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    activityTimes: [
      {
        startTime: {
          type: Date,
          required: true,
        },
        endTime: {
          type: Date,
          required: true,
        },
      },
    ],

    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    activityStatus: {
      type: String,
      enum: ["available", "full-booked", "reserved", "cancelled"],
      default: "available",
    },
    skillLevel: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "intermediate",
    },
    ageGroup: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reservation",
      },
    ],
  },
  { timestamps: true }
);

const ActivityModel = models.Activity || model("Activity", ActivitySchema);
export default ActivityModel;
