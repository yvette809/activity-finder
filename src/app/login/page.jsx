"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/Loading";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Welcome back!");
        router.push("/dashboard");
        router.refresh();
      } else {
        const message = await res.text().catch(() => "");
        setError(message || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Could not connect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-to-br from-forest-50 to-white">
      <div className="container-page max-w-md w-full">
        <div className="card p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-forest-700 flex items-center justify-center mx-auto mb-4 shadow-lift">
              <span className="text-white font-display font-bold text-2xl">A</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 tracking-tight">
              Welcome back
            </h1>
            <p className="text-ink-500 mt-2 text-sm">
              Sign in to access your bookings & dashboard
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@email.com"
                className="input"
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="input"
                disabled={submitting}
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? <><Spinner /> Signing in...</> : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-forest-700 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
