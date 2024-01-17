"use client";

import React from "react";
import { getAuthToken } from "@/utils/auth";
import ActivityForm from "../components/ActivityForm";
import jwt from "jsonwebtoken";

const page = () => {
  const isAuthenticated = getAuthToken();
  const decodedToken = jwt.decode(isAuthenticated);
  const userInfo = decodedToken?.userInfo || {};
  console.log("userinfo", userInfo);
  return (
    <>
      <div>Welcome to Your dashboard {userInfo.firstName}</div>
      {isAuthenticated && userInfo.role === "trainer" && (
        <ActivityForm isAuthenticated={isAuthenticated} userInfo={userInfo} />
      )}
    </>
  );
};

export default page;
