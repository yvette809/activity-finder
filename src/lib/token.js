import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET;

export default function generateToken(userInfo) {
  const token = jwt.sign({ userInfo}, secret, {
    expiresIn: "30d",
  });

  return cookies().set("session", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
}
