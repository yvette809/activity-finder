import UserModel from "@/models/UserModel";
import connectToDB from "@/utils/connectDB";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const trainer = await UserModel.findById(params.id)

    if (!trainer) {
      return new Response(`trainer with id ${params.id} not found`, {
        status: 404,
      });
    }

    return Response.json(trainer, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Trainer not found", { status: 404 });
  }
};
