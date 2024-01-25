import React from "react";
import Link from "next/link";
import { getAuthToken } from "@/utils/auth";
import jwt from "jsonwebtoken";

const Page = () => {
  let authToken = getAuthToken();
  const decodedToken = jwt.decode(authToken);
  const userInfo = decodedToken?.userInfo || {};
  console.log("userInfo", userInfo);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-2xl font-bold mb-4 text-center">
        Thanks for choosing this activity!
      </p>
      <Link href={`/my-bookings/${userInfo._id}`} className="outline_btn">
        My Bookings
      </Link>
    </div>
  );
};

export default Page;
