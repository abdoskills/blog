import { Geist, Geist_Mono, Silkscreen, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import CyberBackground from "@/components/CyberBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: "400",
  variable: "--font-silkscreen",
  subsets: ["latin"],
});

const shareTech = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech",
  subsets: ["latin"],
});

export const metadata = {
  title: "Skills | Threat Intel & Forensics Portfolio",
  description: "Digital Forensics, OSINT, and Threat Intel Master Operational Breakdowns",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} ${shareTech.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-[#060709] text-gray-100 selection:bg-pink-500/30 selection:text-pink-200">
        <CyberBackground />
        <div className="relative z-10 flex flex-col flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
