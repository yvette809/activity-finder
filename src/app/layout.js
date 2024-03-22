import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ToasterProvider from "@/ToastProvider";

//const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Activity-finder",
  description: "App to help you find activity",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <ToasterProvider />
        <Navigation />
        <div style={{ flex: 1 }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
