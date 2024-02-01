"use client";

import React, { useState } from "react";
import Image from "next/image";
import ClientOnly from "./ClientOnly";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuthToken } from "@/utils/auth";
import { getUserInfoFromAuthToken } from "@/utils/userInfo";

import { removeAuthToken } from "@/utils/auth";

const Nav = () => {
  let authToken = getAuthToken();
  const userInfo = getUserInfoFromAuthToken();
  const { firstName, lastName, image, role } = userInfo;
  const [showLoginModal, setShowLoginModal] = useState(false);
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
              <>
                <Link href={`/reservations/user/${userInfo._id}`}>
                  <li className="cursor-pointer hover:underline">
                    My Bookings
                  </li>
                </Link>
                <Link href="/trainers">
                  <li className="cursor-pointer hover:underline">Trainers</li>
                </Link>
              </>
            )}

            {role === "trainer" && (
              <>
                <Link href="/dashboard">
                  <li className="cursor-pointer hover:underline">Dashboard</li>
                </Link>
                <Link href="/trainers">
                  <li className="cursor-pointer hover:underline">Trainers</li>
                </Link>
              </>
            )}
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <li
              className="cursor-pointer hover:underline"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </li>
            <li className="cursor-pointer hover:underline">Activities</li>
          </ul>
        )}

        {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
      </nav>
    </ClientOnly>
  );
};

export default Nav;
