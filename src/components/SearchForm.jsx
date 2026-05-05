"use client";

import { useState, useMemo } from "react";

export default function SearchForm({ onSearch, onClear, activities = [], hasActiveSearch }) {
  const [filters, setFilters] = useState({
    typeOfActivity: "",
    location: "",
    creator: "",
  });

  // Defensive — older data may have activities without creators
  const activityTypes = useMemo(
    () =>
      Array.from(
        new Set(
          activities
            .map((a) => a?.typeOfActivity)
            .filter((t) => typeof t === "string" && t.length > 0)
        )
      ).sort(),
    [activities]
  );

  const creators = useMemo(() => {
    const map = new Map();
    for (const a of activities) {
      if (a?.creator?._id && a?.creator?.firstName) {
        map.set(a.creator._id, a.creator.firstName);
      }
    }
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [activities]);

  const update = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({ typeOfActivity: "", location: "", creator: "" });
    onClear?.();
  };

  return (
    <section className="relative -mt-12 sm:-mt-16 z-20">
      <div className="container-page">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lift border border-ink-100 p-5 sm:p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Activity type</label>
              <select
                value={filters.typeOfActivity}
                onChange={(e) => update("typeOfActivity", e.target.value)}
                className="input"
              >
                <option value="">All types</option>
                {activityTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Location</label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Stockholm"
                className="input"
              />
            </div>

            <div>
              <label className="label">Trainer</label>
              <select
                value={filters.creator}
                onChange={(e) => update("creator", e.target.value)}
                className="input"
              >
                <option value="">Any trainer</option>
                {creators.map(([id, name]) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button type="submit" className="btn-primary flex-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Search
            </button>
            {hasActiveSearch && (
              <button
                type="button"
                onClick={handleClear}
                className="btn-secondary"
              >
                Clear filters
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
