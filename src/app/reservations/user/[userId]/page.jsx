"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import toast from "react-hot-toast";
import { getUserReservations, cancelReservation } from "@/lib/api";
import { getUserInfoFromAuthToken } from "@/lib/userInfo";
import EmptyState from "@/components/ui/EmptyState";
import { Spinner } from "@/components/ui/Loading";

export default function UserReservationsPage({ params }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = getUserInfoFromAuthToken();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getUserReservations(params.userId);
        setReservations(data);
      } catch {
        toast.error("Could not load reservations.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [params.userId]);

  const handleCancel = async (reservationId) => {
    if (!window.confirm("Are you sure you want to cancel this reservation?")) {
      return;
    }
    try {
      await cancelReservation(reservationId);
      setReservations((rs) => rs.filter((r) => r._id !== reservationId));
      toast.success("Reservation cancelled.");
    } catch {
      toast.error("Could not cancel. Please try again.");
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container-page max-w-4xl">
        <header className="mb-10">
          <span className="tag-forest mb-3">My account</span>
          <h1 className="font-display text-4xl font-extrabold text-ink-900 tracking-tight mt-3">
            Your bookings
          </h1>
          <p className="text-ink-500 mt-2">
            Manage your upcoming and past activity reservations.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner className="!w-10 !h-10 text-forest-700" />
          </div>
        ) : reservations.length === 0 ? (
          <EmptyState
            icon={<span className="text-3xl">📅</span>}
            title="No bookings yet"
            description="Browse activities and find your next adventure."
            action={
              <Link href="/" className="btn-primary">
                Browse activities
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation._id}
                reservation={reservation}
                user={userInfo}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ReservationCard({ reservation, user, onCancel }) {
  const activity = reservation?.activityId;
  const status = reservation?.bookingStatus || "pending";
  const total = (activity?.price || 0) * (reservation?.numberOfPersons || 1);

  const canCancel =
    reservation?.userId?._id === user?._id ||
    reservation?.activityId?.creator === user?._id;

  const statusColor = {
    confirmed: "bg-forest-50 text-forest-800",
    pending: "bg-sun-50 text-sun-800",
    cancelled: "bg-ink-100 text-ink-600",
  }[status] || "bg-ink-100 text-ink-600";

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Activity image */}
        {activity?.imageSrc && (
          <Link href={`/activities/${activity._id}`} className="block sm:w-40 sm:flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activity.imageSrc}
              alt=""
              className="w-full sm:w-40 h-32 object-cover rounded-xl"
            />
          </Link>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 justify-between">
            <Link href={`/activities/${activity?._id}`} className="block">
              <h3 className="font-display text-xl font-bold text-ink-900 tracking-tight hover:text-forest-700 transition-colors">
                {activity?.typeOfActivity || "Activity"}
              </h3>
            </Link>
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusColor}`}>
              {status}
            </span>
          </div>

          <p className="text-sm text-ink-500 mt-1">
            Booked {moment(reservation.createdAt).fromNow()} ·{" "}
            {reservation.numberOfPersons} person
            {reservation.numberOfPersons === 1 ? "" : "s"}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="text-sm">
              <div className="text-xs uppercase tracking-wider text-ink-500">
                Price
              </div>
              <div className="font-semibold text-ink-900 mt-0.5">
                ${activity?.price || 0} × {reservation.numberOfPersons}
              </div>
            </div>
            <div className="text-sm">
              <div className="text-xs uppercase tracking-wider text-ink-500">
                Total
              </div>
              <div className="font-display font-bold text-ink-900 mt-0.5">
                ${total}
              </div>
            </div>
          </div>

          {canCancel && status !== "cancelled" && (
            <button
              onClick={() => onCancel(reservation._id)}
              className="btn-danger mt-4"
            >
              Cancel reservation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
