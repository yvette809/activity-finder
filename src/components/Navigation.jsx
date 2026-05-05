"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { getAuthToken, removeAuthToken } from "@/lib/auth";
import { getUserInfoFromAuthToken } from "@/lib/userInfo";
import ClientOnly from "./ClientOnly";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <ClientOnly fallback={<NavSkeleton />}>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white/90 backdrop-blur-lg border-b border-ink-100"
            : "bg-transparent"
        }`}
      >
        <div className="container-page flex items-center justify-between h-16 sm:h-20">
          <NavLogo scrolled={scrolled || mobileOpen} />

          <DesktopMenu />

          <DesktopAuth
            scrolled={scrolled || mobileOpen}
            userMenuOpen={userMenuOpen}
            setUserMenuOpen={setUserMenuOpen}
          />

          <MobileToggle
            open={mobileOpen}
            scrolled={scrolled || mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          />
        </div>
      </nav>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </ClientOnly>
  );
}

/* ──────────────── Logo ──────────────── */
function NavLogo({ scrolled }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-xl bg-forest-700 flex items-center justify-center shadow-soft group-hover:shadow-lift transition-shadow">
        <span className="text-white font-display font-bold text-lg">A</span>
      </div>
      <span
        className={`font-display font-bold text-lg tracking-tight transition-colors ${
          scrolled ? "text-ink-900" : "text-white"
        }`}
      >
        Activity<span className="text-forest-500">Finder</span>
      </span>
    </Link>
  );
}

/* ──────────────── Desktop Menu ──────────────── */
function DesktopMenu() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Activities" },
    { href: "/trainers", label: "Trainers" },
  ];

  return (
    <ul className="hidden md:flex items-center gap-1">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                active
                  ? "text-forest-700"
                  : "text-ink-600 hover:text-forest-700 hover:bg-forest-50/50"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/* ──────────────── Desktop Auth ──────────────── */
function DesktopAuth({ scrolled, userMenuOpen, setUserMenuOpen }) {
  const router = useRouter();
  const authToken = getAuthToken();
  const userInfo = getUserInfoFromAuthToken();
  const { firstName, image, role, _id } = userInfo;

  const handleLogout = () => {
    removeAuthToken();
    setUserMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  if (!authToken) {
    return (
      <div className="hidden md:flex items-center gap-2">
        <Link href="/login" className="btn-ghost">
          Login
        </Link>
        <Link
          href="/register"
          className="btn-primary !py-2.5 !px-5 !text-sm"
        >
          Get started
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:block relative">
      <button
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-colors ${
          scrolled ? "hover:bg-ink-100" : "hover:bg-white/10"
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-forest-100 overflow-hidden flex items-center justify-center text-forest-700 font-semibold text-sm">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={firstName || "user"} className="w-full h-full object-cover" />
          ) : (
            (firstName?.[0] || "U").toUpperCase()
          )}
        </div>
        <span
          className={`text-sm font-medium ${
            scrolled ? "text-ink-800" : "text-white"
          }`}
        >
          {firstName ? firstName.charAt(0).toUpperCase() + firstName.slice(1) : "Account"}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={scrolled ? "text-ink-500" : "text-white/70"}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {userMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setUserMenuOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lift border border-ink-100 py-2 z-20 animate-fade-up">
            <div className="px-4 py-3 border-b border-ink-100">
              <div className="text-xs text-ink-500 uppercase tracking-wider">
                Signed in as
              </div>
              <div className="text-sm font-semibold text-ink-900 truncate mt-0.5 capitalize">
                {firstName} <span className="text-ink-400">·</span>{" "}
                <span className="text-forest-600">{role}</span>
              </div>
            </div>
            {role === "user" && (
              <Link
                href={`/reservations/user/${_id}`}
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50 hover:text-forest-700 transition-colors"
              >
                <span>📅</span> My bookings
              </Link>
            )}
            {role === "trainer" && (
              <Link
                href="/dashboard"
                onClick={() => setUserMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50 hover:text-forest-700 transition-colors"
              >
                <span>📊</span> Dashboard
              </Link>
            )}
            <Link
              href="/trainers"
              onClick={() => setUserMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-ink-700 hover:bg-ink-50 hover:text-forest-700 transition-colors"
            >
              <span>🧑‍🏫</span> Trainers
            </Link>
            <div className="border-t border-ink-100 mt-2 pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <span>↗</span> Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ──────────────── Mobile ──────────────── */
function MobileToggle({ open, scrolled, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
    >
      <span
        className={`block w-6 h-0.5 transition-all duration-300 ${
          scrolled ? "bg-ink-900" : "bg-white"
        } ${open ? "rotate-45 translate-y-2" : ""}`}
      />
      <span
        className={`block w-6 h-0.5 transition-all duration-300 ${
          scrolled ? "bg-ink-900" : "bg-white"
        } ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block w-6 h-0.5 transition-all duration-300 ${
          scrolled ? "bg-ink-900" : "bg-white"
        } ${open ? "-rotate-45 -translate-y-2" : ""}`}
      />
    </button>
  );
}

function MobileDrawer({ open, onClose }) {
  const router = useRouter();
  const authToken = getAuthToken();
  const userInfo = getUserInfoFromAuthToken();
  const { firstName, role, _id } = userInfo;

  const handleLogout = () => {
    removeAuthToken();
    onClose();
    router.push("/");
    router.refresh();
  };

  return (
    <div
      className={`md:hidden fixed inset-0 z-40 bg-white pt-20 transition-all duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="container-page py-8 flex flex-col gap-1">
        {[
          { href: "/", label: "Activities", icon: "🎯" },
          { href: "/trainers", label: "Trainers", icon: "🧑‍🏫" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-4 text-lg font-semibold text-ink-900 rounded-xl hover:bg-ink-50 transition-colors"
          >
            <span>{link.icon}</span>
            {link.label}
          </Link>
        ))}

        {authToken && role === "user" && (
          <Link
            href={`/reservations/user/${_id}`}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-4 text-lg font-semibold text-ink-900 rounded-xl hover:bg-ink-50 transition-colors"
          >
            <span>📅</span> My bookings
          </Link>
        )}

        {authToken && role === "trainer" && (
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-4 text-lg font-semibold text-ink-900 rounded-xl hover:bg-ink-50 transition-colors"
          >
            <span>📊</span> Dashboard
          </Link>
        )}

        <div className="border-t border-ink-100 mt-6 pt-6 flex flex-col gap-3">
          {!authToken ? (
            <>
              <Link href="/login" onClick={onClose} className="btn-secondary w-full">
                Login
              </Link>
              <Link href="/register" onClick={onClose} className="btn-primary w-full">
                Get started
              </Link>
            </>
          ) : (
            <>
              <div className="px-4 py-3 bg-forest-50 rounded-xl">
                <div className="text-xs text-ink-500 uppercase tracking-wider">
                  Signed in as
                </div>
                <div className="text-sm font-semibold text-ink-900 mt-0.5 capitalize">
                  {firstName} <span className="text-ink-400">·</span>{" "}
                  <span className="text-forest-600">{role}</span>
                </div>
              </div>
              <button onClick={handleLogout} className="btn-danger w-full">
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NavSkeleton() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-20">
      <div className="container-page flex items-center justify-between h-full">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10" />
          <div className="w-32 h-5 rounded bg-white/10" />
        </div>
      </div>
    </nav>
  );
}
