"use client";

import React, { useState } from "react";
import Image from "next/image";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuthToken } from "@/utils/auth";
import { removeAuthToken } from "@/utils/auth";
import jwt from "jsonwebtoken";

const Nav = () => {
  let authToken = getAuthToken();
  const decodedToken = jwt.decode(authToken);
  const userInfo = decodedToken?.userInfo || {};
  const { firstName, lastName, image, role } = userInfo;
  const [showModal, setShowModal] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    setLoggedOut(true);
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-primary-blue text-white">
      <Link href="/">
        <Image src="/assets/logo.jpg" alt="logo" height="50" width="50" />
      </Link>
      {authToken ? (
        <ul className="flex space-x-4">
          <li className="cursor-pointer hover:underline" onClick={handleLogout}>
            Logout
          </li>
          <li className="cursor-pointer hover:underline">My Bookings</li>
          {role === "trainer" && (
            <li className="cursor-pointer hover:underline">Dashboard</li>
          )}
          <li className="cursor-pointer hover:underline">My Profile</li>
        </ul>
      ) : (
        <ul className="flex space-x-4">
          <li
            className="cursor-pointer hover:underline"
            onClick={() => setShowModal(true)}
          >
            Login
          </li>
          <li className="cursor-pointer hover:underline">Activities</li>
        </ul>
      )}

      {showModal && <LoginModal setShowModal={setShowModal} />}
    </nav>
  );
};

export default Nav;
