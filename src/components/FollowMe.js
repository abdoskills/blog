"use client";

import Link from "next/link";
import { useState } from "react";

export default function FollowMe({
  title = "Follow Me <3",
  subtitle = "Hope you enjoyed this investigation! If this writeup helped your CTF or forensic journey, let's connect across platforms.",
  backHref,
  backLabel,
  hubHref,
  hubLabel,
  className = ""
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText("AbdelrahmanMHasssan@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const socials = [
    {
      name: "GitHub",
      handle: "@abdoskills",
      url: "https://github.com/abdoskills",
      tag: "Code & Solvers",
      desc: "Automated scripts, parsers & CTF writeups",
      borderHover: "hover:border-purple-500/50 hover:bg-purple-950/20",
      accentText: "text-purple-400",
      tagBadge: "bg-purple-500/10 border-purple-500/30 text-purple-300",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    {
      name: "LinkedIn",
      handle: "in/abdoskills",
      url: "https://www.linkedin.com/in/abdoskills",
      tag: "Professional & DFIR",
      desc: "Incident response discussions & milestones",
      borderHover: "hover:border-blue-500/50 hover:bg-blue-950/20",
      accentText: "text-blue-400",
      tagBadge: "bg-blue-500/10 border-blue-500/30 text-blue-300",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
        </svg>
      )
    },
    {
      name: "X (Twitter)",
      handle: "@abdoskills",
      url: "https://x.com/abdoskills",
      tag: "Threat Intel",
      desc: "Real-time threat intel drops & CTF highlights",
      borderHover: "hover:border-cyan-500/50 hover:bg-cyan-950/20",
      accentText: "text-cyan-400",
      tagBadge: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: "Email",
      handle: "AbdelrahmanMHasssan@gmail.com",
      url: "mailto:AbdelrahmanMHasssan@gmail.com",
      tag: "Get in Touch",
      desc: "Security consulting, inquiries & collabs",
      borderHover: "hover:border-emerald-500/50 hover:bg-emerald-950/20",
      accentText: "text-emerald-400",
      tagBadge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <section className={`mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e0e14]/95 via-[#0a0a0f]/95 to-[#06060a]/95 border border-zinc-800/80 shadow-2xl relative overflow-hidden backdrop-blur-xl ${className}`}>
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge & Title */}
      <div className="text-center space-y-3 relative z-10 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-emerald-500/30 text-xs font-mono font-bold tracking-wider shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-300">CONNECT //</span>
          <span className="text-emerald-400 font-bold">FOLLOW ME &lt;3</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Social Cards Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {socials.map((s) => (
          <a
            key={s.name}
            href={s.url}
            target={s.url.startsWith("mailto:") ? undefined : "_blank"}
            rel={s.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            className={`group p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg ${s.borderHover}`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className={`p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80 ${s.accentText} group-hover:scale-110 transition-transform duration-300`}>
                  {s.icon}
                </div>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${s.tagBadge}`}>
                  {s.tag}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {s.name}
                  </h4>
                  <span className="text-xs text-zinc-500 group-hover:text-emerald-400 transition-colors">↗</span>
                </div>
                <div className="font-mono text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors truncate">
                  {s.handle}
                </div>
                <p className="text-[11px] text-zinc-500 font-sans leading-snug pt-1">
                  {s.desc}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
              <span>Visit Profile</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Action & Nav Bar */}
      <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Email Quick Copy */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">Direct Contact:</span>
          <button
            onClick={handleCopyEmail}
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-all cursor-pointer"
          >
            {copiedEmail ? (
              <span className="text-emerald-400 font-bold">Email Copied!</span>
            ) : (
              <span>AbdelrahmanMHasssan@gmail.com</span>
            )}
          </button>
        </div>

        {/* Back / Hub Links if specified */}
        {(backHref || hubHref) && (
          <div className="flex items-center gap-3 font-mono text-xs">
            {backHref && (
              <Link
                href={backHref}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              >
                ← {backLabel || "Back"}
              </Link>
            )}
            {hubHref && (
              <Link
                href={hubHref}
                className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 transition-colors"
              >
                {hubLabel || "Hub"} →
              </Link>
            )}
          </div>
        )}
      </div>

    </section>
  );
}
