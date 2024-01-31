import React from "react";
import Link from "next/link";
import { getUserInfoFromAuthToken } from "@/utils/userInfo";

const Page = () => {
  const userInfo = getUserInfoFromAuthToken();
  console.log("userInfo", userInfo);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <p className="text-2xl font-bold mb-4 text-center">
        Thanks for choosing this activity!
      </p>
      <Link
        href={`/reservations/user/${userInfo?._id}`}
        className="outline_btn"
      >
        My Bookings
      </Link>
    </div>
  );
};

export default Page;
