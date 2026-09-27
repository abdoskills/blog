"use client";

import { useState, useEffect, useCallback } from "react";

export default function ThemeController() {
  const [isLightMode, setIsLightMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Apply dark blue (night) or off-white (day) theme variables
  const applyThemeMode = useCallback((light) => {
    if (typeof document === "undefined") return;
    const rootStyle = document.documentElement.style;

    if (light) {
      document.documentElement.setAttribute("data-theme", "light");
      rootStyle.setProperty("--background", "#f8fafc");
      rootStyle.setProperty("--foreground", "#0f172a");
      rootStyle.setProperty("--accent-color", "#2563eb");
      rootStyle.setProperty("--accent-rgb", "37, 99, 235");
      rootStyle.setProperty("--accent-glow", "rgba(37, 99, 235, 0.22)");
      rootStyle.setProperty("--accent-dim", "rgba(37, 99, 235, 0.08)");
      rootStyle.setProperty("--accent-border", "rgba(37, 99, 235, 0.25)");
      rootStyle.setProperty("--accent-hover-border", "rgba(37, 99, 235, 0.65)");
      rootStyle.setProperty("--accent-text", "#1d4ed8");
      rootStyle.setProperty("--accent-shadow", "0 0 20px rgba(37, 99, 235, 0.15)");
      try { localStorage.setItem("abdoskills_mode", "light"); } catch {}
    } else {
      document.documentElement.removeAttribute("data-theme");
      rootStyle.setProperty("--background", "#070b14");
      rootStyle.setProperty("--foreground", "#f1f5f9");
      rootStyle.setProperty("--accent-color", "#38bdf8");
      rootStyle.setProperty("--accent-rgb", "56, 189, 248");
      rootStyle.setProperty("--accent-glow", "rgba(56, 189, 248, 0.35)");
      rootStyle.setProperty("--accent-dim", "rgba(56, 189, 248, 0.12)");
      rootStyle.setProperty("--accent-border", "rgba(56, 189, 248, 0.3)");
      rootStyle.setProperty("--accent-hover-border", "rgba(56, 189, 248, 0.7)");
      rootStyle.setProperty("--accent-text", "#7dd3fc");
      rootStyle.setProperty("--accent-shadow", "0 0 25px rgba(56, 189, 248, 0.25)");
      try { localStorage.setItem("abdoskills_mode", "dark"); } catch {}
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      const savedMode = localStorage.getItem("abdoskills_mode");
      if (savedMode === "light") {
        setIsLightMode(true);
        applyThemeMode(true);
      } else {
        setIsLightMode(false);
        applyThemeMode(false);
      }
    } catch {
      applyThemeMode(false);
    }
  }, [applyThemeMode]);

  const toggleTheme = () => {
    const nextMode = !isLightMode;
    setIsLightMode(nextMode);
    applyThemeMode(nextMode);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center select-none font-mono">
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-2xl transition-all duration-300 shadow-xl ${
          isLightMode
            ? "bg-white/90 border-slate-300 text-slate-800 hover:border-blue-500 hover:shadow-blue-500/10 shadow-slate-200/50"
            : "bg-[#0b101d]/90 border-blue-500/30 text-slate-200 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] shadow-black/60"
        }`}
      >
        <span className="text-base transform transition-transform group-hover:scale-110">
          {isLightMode ? "☀️" : "🌙"}
        </span>
        <span className="text-xs font-bold tracking-wider uppercase">
          {isLightMode ? "Day Mode" : "Night Mode"}
        </span>
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            isLightMode ? "bg-blue-600" : "bg-sky-400 shadow-[0_0_8px_#38bdf8]"
          }`}
        />
      </button>
    </div>
  );
}
