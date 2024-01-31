import React from "react";

const ReservationCard = ({ reservation }) => {
 
  return (
    <>
      <p>{reservation?.userId?.firstName}</p>
    </>
  );
};

export default ReservationCard;
