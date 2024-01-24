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
      <nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-deep-green text-white shadow-lg">
        <Link href="/">
          <Image src="/assets/logo.jpg" alt="logo" height="50" width="50" />
        </Link>
        {authToken ? (
          <ul className="flex space-x-4">
            <li className="flex">
              <span className="mr-2">{firstName}</span>
              <Image src={image} height="30" width="30" />
            </li>
            <li
              className="cursor-pointer hover:underline"
              onClick={handleLogout}
            >
              Logout
            </li>
            {role === "user" && (
              <Link href={`/my-bookings/${userInfo._id}`}>
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
