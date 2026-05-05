"use client";

export function ActivityCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16" />
          <div className="skeleton h-5 w-20" />
        </div>
        <div className="skeleton h-6 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
        <div className="flex justify-between pt-2">
          <div className="skeleton h-5 w-16" />
          <div className="skeleton h-5 w-12" />
        </div>
      </div>
    </div>
  );
}

export function ActivitiesGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ActivityCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function Spinner({ className = "" }) {
  return (
    <div
      className={`inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
