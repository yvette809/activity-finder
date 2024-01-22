"use client";

import React, { useState } from "react";
import Image from "next/image";
import ClientOnly from "./ClientOnly";
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
    <ClientOnly>
      <nav className="flex items-center justify-between p-4 bg-primary-blue text-white">
        <Link href="/">
          <Image src="/assets/logo.jpg" alt="logo" height="50" width="50" />
        </Link>
        {authToken ? (
          <ul className="flex space-x-4">
            <li><span>{firstName}</span><Image src={image} height="30" width="30"/></li>
            <li
              className="cursor-pointer hover:underline"
              onClick={handleLogout}
            >
              Logout
            </li>
            {role === "user" && (
              <Link href="/my-bookings">
                <li className="cursor-pointer hover:underline">My Bookings</li>
              </Link>
            )}

            {role === "trainer" && (
              <>
                <Link href="/dashboard">
                  <li className="cursor-pointer hover:underline">Dashboard</li>
                </Link>
                <Link href="/my-profile">
                  <li className="cursor-pointer hover:underline">Profile</li>
                </Link>
              </>
            )}
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
    </ClientOnly>
  );
};

export default Nav;
