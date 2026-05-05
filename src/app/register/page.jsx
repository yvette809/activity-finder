"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/Loading";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
    role: "user",
    specialisation: "",
    experience: 0,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email is invalid";
    if (!form.password.trim()) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    if (!form.role) e.role = "Please select a role";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Welcome to ActivityFinder!");
        router.push("/login");
      } else {
        const message = await res.text().catch(() => "");
        toast.error(message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not connect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gradient-to-br from-forest-50 to-white">
      <div className="container-page max-w-lg w-full">
        <div className="card p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-forest-700 flex items-center justify-center mx-auto mb-4 shadow-lift">
              <span className="text-white font-display font-bold text-2xl">A</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-ink-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-ink-500 mt-2 text-sm">
              Join as a participant or trainer
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role tabs */}
            <div>
              <label className="label">I want to</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "user", label: "Find activities", emoji: "🎯" },
                  { value: "trainer", label: "Host activities", emoji: "🧑‍🏫" },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => update("role", r.value)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      form.role === r.value
                        ? "bg-forest-700 text-white shadow-soft"
                        : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                    }`}
                  >
                    <span>{r.emoji}</span> {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="First name"
                value={form.firstName}
                onChange={(v) => update("firstName", v)}
                error={errors.firstName}
              />
              <Field
                label="Last name"
                value={form.lastName}
                onChange={(v) => update("lastName", v)}
                error={errors.lastName}
              />
            </div>

            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => update("email", v)}
              error={errors.email}
            />

            <Field
              label="Password"
              type="password"
              value={form.password}
              onChange={(v) => update("password", v)}
              error={errors.password}
              hint="At least 6 characters"
            />

            <Field
              label="Profile image URL"
              value={form.image}
              onChange={(v) => update("image", v)}
              optional
            />

            {form.role === "trainer" && (
              <div className="p-4 rounded-xl bg-forest-50 border border-forest-100 space-y-4">
                <div className="text-xs font-semibold text-forest-700 uppercase tracking-wider">
                  Trainer details
                </div>
                <Field
                  label="Specialisation"
                  value={form.specialisation}
                  onChange={(v) => update("specialisation", v)}
                  placeholder="Yoga, Hiking, Cooking..."
                />
                <Field
                  label="Years of experience"
                  type="number"
                  value={form.experience}
                  onChange={(v) => update("experience", Number(v))}
                />
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full !mt-6">
              {submitting ? <><Spinner /> Creating account...</> : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-forest-700 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", value, onChange, error, hint, placeholder, optional }) {
  return (
    <div>
      <label className="label flex items-center justify-between">
        <span>{label}</span>
        {optional && <span className="text-xs text-ink-400 font-normal">Optional</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input ${error ? "!border-red-300 !ring-red-500/10" : ""}`}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-ink-500">{hint}</p>}
    </div>
  );
}
