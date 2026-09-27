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
      rootStyle.setProperty("--background", "#e4e4e7");
      rootStyle.setProperty("--foreground", "#09090b");
      rootStyle.setProperty("--accent-color", "#09090b");
      rootStyle.setProperty("--accent-rgb", "9, 9, 11");
      rootStyle.setProperty("--accent-glow", "rgba(0, 0, 0, 0.15)");
      rootStyle.setProperty("--accent-dim", "rgba(0, 0, 0, 0.06)");
      rootStyle.setProperty("--accent-border", "rgba(0, 0, 0, 0.2)");
      rootStyle.setProperty("--accent-hover-border", "rgba(0, 0, 0, 0.6)");
      rootStyle.setProperty("--accent-text", "#09090b");
      rootStyle.setProperty("--accent-shadow", "0 0 15px rgba(0, 0, 0, 0.08)");
      rootStyle.setProperty("--card-bg", "#f4f4f5");
      rootStyle.setProperty("--card-border", "#d4d4d8");
      try { localStorage.setItem("abdoskills_mode", "light"); } catch {}
    } else {
      document.documentElement.removeAttribute("data-theme");
      rootStyle.setProperty("--background", "#09090b");
      rootStyle.setProperty("--foreground", "#f4f4f5");
      rootStyle.setProperty("--accent-color", "#ffffff");
      rootStyle.setProperty("--accent-rgb", "255, 255, 255");
      rootStyle.setProperty("--accent-glow", "rgba(255, 255, 255, 0.22)");
      rootStyle.setProperty("--accent-dim", "rgba(255, 255, 255, 0.08)");
      rootStyle.setProperty("--accent-border", "rgba(255, 255, 255, 0.18)");
      rootStyle.setProperty("--accent-hover-border", "rgba(255, 255, 255, 0.65)");
      rootStyle.setProperty("--accent-text", "#f4f4f5");
      rootStyle.setProperty("--accent-shadow", "0 0 20px rgba(255, 255, 255, 0.12)");
      rootStyle.setProperty("--card-bg", "#111114");
      rootStyle.setProperty("--card-border", "#27272a");
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

    // Keep state synced with any external toggle (e.g. Navbar)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-theme") {
          const isLight = document.documentElement.getAttribute("data-theme") === "light";
          setIsLightMode(isLight);
          applyThemeMode(isLight);
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
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
            ? "bg-[#e4e4e7]/95 border-zinc-400 text-zinc-900 hover:border-zinc-900 shadow-zinc-300/50"
            : "bg-[#111114]/95 border-zinc-700/80 text-zinc-200 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] shadow-black/80"
        }`}
      >
        <span className="text-base transform transition-transform group-hover:scale-110">
          {isLightMode ? "☀️" : "📺"}
        </span>
        <span className="text-xs font-bold tracking-wider uppercase">
          {isLightMode ? "CRT Day" : "CRT Night"}
        </span>
        <span
          className={`w-2 h-2 rounded-full transition-colors ${
            isLightMode ? "bg-zinc-900" : "bg-white shadow-[0_0_8px_#ffffff]"
          }`}
        />
      </button>
    </div>
  );
}
