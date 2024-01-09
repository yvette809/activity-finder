import { Schema, model, models } from "mongoose";

const ReservationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    activityId: {
      type: Schema.Types.ObjectId,
      ref: "Activity",
    },

    numberOfPersons: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const reservation =
  models.Reservation || model("Reservation", ReservationSchema);
export default reservation;
