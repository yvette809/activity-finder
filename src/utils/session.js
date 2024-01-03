

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export  function getSession(){
  const session= cookies().get("session");

  try {
    if (!session) {
      return new Response("Unauthorised, no token", { status: 401 });
    }
    const payload = jwt.verify(session.value, process.env.JWT_SECRET || "");
    return { session, payload };
  } catch (err) {
    return new Response("Unauthorised, no token", { status: 401 });
  }
}