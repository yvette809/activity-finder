"use client";

import Link from "next/link";

export default function TrainerCard({ trainer, index = 0 }) {
  if (!trainer) return null;
  const { _id, firstName, lastName, image, specialisation, experience, role } = trainer;
  const initials = (firstName?.[0] || "") + (lastName?.[0] || "");

  return (
    <Link
      href={`/trainers/${_id}`}
      className="card card-hover group flex flex-col h-full animate-fade-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-forest-50">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-forest-700 font-display font-bold text-5xl">
            {initials.toUpperCase() || "T"}
          </div>
        )}
        {role && (
          <div className="absolute top-3 left-3">
            <span className="tag-forest !bg-white/95 backdrop-blur-sm capitalize">{role}</span>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-display font-bold text-lg text-ink-900 leading-tight tracking-tight group-hover:text-forest-700 transition-colors">
          {firstName} {lastName}
        </h3>
        {specialisation && (
          <p className="text-sm text-forest-700 font-medium mt-1">{specialisation}</p>
        )}
        {experience !== undefined && (
          <p className="text-sm text-ink-500 mt-2">
            {experience} {experience === 1 ? "year" : "years"} of experience
          </p>
        )}
        <div className="mt-auto pt-4 text-sm font-semibold text-forest-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          View profile
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
