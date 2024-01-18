"use client";

import { useState } from "react";
import { getAuthToken } from "@/utils/auth";
import ActivityForm from "../components/ActivityForm";
import jwt from "jsonwebtoken";
import Link from "next/link";

const page = () => {
  const isAuthenticated = getAuthToken();
  const decodedToken = jwt.decode(isAuthenticated);
  const userInfo = decodedToken?.userInfo || {};

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>Welcome to Your dashboard {userInfo.firstName}</div>
      {isAuthenticated && userInfo.role === "trainer" && (
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary-blue text-white py-2 px-4 rounded-md"
        >
          Create Activity
        </button>
      )}

      {showModal && (
        <ActivityForm
          isAuthenticated={isAuthenticated}
          userInfo={userInfo}
          setShowModal={setShowModal}
        />
      )}

      {isAuthenticated && userInfo.role === "user" && (
        <Link href="/my-bookings">
          <button className="bg-primary-blue">Go to Your Bookings</button>
        </Link>
      )}

      {/*  {isAuthenticated && userInfo.role === "trainer" && (
        <ActivityForm isAuthenticated={isAuthenticated} userInfo={userInfo} />
      )} */}
    </>
  );
};

export default page;
