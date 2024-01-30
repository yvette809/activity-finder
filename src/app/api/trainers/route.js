import { getSession } from "@/utils/session";
import UserModel from "@/models/UserModel";
import connectToDB from "@/utils/connectDB";

export const GET = async (request) => {
  try {
    await connectToDB();
    const users = await UserModel.find();
    const trainers = users.filter((user) => user.role === "trainer");
    console.log("trainers", trainers);

    return Response.json(trainers, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to retrieve atrainers", { status: 500 });
  }
};
