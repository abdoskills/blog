import { Geist, Geist_Mono, Silkscreen, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import CyberBackground from "@/components/CyberBackground";
import ThemeController from "@/components/ThemeController";
import DynamicTitle from "@/components/DynamicTitle";

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
    default: "hop in !!",
    template: "%s | hop in !!",
  },
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
    title: "hop in !!",
    url: "https://www.abdoskills.me",
    siteName: "abdoskills",
    images: [
      {
        url: "/images/waiting_for_you.jpg",
        width: 1200,
        height: 630,
        alt: "hop in !!",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "hop in !!",
    images: ["/images/waiting_for_you.jpg"],
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
      </head>
      <body className="min-h-full flex flex-col relative transition-colors duration-300">
        <DynamicTitle />
        <CyberBackground />
        <div className="relative z-10 flex flex-col flex-grow">
          {children}
        </div>
        <ThemeController />
      </body>
    </html>
  );
}
