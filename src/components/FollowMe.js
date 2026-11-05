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
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const handleCopyDiscord = async (e) => {
    try {
      await navigator.clipboard.writeText("abdo_skills.");
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    } catch (err) {
      console.error("Failed to copy Discord handle:", err);
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
      name: "Discord",
      handle: "abdo_skills.",
      url: "https://discord.com",
      isDiscord: true,
      tag: "Direct Message",
      desc: "DM on Discord for forensics triage, CTFs & collabs",
      borderHover: "hover:border-indigo-500/50 hover:bg-indigo-950/20",
      accentText: "text-indigo-400",
      tagBadge: "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )
    }
  ];

  return (
    <section className={`mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e0e14]/95 via-[#0a0a0f]/95 to-[#06060a]/95 border border-zinc-800/80 shadow-2xl relative overflow-hidden backdrop-blur-xl ${className}`}>
      
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

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
            target="_blank"
            rel="noopener noreferrer"
            onClick={s.isDiscord ? handleCopyDiscord : undefined}
            className={`group p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 shadow-lg cursor-pointer ${s.borderHover}`}
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
                  {s.isDiscord && copiedDiscord ? (
                    <span className="text-emerald-400 font-bold">Copied: abdo_skills.</span>
                  ) : (
                    s.handle
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 font-sans leading-snug pt-1">
                  {s.desc}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
              <span>{s.isDiscord ? (copiedDiscord ? "Copied to Clipboard!" : "Copy & Open Discord") : "Visit Profile"}</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </div>
          </a>
        ))}
      </div>

      {/* Quick Action & Nav Bar */}
      <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Discord Quick Copy */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-zinc-500">Direct Contact:</span>
          <button
            onClick={handleCopyDiscord}
            type="button"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 hover:border-indigo-500/50 transition-all cursor-pointer group"
            title="Click to copy Discord username"
          >
            <svg className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            {copiedDiscord ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span>Copied:</span>
                <code>abdo_skills.</code>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span className="text-zinc-400">Discord:</span>
                <span className="text-indigo-300 font-bold">abdo_skills.</span>
                <span className="text-[10px] text-zinc-500 uppercase px-1.5 py-0.5 bg-black/50 rounded border border-zinc-800 ml-1">Copy</span>
              </span>
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
