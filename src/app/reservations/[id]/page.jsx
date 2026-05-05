"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import toast from "react-hot-toast";
import { getReservationById, cancelReservation } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { getUserInfoFromAuthToken } from "@/lib/userInfo";
import { Spinner } from "@/components/ui/Loading";

export default function ReservationDetailPage({ params }) {
  const router = useRouter();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = getUserInfoFromAuthToken();
  const isAuthenticated = getAuthToken();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    const fetch = async () => {
      try {
        const data = await getReservationById(params.id);
        setReservation(data);
      } catch {
        toast.error("Could not load reservation.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [params.id, isAuthenticated, router]);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this reservation?")) return;
    try {
      await cancelReservation(reservation._id);
      toast.success("Reservation cancelled.");
      router.push(`/reservations/user/${userInfo._id}`);
    } catch {
      toast.error("Could not cancel reservation.");
    }
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Spinner className="!w-10 !h-10 text-forest-700" />
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="pt-24 container-page py-20 text-center">
        <h1 className="font-display text-2xl">Reservation not found</h1>
      </div>
    );
  }

  const activity = reservation.activityId;
  const status = reservation.bookingStatus || "pending";
  const total = (activity?.price || 0) * (reservation.numberOfPersons || 1);
  const canCancel =
    reservation?.userId?._id === userInfo?._id ||
    activity?.creator === userInfo?._id;

  const statusColor = {
    confirmed: "bg-forest-50 text-forest-800 border-forest-200",
    pending: "bg-sun-50 text-sun-800 border-sun-200",
    cancelled: "bg-ink-100 text-ink-600 border-ink-200",
  }[status] || "bg-ink-100 text-ink-600 border-ink-200";

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container-page max-w-2xl">
        <button
          onClick={() => router.back()}
          className="text-sm text-ink-500 hover:text-forest-700 transition-colors inline-flex items-center gap-1.5 mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="card overflow-hidden">
          {activity?.imageSrc && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={activity.imageSrc}
              alt=""
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-8">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div>
                <span className="tag-forest mb-2">Reservation</span>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900 tracking-tight mt-2">
                  {activity?.typeOfActivity || "Activity"}
                </h1>
              </div>
              <span
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border capitalize ${statusColor}`}
              >
                {status}
              </span>
            </div>

            <p className="text-sm text-ink-500 mb-6">
              Booked {moment(reservation.createdAt).format("MMMM D, YYYY")} at{" "}
              {moment(reservation.createdAt).format("h:mm A")}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <Tile
                label="Booked by"
                value={`${reservation.userId?.firstName || ""} ${reservation.userId?.lastName || ""}`}
              />
              <Tile label="People" value={reservation.numberOfPersons} />
              <Tile label="Price per person" value={`$${activity?.price || 0}`} />
              <Tile label="Total" value={`$${total}`} highlight />
            </div>

            {activity?._id && (
              <Link
                href={`/activities/${activity._id}`}
                className="btn-secondary w-full justify-center"
              >
                View activity
              </Link>
            )}

            {canCancel && status !== "cancelled" && (
              <button
                onClick={handleCancel}
                className="btn-danger w-full justify-center mt-3"
              >
                Cancel reservation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, highlight }) {
  return (
    <div className="p-3 rounded-xl bg-ink-50">
      <div className="text-xs uppercase tracking-wider text-ink-500 mb-1">
        {label}
      </div>
      <div
        className={
          highlight
            ? "font-display font-bold text-lg text-forest-700"
            : "font-semibold text-ink-900"
        }
      >
        {value || "—"}
      </div>
    </div>
  );
}
