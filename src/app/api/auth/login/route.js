import bcrypt from "bcryptjs";
import connectToDB from "@/utils/connectDB";
import UserModel from "@/models/UserModel";
import generateToken from "@/utils/token";

//login a user
export async function POST(request, response) {
  try {
    connectToDB();
    const { email, password } = await request.json();
    let user = await UserModel.findOne({ email });
    if (!user) {
      return new Response("User not found.", {
        status: 401,
      });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    generateToken(user);
    if (!isMatch) {
      return new Response("Invalid User Credentials", {
        status: 401,
      });
    } else {
      return Response.json({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response("An error occurred while processing the request.", {
      status: 500,
    });
  }
}
