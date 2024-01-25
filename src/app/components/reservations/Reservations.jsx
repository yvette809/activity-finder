import React from "react";
import ReservationCard from "./ReservationCard";

const Reservations = ({ reservations }) => {
  return (
    <>
      {reservations.length <= 0 && (
        <p>There are no reservations for this activity</p>
      )}

      {reservations &&
        reservations.map((reservation) => (
          <ReservationCard reservation={reservation} />
        ))}
    </>
  );
};

export default Reservations;
