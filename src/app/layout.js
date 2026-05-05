import { Inter, Syne } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata = {
  title: "ActivityFinder — Discover & book unforgettable activities",
  description:
    "Find local activities run by passionate trainers. From sunrise yoga to mountain hikes, book your next adventure.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3500,
            style: {
              borderRadius: "12px",
              background: "#194c33",
              color: "#fff",
              fontWeight: 500,
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#fbcb4d", secondary: "#194c33" },
            },
          }}
        />
        <Navigation />
        <main className="flex-1 pt-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
