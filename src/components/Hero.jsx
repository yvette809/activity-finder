"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({ onSearchClick }) {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/main.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950/85 via-forest-900/70 to-ink-950/80" />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Decorative blob */}
      <div
        className="absolute top-1/4 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(250,180,36,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="container-page relative z-10 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          >
            <span className="w-2 h-2 rounded-full bg-sun-400 animate-pulse" />
            <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
              Activities · Trainers · Booking
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Seize the day.
            <br />
            <span className="text-sun-300">Book unforgettable</span>
            <br />
            adventures.
          </h1>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mb-10">
            Discover and book activities run by passionate local trainers — from
            yoga at sunrise to mountain hikes and cooking workshops.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onSearchClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded-xl bg-sun-400 text-forest-950 hover:bg-sun-300 transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Find an activity
            </button>
            <a
              href="#activities"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20 transition-all"
            >
              Browse all
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 flex flex-wrap gap-x-12 gap-y-6 text-white/90"
          >
            {[
              { value: "200+", label: "Activities" },
              { value: "50+", label: "Trainers" },
              { value: "4.9", label: "Average rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl sm:text-3xl font-bold text-sun-300">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-white/60 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/60">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          className="animate-bounce"
        >
          <path
            d="M8 5v14M3 14l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
