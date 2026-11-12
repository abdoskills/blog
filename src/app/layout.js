import { Geist, Geist_Mono, Silkscreen, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import CyberBackground from "@/components/CyberBackground";
import ThemeController from "@/components/ThemeController";
import DynamicTitle from "@/components/DynamicTitle";
import { Analytics } from "@vercel/analytics/next";

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
  metadataBase: new URL("https://www.abdoskills.me"),
  title: {
    default: "abdoskills | Digital Forensics & Incident Response",
    template: "%s | abdoskills",
  },
  description: "Digital Forensics & Incident Response (DFIR) operational writeups, CTF walkthroughs, memory analysis, network PCAP forensics, and threat hunting by AbdelRahman Mohamed Hassan.",
  keywords: [
    "abdoskills",
    "abdo skills",
    "abdo",
    "digital forensics",
    "incident response",
    "dfir",
    "threat intelligence",
    "reverse engineering",
    "memory forensics",
    "volatility 3",
    "picoctf writeups",
    "kaspersky ctf",
    "ascwg writeups",
    "malware analysis",
    "cybersecurity",
    "forensics portfolio",
  ],
  authors: [{ name: "abdoskills", url: "https://www.abdoskills.me" }],
  creator: "abdoskills",
  publisher: "abdoskills",
  alternates: {
    canonical: "https://www.abdoskills.me",
  },
  openGraph: {
    title: "abdoskills | Digital Forensics & Incident Response",
    description: "Digital Forensics & Incident Response (DFIR) operational writeups, CTF walkthroughs, memory analysis, network PCAP forensics, and threat hunting by AbdelRahman Mohamed Hassan.",
    url: "https://www.abdoskills.me",
    siteName: "abdoskills",
    images: [
      {
        url: "/images/abdoskills_og_banner.jpg",
        width: 1200,
        height: 630,
        alt: "abdoskills — DFIR & Threat Defense Dossiers",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "abdoskills | Digital Forensics & Incident Response",
    description: "Digital Forensics & Incident Response (DFIR) operational writeups, CTF walkthroughs, memory analysis, network PCAP forensics, and threat hunting by AbdelRahman Mohamed Hassan.",
    images: ["/images/abdoskills_og_banner.jpg"],
    creator: "@abdoskills",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.abdoskills.me/#website",
        "url": "https://www.abdoskills.me",
        "name": "abdoskills",
        "alternateName": "Abdo Skills",
        "description": "Digital Forensics, Incident Response, OSINT, and Threat Intelligence Master Operational Breakdowns",
        "publisher": {
          "@id": "https://www.abdoskills.me/#person",
        },
      },
      {
        "@type": "Person",
        "@id": "https://www.abdoskills.me/#person",
        "name": "abdoskills",
        "alternateName": "Abdo Skills",
        "url": "https://www.abdoskills.me",
        "jobTitle": "Digital Forensics & Incident Response (DFIR) Practitioner",
        "sameAs": [
          "https://github.com/abdoskills",
          "https://www.linkedin.com/in/abdoskills",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${silkscreen.variable} ${shareTech.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="3fbff2bf-6ea4-4a43-b919-d891265b37ec"
        />
      </head>
      <body className="min-h-full flex flex-col relative transition-colors duration-300">
        <DynamicTitle />
        <CyberBackground />
        <div className="relative z-10 flex flex-col flex-grow">
          {children}
        </div>
        <ThemeController />
        <Analytics />
      </body>
    </html>
  );
}
