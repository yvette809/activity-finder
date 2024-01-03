import { Schema, model, models } from "mongoose";


const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "trainer"],
      required: true,
    },
    specialisation: {
      type: String,
    },
    experience: {
      type: Number,
    },
    availability: {
      type: [String],
    },
  },
  { timestamps: true }
);

const UserModel = models.User || model<IUser>("User", UserSchema);
export default UserModel;