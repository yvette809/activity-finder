"use client";

import Link from "next/link";
import Image from "next/image";
import moment from "moment";

export default function ActivityCard({ activity, index = 0 }) {
  if (!activity) return null;

  const {
    _id,
    imageSrc,
    typeOfActivity,
    location,
    activityTimes = [],
    creator,
    price,
    capacity,
    reservations = [],
    activityStatus,
    skillLevel,
  } = activity;

  const reserved = reservations?.length || 0;
  const spotsLeft = Math.max(0, (capacity || 0) - reserved);
  const isFull = activityStatus === "full-booked" || spotsLeft === 0;
  const isAlmostFull = !isFull && spotsLeft <= 3;

  const nextSession = activityTimes[0];

  return (
    <Link
      href={`/activities/${_id}`}
      className="card card-hover group flex flex-col h-full animate-fade-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={typeOfActivity || "Activity"}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-300">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* Top-right status badge */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {isFull && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500 text-white shadow-lift">
              Fully booked
            </span>
          )}
          {isAlmostFull && (
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sun-400 text-forest-950 shadow-lift">
              Almost full · {spotsLeft} left
            </span>
          )}
        </div>

        {/* Top-left price badge */}
        {price !== undefined && price !== null && (
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-soft">
            <span className="font-display font-bold text-sm text-ink-900">
              ${price}
            </span>
            <span className="text-xs text-ink-500 ml-0.5">/ person</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {typeOfActivity && <span className="tag-forest">{typeOfActivity}</span>}
          {skillLevel && <span className="tag">{skillLevel}</span>}
        </div>

        <h3 className="font-display font-bold text-lg text-ink-900 leading-tight tracking-tight mb-2 group-hover:text-forest-700 transition-colors">
          {typeOfActivity || "Activity"}
          {creator?.firstName && (
            <span className="text-ink-500 font-medium"> · with {creator.firstName}</span>
          )}
        </h3>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-1.5 text-sm text-ink-500 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{location}</span>
          </div>
        )}

        {/* Next session */}
        {nextSession && (
          <div className="flex items-center gap-1.5 text-sm text-ink-600 mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <span>
              {moment(nextSession.startTime).format("ddd, MMM D · h:mm A")}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-ink-100 flex items-center justify-between text-xs">
          <span className="text-ink-500">
            {capacity !== undefined && (
              <>
                <span className="font-semibold text-ink-700">{spotsLeft}</span>{" "}
                / {capacity} spots
              </>
            )}
          </span>
          <span className="font-semibold text-forest-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
            View
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
