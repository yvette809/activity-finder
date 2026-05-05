"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getUserInfoFromAuthToken } from "@/lib/userInfo";
import ClientOnly from "@/components/ClientOnly";

export default function ConfirmationPage() {
  return (
    <ClientOnly>
      <Content />
    </ClientOnly>
  );
}

function Content() {
  const userInfo = getUserInfoFromAuthToken();

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gradient-to-br from-forest-50/60 to-white">
      <div className="container-page max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="card p-8 sm:p-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-forest-100 mx-auto mb-6 flex items-center justify-center"
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#194c33"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
            Booking confirmed!
          </h1>
          <p className="text-ink-500 leading-relaxed mb-8">
            Thanks for booking with ActivityFinder. We&apos;ve sent the
            confirmation details to your email — get ready for an
            unforgettable experience.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {userInfo?._id ? (
              <Link
                href={`/reservations/user/${userInfo._id}`}
                className="btn-primary"
              >
                View my bookings
              </Link>
            ) : (
              <Link href="/login" className="btn-primary">
                Sign in
              </Link>
            )}
            <Link href="/" className="btn-secondary">
              Browse more activities
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
