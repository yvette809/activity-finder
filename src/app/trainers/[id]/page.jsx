"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getTrainer } from "@/lib/api";
import { Spinner } from "@/components/ui/Loading";

export default function TrainerDetailPage({ params }) {
  const router = useRouter();
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTrainer(params.id);
        setTrainer(data);
      } catch {
        toast.error("Could not load trainer.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [params.id]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <Spinner className="!w-10 !h-10 text-forest-700" />
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="pt-24 container-page py-20 text-center">
        <h1 className="font-display text-2xl">Trainer not found</h1>
      </div>
    );
  }

  const { firstName, lastName, email, image, specialisation, experience, role } = trainer;
  const initials = (firstName?.[0] || "") + (lastName?.[0] || "");

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gradient-to-br from-forest-50/40 to-white">
      <div className="container-page max-w-3xl">
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
          <div className="relative aspect-[2.4/1] bg-forest-100">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={`${firstName} ${lastName}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-forest-700 to-forest-900" />
            )}
          </div>

          <div className="p-8 -mt-16 relative">
            <div className="w-28 h-28 rounded-2xl bg-white border-4 border-white shadow-lift overflow-hidden mb-5">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-forest-100 flex items-center justify-center text-forest-700 font-display font-bold text-3xl">
                  {initials.toUpperCase() || "T"}
                </div>
              )}
            </div>

            <h1 className="font-display text-3xl font-bold text-ink-900 tracking-tight">
              {firstName} {lastName}
            </h1>

            {role && (
              <span className="tag-forest mt-2 capitalize">{role}</span>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
              {specialisation && (
                <InfoRow label="Specialisation" value={specialisation} />
              )}
              {experience !== undefined && (
                <InfoRow label="Experience" value={`${experience} years`} />
              )}
              {email && <InfoRow label="Email" value={email} link={`mailto:${email}`} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, link }) {
  const content = link ? (
    <a href={link} className="text-forest-700 hover:underline break-all">
      {value}
    </a>
  ) : (
    <span className="text-ink-900 font-medium">{value}</span>
  );
  return (
    <div className="p-4 rounded-xl bg-ink-50">
      <div className="text-xs uppercase tracking-wider text-ink-500 mb-1">
        {label}
      </div>
      <div>{content}</div>
    </div>
  );
}
