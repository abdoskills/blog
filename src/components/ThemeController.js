"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export const THEME_PALETTES = [
  {
    id: "emerald",
    name: "Cyber Emerald",
    color: "#10b981",
    rgb: "16, 185, 129",
    text: "#34d399"
  },
  {
    id: "cyan",
    name: "Electric Cyan",
    color: "#06b6d4",
    rgb: "6, 182, 212",
    text: "#22d3ee"
  },
  {
    id: "purple",
    name: "Void Purple",
    color: "#a855f7",
    rgb: "168, 85, 247",
    text: "#c084fc"
  },
  {
    id: "amber",
    name: "Acid Amber",
    color: "#f59e0b",
    rgb: "245, 158, 11",
    text: "#fbbf24"
  },
  {
    id: "crimson",
    name: "Crimson Red",
    color: "#ef4444",
    rgb: "239, 68, 68",
    text: "#f87171"
  },
  {
    id: "lime",
    name: "Matrix Lime",
    color: "#22c55e",
    rgb: "34, 197, 94",
    text: "#4ade80"
  },
  {
    id: "blue",
    name: "Cobalt Blue",
    color: "#3b82f6",
    rgb: "59, 130, 246",
    text: "#60a5fa"
  },
  {
    id: "pink",
    name: "Neon Rose",
    color: "#ec4899",
    rgb: "236, 72, 153",
    text: "#f472b6"
  }
];

export default function ThemeController() {
  const [selectedTheme, setSelectedTheme] = useState(THEME_PALETTES[0]);
  const [previewTheme, setPreviewTheme] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Apply theme variables directly to document element
  const applyThemeVariables = useCallback((theme) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--accent-color", theme.color);
    root.style.setProperty("--accent-rgb", theme.rgb);
    root.style.setProperty("--accent-glow", `rgba(${theme.rgb}, 0.45)`);
    root.style.setProperty("--accent-dim", `rgba(${theme.rgb}, 0.15)`);
    root.style.setProperty("--accent-border", `rgba(${theme.rgb}, 0.4)`);
    root.style.setProperty("--accent-hover-border", `rgba(${theme.rgb}, 0.8)`);
    root.style.setProperty("--accent-text", theme.text);
    root.style.setProperty("--accent-shadow", `0 0 25px rgba(${theme.rgb}, 0.35)`);
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

  // Handle color hover (real-time preview)
  const handleColorHover = (theme) => {
    setPreviewTheme(theme);
    applyThemeVariables(theme);
  };

  // Handle container mouse leave: restore locked theme and close
  const handleMouseLeave = () => {
    setIsOpen(false);
    setPreviewTheme(null);
    applyThemeVariables(selectedTheme);
  };

  // Handle color click (lock and save)
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
      ref={containerRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center font-mono select-none"
    >
      {/* Expanded Palette Arc / Ring (Appears smoothly when hovering over the ball) */}
      <div 
        className={`absolute bottom-0 right-0 flex items-center gap-1.5 p-2 rounded-full bg-[#0d0d12]/95 border backdrop-blur-2xl transition-all duration-400 ease-out origin-bottom-right ${
          isOpen 
            ? "opacity-100 scale-100 translate-x-0 translate-y-0 pointer-events-auto shadow-[0_15px_45px_rgba(0,0,0,0.9)]" 
            : "opacity-0 scale-50 translate-x-2 translate-y-2 pointer-events-none"
        }`}
        style={{
          borderColor: `rgba(${activeTheme.rgb}, 0.5)`,
          boxShadow: `0 0 30px rgba(${activeTheme.rgb}, 0.3)`
        }}
      >
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
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-300 transform hover:scale-125 focus:outline-none flex items-center justify-center cursor-pointer ${
                isCurrent ? "scale-115 ring-2 ring-white/80" : "opacity-80 hover:opacity-100"
              }`}
              style={{
                backgroundColor: t.color,
                boxShadow: isCurrent ? `0 0 16px ${t.color}` : "none"
              }}
              title={t.name}
            >
              {isLocked && (
                <span className="w-2 h-2 rounded-full bg-white shadow-md"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* The Compact Glowing Theme Ball / Orb (Takes almost zero space) */}
      <div
        className={`w-11 h-11 rounded-full bg-[#0d0d12]/95 border flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
          isOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100 pointer-events-auto"
        }`}
        style={{
          borderColor: `rgba(${activeTheme.rgb}, 0.6)`,
          boxShadow: `0 0 20px rgba(${activeTheme.rgb}, 0.4), inset 0 0 10px rgba(${activeTheme.rgb}, 0.2)`
        }}
        title="Hover to change theme color"
      >
        {/* Animated Conic Orb Core */}
        <span 
          className="w-5 h-5 rounded-full transition-transform duration-500 hover:rotate-180"
          style={{
            background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${activeTheme.color} 50%, #000000 100%)`,
            boxShadow: `0 0 12px ${activeTheme.color}`
          }}
        ></span>
      </div>

    </div>
  );
}
