"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";
import toast from "react-hot-toast";
import { getActivity } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { getUserInfoFromAuthToken } from "@/lib/userInfo";
import { formatDuration } from "@/lib/formatTime";
import { Spinner } from "@/components/ui/Loading";
import StarRating from "@/components/StarRating";

export default function ActivityDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = getAuthToken();
  const userInfo = getUserInfoFromAuthToken();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getActivity(id);
        setActivity(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load activity.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetch();
  }, [id]);

  const handleBookClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    router.push(`/activities/${id}/booking`);
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Spinner className="!w-10 !h-10 text-forest-700" />
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="pt-24 container-page py-20 text-center">
        <h1 className="font-display text-2xl text-ink-900">Activity not found</h1>
        <p className="text-ink-500 mt-2">It may have been removed or never existed.</p>
        <button onClick={() => router.push("/")} className="btn-primary mt-6">
          Back to activities
        </button>
      </div>
    );
  }

  const {
    _id,
    creator,
    typeOfActivity,
    location,
    description,
    capacity,
    price,
    activityStatus,
    imageSrc,
    activityTimes = [],
    skillLevel,
    ageGroup,
    reservations = [],
    reviews = [],
  } = activity;

  const reserved = reservations?.length || 0;
  const spotsLeft = Math.max(0, (capacity || 0) - reserved);
  const isFull = activityStatus === "full-booked" || spotsLeft === 0;
  const isOwner =
    isAuthenticated && userInfo?.role === "trainer" && creator?._id === userInfo?._id;

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      : 0;

  return (
    <div className="pt-24 pb-16">
      {/* Hero image */}
      {imageSrc && (
        <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={typeOfActivity} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-page pb-8">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tag-forest !bg-forest-100/90 backdrop-blur-sm">
                {typeOfActivity}
              </span>
              {skillLevel && <span className="tag !bg-white/90 backdrop-blur-sm">{skillLevel}</span>}
              {ageGroup && <span className="tag !bg-white/90 backdrop-blur-sm">{ageGroup}</span>}
            </div>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {typeOfActivity}
            </h1>
            {creator?.firstName && (
              <p className="text-white/90 mt-2 text-lg">
                with{" "}
                <span className="font-semibold">
                  {creator.firstName} {creator.lastName}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="container-page mt-8">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* Main column */}
          <div className="space-y-8">
            {/* Quick info row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <InfoTile label="Location" value={location} />
              <InfoTile label="Spots left" value={isFull ? "Full" : `${spotsLeft} / ${capacity}`} highlight={isFull ? "danger" : spotsLeft <= 3 ? "warning" : null} />
              <InfoTile label="Price" value={`$${price}`} />
              <InfoTile label="Rating" value={avgRating ? avgRating.toFixed(1) : "—"} />
            </div>

            {description && (
              <section>
                <h2 className="font-display text-xl font-bold text-ink-900 mb-3">
                  About this activity
                </h2>
                <p className="text-ink-600 leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </section>
            )}

            {activityTimes.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-bold text-ink-900 mb-4">
                  Available sessions
                </h2>
                <div className="space-y-3">
                  {activityTimes.map((slot, idx) => (
                    <div
                      key={slot._id || idx}
                      className="flex items-center justify-between p-4 rounded-xl border border-ink-100 hover:border-forest-300 hover:bg-forest-50/30 transition-colors"
                    >
                      <div>
                        <div className="font-semibold text-ink-900">
                          {moment(slot.startTime).format("dddd, MMMM Do")}
                        </div>
                        <div className="text-sm text-ink-500 mt-0.5">
                          {moment(slot.startTime).format("h:mm A")} –{" "}
                          {moment(slot.endTime).format("h:mm A")}
                        </div>
                      </div>
                      <div className="text-xs text-ink-500 font-mono">
                        {formatDuration(slot.startTime, slot.endTime)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section>
              <h2 className="font-display text-xl font-bold text-ink-900 mb-4">
                Reviews ({reviews.length})
              </h2>
              {reviews.length === 0 ? (
                <p className="text-ink-500">No reviews yet — be the first.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="p-5 rounded-xl border border-ink-100">
                      <div className="flex items-center gap-3 mb-3">
                        {review.userId?.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={review.userId.image}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-ink-900">
                            {review.userId?.firstName} {review.userId?.lastName}
                          </div>
                          <StarRating rating={review.rating || 0} />
                        </div>
                      </div>
                      <p className="text-ink-600 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Booking sidebar */}
          <aside className="lg:sticky lg:top-28 h-fit">
            <div className="card p-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display font-bold text-3xl text-ink-900">
                  ${price}
                </span>
                <span className="text-sm text-ink-500">per person</span>
              </div>

              {isFull ? (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 font-medium">
                  This activity is fully booked.
                </div>
              ) : spotsLeft <= 3 ? (
                <div className="p-3 rounded-xl bg-sun-50 border border-sun-200 text-sm text-sun-800 font-medium">
                  Only {spotsLeft} spot{spotsLeft === 1 ? "" : "s"} left!
                </div>
              ) : null}

              <button
                onClick={handleBookClick}
                disabled={isFull}
                className="btn-primary w-full !py-4"
              >
                {isFull ? "Fully booked" : "Book this activity"}
              </button>

              {isOwner && (
                <button
                  onClick={() => router.push(`/dashboard`)}
                  className="btn-secondary w-full"
                >
                  Manage activity
                </button>
              )}

              <div className="text-xs text-ink-500 text-center pt-2">
                Free cancellation up to 24h before
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function InfoTile({ label, value, highlight }) {
  const colorClass =
    highlight === "danger"
      ? "text-red-700"
      : highlight === "warning"
      ? "text-sun-700"
      : "text-ink-900";
  return (
    <div className="p-3 rounded-xl bg-ink-50">
      <div className="text-xs uppercase tracking-wider text-ink-500 mb-1">
        {label}
      </div>
      <div className={`font-semibold ${colorClass}`}>{value || "—"}</div>
    </div>
  );
}
