"use client";

import React, { useState } from "react";
import Image from "next/image";
import ClientOnly from "./ClientOnly";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuthToken } from "@/utils/auth";
import { getUserInfoFromAuthToken } from "@/utils/userInfo";

import { removeAuthToken } from "@/utils/auth";

const Navigation = () => {
  let authToken = getAuthToken();
  console.log("authToken", authToken);
  const userInfo = getUserInfoFromAuthToken();
  const { firstName, lastName, image, role } = userInfo;
  const [loggedOut, setLoggedOut] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    removeAuthToken();
    setLoggedOut(true);
    router.push("/");
  };

  return (
    <ClientOnly>
      <nav className=" flex items-center justify-between p-4 bg-deep-green text-white shadow-lg">
        <Link href="/">
          <Image src="/assets/logo.jpg" alt="logo" height="50" width="50" />
        </Link>
        {authToken ? (
          <ul className="flex space-x-4">
            <li className="flex">
              <Image src={image} height="30" width="30" className="mr-2" />
              <span className="mr-2">{firstName}</span>
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
            <li className="cursor-pointer hover:underline">
              <Link href="/login"> Login</Link>
            </li>

            <li className="cursor-pointer hover:underline">
              {" "}
              <Link href="/">Activities </Link>
            </li>
          </ul>
        )}
      </nav>
    </ClientOnly>
  );
};

export default Navigation;
