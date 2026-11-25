"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const menuRef = useRef(null);

  const handleCopyDiscord = async (e) => {
    e?.preventDefault?.();
    try {
      await navigator.clipboard.writeText("abdo_skills.");
      setCopiedDiscord(true);
      setTimeout(() => setCopiedDiscord(false), 2000);
    } catch (err) {
      console.error("Failed to copy Discord handle:", err);
    }
  };

  useEffect(() => {
    const checkMode = () => {
      if (typeof document !== "undefined") {
        setIsLight(document.documentElement.getAttribute("data-theme") === "light");
      }
    };
    checkMode();
    const obs = new MutationObserver(checkMode);
    obs.observe(document.documentElement, { attributes: true });
    return () => obs.disconnect();
  }, []);

  // Close menu on click outside or ESC key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="w-full relative z-50 text-zinc-200">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 flex justify-between items-center relative">
        
        {/* Left: Back / Brand */}
        <div className="flex items-center gap-4">
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
          >
            {pathname !== "/" && (
              <span className="transform transition-transform group-hover:-translate-x-1">←</span>
            )}
            <span className="font-bold text-white tracking-wider font-[family-name:var(--font-silkscreen)] text-lg">
              abdoskills
            </span>
          </Link>
        </div>



        {/* Right: Quick Links + Menu Button */}
        <div className="flex items-center gap-3 relative" ref={menuRef}>
          
          {/* Quick Desktop Links */}
          <nav className="hidden sm:flex items-center gap-1 font-mono text-xs">
            <Link 
              href="/ctfs" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/ctfs" || pathname === "/picoctf" || pathname === "/ascwg" || pathname === "/kaspersky"
                  ? "theme-bg-dim theme-text border theme-border font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              CTFs
            </Link>
            <Link 
              href="/labs/cyberdefenders" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname.startsWith("/labs") 
                  ? "theme-bg-dim theme-text border theme-border font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              CyberDefenders
            </Link>
            <Link 
              href="/about" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/about" 
                  ? "theme-bg-dim theme-text border theme-border font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              About
            </Link>
            <Link 
              href="/cv" 
              className={`px-3 py-1.5 rounded-lg transition-all ${
                pathname === "/cv" 
                  ? "theme-bg-dim theme-text border theme-border font-bold" 
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              CV
            </Link>
          </nav>

          {/* Desktop Taskbar Social Icons */}
          <div className="hidden sm:flex items-center gap-1 pl-1 border-l border-zinc-800/80">
            <a
              href="https://github.com/abdoskills"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              title="GitHub: @abdoskills"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/abdoskills"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-zinc-900 transition-colors"
              title="LinkedIn: in/abdoskills"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
              </svg>
            </a>
            <a
              href="https://x.com/abdoskills"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-zinc-900 transition-colors"
              title="X (Twitter): @abdoskills"
              aria-label="X Profile"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <button
              onClick={handleCopyDiscord}
              type="button"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-indigo-400 hover:bg-zinc-900 transition-colors relative"
              title={copiedDiscord ? "Copied abdo_skills. to clipboard!" : "Copy Discord: abdo_skills."}
              aria-label="Discord Handle"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              {copiedDiscord && (
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow z-50 whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>

          {/* Light / Dark CRT Mode Toggle */}
          <button
            onClick={() => {
              if (typeof document === "undefined") return;
              const isCurrentLight = document.documentElement.getAttribute("data-theme") === "light";
              if (isCurrentLight) {
                document.documentElement.removeAttribute("data-theme");
                try { localStorage.setItem("abdoskills_mode", "dark"); } catch {}
              } else {
                document.documentElement.setAttribute("data-theme", "light");
                try { localStorage.setItem("abdoskills_mode", "light"); } catch {}
              }
              setIsOpen(false);
            }}
            aria-label="Toggle CRT Mode"
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-zinc-800 bg-[#0d0d12]/90 text-zinc-300 hover:text-white hover:border-zinc-500 transition-all font-mono text-sm"
            title={isLight ? "Switch to CRT Night" : "Switch to CRT Day"}
          >
            {isLight ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Hamburger / Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border font-mono text-xs uppercase tracking-wider transition-all backdrop-blur-md ${
              isOpen 
                ? "theme-bg-solid font-bold border-transparent" 
                : "bg-[#0d0d12]/90 border-zinc-800 text-zinc-300 hover:theme-border hover:text-white"
            }`}
          >
            <span className="relative w-4 h-4 flex flex-col justify-center gap-1">
              <span className={`h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
              <span className={`h-0.5 w-full bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
              <span className={`h-0.5 w-full bg-current transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
            </span>
            <span className="font-bold">Menu</span>
          </button>

          {/* Floating Dropdown Drawer with CRT Terminal Motif */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-3 w-72 sm:w-80 max-w-[calc(100vw-2rem)] rounded-xl bg-[#111114]/95 border border-zinc-700/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden animate-fadeIn z-50 select-none">
              
              {/* CRT Terminal Header */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-black/80 border-b border-zinc-800 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
                  <span className="w-2 h-2 rounded-full bg-zinc-600 inline-block" />
                </div>
                <span className="text-zinc-400 font-bold uppercase tracking-widest text-[9px]">
                  SYS.MENU // TERMINAL
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff] animate-pulse" />
              </div>

              <div className="p-4 space-y-4">
                {/* Section 1: Writeups & Hubs */}
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 block mb-2 font-bold">
                    [01] WRITEUPS &amp; CATEGORIES
                  </span>
                  <div className="flex flex-col gap-1">
                    <Link 
                      href="/ctfs"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-white transition-all border border-transparent hover:border-zinc-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono text-zinc-400 group-hover:text-white">&gt;</span>
                        <div>
                          <strong className="block text-white text-xs font-mono group-hover:text-white">CTF Competitions</strong>
                          <span className="text-[11px] text-zinc-500">Sunshine, Kaspersky, ASCWG, PicoCTF</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">40</span>
                    </Link>

                    <Link 
                      href="/labs/cyberdefenders"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-white transition-all border border-transparent hover:border-zinc-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono text-zinc-400 group-hover:text-white">&gt;</span>
                        <div>
                          <strong className="block text-white text-xs font-mono group-hover:text-white">CyberDefenders Labs</strong>
                          <span className="text-[11px] text-zinc-500">WireDive, Ulysses &amp; OpenWire Investigations</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">6 LABS</span>
                    </Link>
                  </div>
                </div>

                {/* Section 2: Profile & Career */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 block mb-2 font-bold">
                    [02] ABOUT &amp; RESUME
                  </span>
                  <div className="flex flex-col gap-1">
                    <Link 
                      href="/about"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-white transition-all border border-transparent hover:border-zinc-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono text-zinc-400 group-hover:text-white">&gt;</span>
                        <div>
                          <strong className="block text-white text-xs font-mono group-hover:text-white">About Me</strong>
                          <span className="text-[11px] text-zinc-500">Profile, Focus &amp; Tools</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-500 group-hover:text-white">→</span>
                    </Link>

                    <Link 
                      href="/cv"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-sans text-zinc-300 hover:bg-zinc-900/90 hover:text-white transition-all border border-transparent hover:border-zinc-700 group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono text-zinc-400 group-hover:text-white">&gt;</span>
                        <div>
                          <strong className="block text-white text-xs font-mono group-hover:text-white">Curriculum Vitae</strong>
                          <span className="text-[11px] text-zinc-500">Experience, Certs &amp; PDF</span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">PDF</span>
                    </Link>
                  </div>
                </div>

                {/* Section 3: Connect & Socials */}
                <div className="pt-3 border-t border-zinc-800/80">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 block mb-2 font-bold">
                    [03] CONNECT &amp; SOCIALS
                  </span>
                  <div className="grid grid-cols-4 gap-1.5 px-1">
                    <a
                      href="https://github.com/abdoskills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all text-center group"
                      title="GitHub"
                    >
                      <svg className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200">GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/abdoskills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-blue-400 transition-all text-center group"
                      title="LinkedIn"
                    >
                      <svg className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
                      </svg>
                      <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200">LinkedIn</span>
                    </a>
                    <a
                      href="https://x.com/abdoskills"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-cyan-400 transition-all text-center group"
                      title="X (Twitter)"
                    >
                      <svg className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200">X</span>
                    </a>
                    <button
                      onClick={handleCopyDiscord}
                      type="button"
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-indigo-400 transition-all text-center group"
                      title="Copy Discord: abdo_skills."
                    >
                      <svg className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-200">
                        {copiedDiscord ? "Copied!" : "Discord"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}
