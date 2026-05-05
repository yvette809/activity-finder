import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-950 text-white/70 mt-20">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-forest-700 flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">A</span>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                Activity<span className="text-sun-300">Finder</span>
              </span>
            </div>
            <p className="text-sm text-white/60 max-w-md leading-relaxed">
              Discover and book unforgettable activities run by passionate local
              trainers. From sunrise yoga to mountain hikes — your next adventure
              is one click away.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link href="/trainers" className="hover:text-white transition-colors">
                  Trainers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              Account
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <span className="text-white/50">
            © {year} ActivityFinder. All rights reserved.
          </span>
          <span className="text-white/40 text-xs">
            Built with Next.js · Tailwind · MongoDB
          </span>
        </div>
      </div>
    </footer>
  );
}
