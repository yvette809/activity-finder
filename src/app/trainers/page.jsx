"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TrainerCard from "@/components/TrainerCard";
import EmptyState from "@/components/ui/EmptyState";
import { ActivitiesGridSkeleton } from "@/components/ui/Loading";
import { getTrainers } from "@/lib/api";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTrainers();
        setTrainers(data);
      } catch {
        toast.error("Could not load trainers.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="pt-32 pb-16 min-h-screen">
      <div className="container-page">
        <header className="text-center mb-12">
          <span className="tag-forest mb-4">Meet the team</span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink-900 tracking-tight mt-4">
            Our trainers
          </h1>
          <p className="text-ink-500 mt-3 max-w-xl mx-auto">
            Passionate locals leading unforgettable experiences across the region.
          </p>
        </header>

        {loading ? (
          <ActivitiesGridSkeleton count={6} />
        ) : trainers.length === 0 ? (
          <EmptyState
            icon={<span className="text-3xl">🧑‍🏫</span>}
            title="No trainers yet"
            description="Check back soon — trainers are joining all the time."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trainers.map((trainer, idx) => (
              <TrainerCard key={trainer._id} trainer={trainer} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
