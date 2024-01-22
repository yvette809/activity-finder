import React from "react";

const ReservationCard = ({ reservation }) => {
  console.log("reservation", reservation);
  return (
    <>
      <p>{reservation?.userId?.firstName}</p>
    </>
  );
};

export default ReservationCard;
