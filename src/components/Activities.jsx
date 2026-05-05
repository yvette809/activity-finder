"use client";

import ActivityCard from "./ActivityCard";
import EmptyState from "./ui/EmptyState";
import { ActivitiesGridSkeleton } from "./ui/Loading";

export default function Activities({
  data,
  loading = false,
  title = "Featured activities",
  subtitle = "Hand-picked experiences from our top trainers",
}) {
  return (
    <section id="activities" className="py-16 sm:py-20">
      <div className="container-page">
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-ink-500 max-w-xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {loading && <ActivitiesGridSkeleton />}

        {!loading && (!data || data.length === 0) && (
          <EmptyState
            icon={
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            }
            title="No activities found"
            description="Try adjusting your filters or check back later — new activities are added all the time."
          />
        )}

        {!loading && data && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((activity, idx) => (
              <ActivityCard key={activity._id} activity={activity} index={idx} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
