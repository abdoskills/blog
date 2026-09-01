"use client";

import { useState, useEffect, useCallback } from "react";

export const THEME_PALETTES = [
  {
    id: "emerald",
    name: "Cyber Emerald",
    color: "#10b981",
    rgb: "16, 185, 129",
    text: "#34d399",
    dotClass: "bg-emerald-500 shadow-[0_0_12px_#10b981]"
  },
  {
    id: "cyan",
    name: "Electric Cyan",
    color: "#06b6d4",
    rgb: "6, 182, 212",
    text: "#22d3ee",
    dotClass: "bg-cyan-500 shadow-[0_0_12px_#06b6d4]"
  },
  {
    id: "purple",
    name: "Void Purple",
    color: "#a855f7",
    rgb: "168, 85, 247",
    text: "#c084fc",
    dotClass: "bg-purple-500 shadow-[0_0_12px_#a855f7]"
  },
  {
    id: "amber",
    name: "Acid Amber",
    color: "#f59e0b",
    rgb: "245, 158, 11",
    text: "#fbbf24",
    dotClass: "bg-amber-500 shadow-[0_0_12px_#f59e0b]"
  },
  {
    id: "crimson",
    name: "Crimson Red",
    color: "#ef4444",
    rgb: "239, 68, 68",
    text: "#f87171",
    dotClass: "bg-red-500 shadow-[0_0_12px_#ef4444]"
  },
  {
    id: "lime",
    name: "Matrix Lime",
    color: "#22c55e",
    rgb: "34, 197, 94",
    text: "#4ade80",
    dotClass: "bg-green-500 shadow-[0_0_12px_#22c55e]"
  },
  {
    id: "blue",
    name: "Cobalt Blue",
    color: "#3b82f6",
    rgb: "59, 130, 246",
    text: "#60a5fa",
    dotClass: "bg-blue-500 shadow-[0_0_12px_#3b82f6]"
  },
  {
    id: "pink",
    name: "Neon Rose",
    color: "#ec4899",
    rgb: "236, 72, 153",
    text: "#f472b6",
    dotClass: "bg-pink-500 shadow-[0_0_12px_#ec4899]"
  }
];

export default function ThemeController() {
  const [selectedTheme, setSelectedTheme] = useState(THEME_PALETTES[0]);
  const [previewTheme, setPreviewTheme] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Apply theme variables to root document
  const applyThemeVariables = useCallback((theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--accent-color", theme.color);
    root.style.setProperty("--accent-rgb", theme.rgb);
    root.style.setProperty("--accent-glow", `rgba(${theme.rgb}, 0.35)`);
    root.style.setProperty("--accent-dim", `rgba(${theme.rgb}, 0.12)`);
    root.style.setProperty("--accent-border", `rgba(${theme.rgb}, 0.35)`);
    root.style.setProperty("--accent-hover-border", `rgba(${theme.rgb}, 0.7)`);
    root.style.setProperty("--accent-text", theme.text);
    root.style.setProperty("--accent-shadow", `0 0 25px rgba(${theme.rgb}, 0.3)`);
  }, []);

  // Load saved theme on initial mount
  useEffect(() => {
    try {
      const savedThemeId = localStorage.getItem("abdoskills_theme");
      if (savedThemeId) {
        const found = THEME_PALETTES.find((t) => t.id === savedThemeId);
        if (found) {
          setSelectedTheme(found);
          applyThemeVariables(found);
        }
      }
    } catch {
      // Ignore local storage errors
    }
  }, [applyThemeVariables]);

  // Handle real-time mouse hover preview
  const handleColorHover = (theme) => {
    setPreviewTheme(theme);
    applyThemeVariables(theme);
  };

  // Handle mouse leave: restore selected locked theme
  const handleMouseLeaveContainer = () => {
    setPreviewTheme(null);
    applyThemeVariables(selectedTheme);
  };

  // Handle locking a theme
  const handleColorSelect = (theme) => {
    setSelectedTheme(theme);
    setPreviewTheme(null);
    applyThemeVariables(theme);
    try {
      localStorage.setItem("abdoskills_theme", theme.id);
    } catch {
      // Ignore
    }
  };

  const activeTheme = previewTheme || selectedTheme;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 font-mono select-none"
      onMouseLeave={handleMouseLeaveContainer}
    >
      {/* Expanded Palette Dock */}
      <div
        className={`flex items-center gap-2 p-2 rounded-2xl bg-[#0d0d12]/95 border border-zinc-800/90 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out ${
          isExpanded
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-4 pointer-events-none sm:opacity-100 sm:translate-x-0 sm:pointer-events-auto"
        }`}
        style={{ borderColor: `rgba(${activeTheme.rgb}, 0.3)` }}
      >
        {/* Active Theme Label */}
        <span 
          className="hidden md:inline-block text-[11px] font-bold uppercase tracking-wider px-2"
          style={{ color: activeTheme.color }}
        >
          {activeTheme.name}
        </span>

        {/* Color Circles */}
        <div className="flex items-center gap-2">
          {THEME_PALETTES.map((t) => {
            const isCurrent = activeTheme.id === t.id;
            const isLocked = selectedTheme.id === t.id;

            return (
              <button
                key={t.id}
                onMouseEnter={() => handleColorHover(t)}
                onFocus={() => handleColorHover(t)}
                onClick={() => handleColorSelect(t)}
                aria-label={`Switch theme to ${t.name}`}
                className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 transform hover:scale-125 focus:outline-none flex items-center justify-center ${
                  isCurrent ? "scale-115" : "opacity-75 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: t.color,
                  boxShadow: isCurrent ? `0 0 15px ${t.color}, 0 0 30px rgba(${t.rgb}, 0.4)` : "none"
                }}
              >
                {/* Active checkmark / dot */}
                {isLocked && (
                  <span className="w-2 h-2 rounded-full bg-white shadow-md"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Toggle Wheel Button (Mobile / Quick access) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-[#0d0d12]/95 border border-zinc-800/90 backdrop-blur-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          borderColor: `rgba(${activeTheme.rgb}, 0.5)`,
          boxShadow: `0 0 20px rgba(${activeTheme.rgb}, 0.35)`
        }}
        title="Hover or click to change theme color"
        aria-label="Theme Controller"
      >
        <span 
          className="w-5 h-5 rounded-full transition-all duration-300 animate-spin-slow"
          style={{
            background: `conic-gradient(from 0deg, #10b981, #06b6d4, #a855f7, #f59e0b, #ef4444, #22c55e, #3b82f6, #ec4899, #10b981)`
          }}
        ></span>
      </button>

    </div>
  );
}
