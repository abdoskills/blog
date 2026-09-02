"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ReaderModeToolbar({ 
  title, 
  category, 
  readTime = "6 min read", 
  backUrl = "/ctfs", 
  backLabel = "Back to CTFs",
  sections = []
}) {
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState("md"); // sm, md, lg
  const [isTocOpen, setIsTocOpen] = useState(false);
  const tocRef = useRef(null);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("abdoskills_reader_mode");
      if (saved === "true") {
        setIsReaderMode(true);
        document.documentElement.setAttribute("data-reader-mode", "true");
      }
    } catch {
      // Ignore
    }
  }, []);

  // Update scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close TOC when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (tocRef.current && !tocRef.current.contains(e.target)) {
        setIsTocOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleReaderMode = () => {
    const nextMode = !isReaderMode;
    setIsReaderMode(nextMode);
    if (nextMode) {
      document.documentElement.setAttribute("data-reader-mode", "true");
    } else {
      document.documentElement.removeAttribute("data-reader-mode");
    }
    try {
      localStorage.setItem("abdoskills_reader_mode", String(nextMode));
    } catch {
      // Ignore
    }
  };

  const scrollToSection = (id) => {
    setIsTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Ultra-Slim Reading Progress Line at the very top of the viewport */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/40 pointer-events-none">
        <div 
          className="h-full transition-all duration-150 ease-out"
          style={{ 
            width: `${scrollProgress}%`,
            backgroundColor: "var(--accent-color, #f59e0b)",
            boxShadow: "0 0 10px var(--accent-glow, rgba(245, 158, 11, 0.5))"
          }}
        />
      </div>

      {/* 2. Floating Hallmark / Minimalist Reader Action Toolbar */}
      <nav className="sticky top-4 z-40 max-w-5xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between gap-3 bg-[#0d0d12]/95 border theme-border p-2.5 sm:p-3 rounded-2xl backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] transition-all duration-300">
          
          {/* Left: Back Button + Category Tag */}
          <div className="flex items-center gap-2.5">
            <Link 
              href={backUrl} 
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 text-zinc-300 hover:text-white border border-zinc-800 hover:theme-border font-mono text-xs uppercase tracking-wider transition-all"
            >
              <span className="transform transition-transform group-hover:-translate-x-1">←</span>
              <span>{backLabel}</span>
            </Link>

            {category && (
              <span className="hidden sm:inline-block font-mono text-[11px] theme-badge px-2.5 py-1 rounded-lg border truncate max-w-[200px]">
                {category}
              </span>
            )}
          </div>

          {/* Center / Right: Reading Tools */}
          <div className="flex items-center gap-2">
            
            {/* Table of Contents Quick-Jump Dropdown */}
            {sections && sections.length > 0 && (
              <div className="relative" ref={tocRef}>
                <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  aria-label="Table of Contents"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:theme-border text-zinc-300 hover:text-white font-mono text-xs transition-all"
                  title="Jump to Stage"
                >
                  <span>📑</span>
                  <span className="hidden md:inline font-bold">Contents</span>
                  <span className="text-[10px] text-zinc-500">▼</span>
                </button>

                {isTocOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-[#0e0e14]/98 border theme-border backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-2 space-y-1 z-50 animate-fadeIn font-mono text-xs">
                    <div className="px-3 py-1.5 text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-800">
                      Quick Navigation
                    </div>
                    {sections.map((s, idx) => (
                      <button
                        key={s.id || idx}
                        onClick={() => scrollToSection(s.id)}
                        className="w-full text-left px-3 py-2 rounded-xl text-zinc-300 hover:theme-text hover:bg-zinc-900/90 transition-all flex items-center justify-between truncate"
                      >
                        <span className="truncate">{s.label}</span>
                        <span className="text-[10px] text-zinc-600 ml-2">→</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reading Mode Switcher Button (Cyber ⇄ Zen Editorial) */}
            <button
              onClick={toggleReaderMode}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all ${
                isReaderMode
                  ? "theme-bg-solid text-black shadow-md border-transparent scale-105"
                  : "bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:theme-border hover:text-white"
              }`}
              title={isReaderMode ? "Switch back to Cyber Mode" : "Switch to Zen Reader Mode"}
            >
              <span>{isReaderMode ? "📖 Reader View" : "⚡ Cyber View"}</span>
            </button>

          </div>

        </div>
      </nav>
    </>
  );
}
