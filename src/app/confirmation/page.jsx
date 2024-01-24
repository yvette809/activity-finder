"use client";

import React from "react";
import Link from "next/link";
import { getAuthToken } from "@/utils/auth";
import jwt from "jsonwebtoken";

const page = () => {
  let authToken = getAuthToken();
  const decodedToken = jwt.decode(authToken);
  const userInfo = decodedToken?.userInfo || {};

  return (
    <div>
      <p>Thanks for choosing this activity</p>
      <Link href={`/my-bookings/${userInfo._id}`} className="bg-primary-blue">
        My Bookings
      </Link>
    </div>
  );
};

export default page;
