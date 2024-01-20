import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <p>Thanks for choosing this activity</p>
      <Link href="/my-bookings" className="bg-primary-blue">My Bookings</Link>
    </div>
  );
};

export default page;
