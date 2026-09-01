"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// HSL to RGB helper
function hslToRgb(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const r = Math.round(255 * f(0));
  const g = Math.round(255 * f(8));
  const b = Math.round(255 * f(4));
  return [r, g, b];
}

// RGB to Hex helper
function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

// Quick Preset Themes (Default: Cyber Amber Yellow)
export const PRESET_THEMES = [
  { id: "amber", name: "Cyber Amber", hex: "#f59e0b", rgb: "245, 158, 11", text: "#fbbf24", hue: 38 },
  { id: "cyan", name: "Electric Cyan", hex: "#06b6d4", rgb: "6, 182, 212", text: "#22d3ee", hue: 188 },
  { id: "purple", name: "Void Purple", hex: "#a855f7", rgb: "168, 85, 247", text: "#c084fc", hue: 271 },
  { id: "red", name: "Crimson Red", hex: "#ef4444", rgb: "239, 68, 68", text: "#f87171", hue: 0 },
  { id: "pink", name: "Neon Pink", hex: "#ec4899", rgb: "236, 72, 153", text: "#f472b6", hue: 330 },
  { id: "blue", name: "Cobalt Blue", hex: "#3b82f6", rgb: "59, 130, 246", text: "#60a5fa", hue: 217 },
  { id: "green", name: "Matrix Green", hex: "#10b981", rgb: "16, 185, 129", text: "#34d399", hue: 160 },
  { id: "gold", name: "Solar Gold", hex: "#eab308", rgb: "234, 179, 8", text: "#fde047", hue: 48 }
];

export default function ThemeController() {
  const [currentColor, setCurrentColor] = useState({
    hex: "#f59e0b",
    rgb: "245, 158, 11",
    text: "#fbbf24",
    name: "Cyber Amber",
    hue: 38
  });
  const [lockedColor, setLockedColor] = useState({
    hex: "#f59e0b",
    rgb: "245, 158, 11",
    text: "#fbbf24",
    name: "Cyber Amber",
    hue: 38
  });
  const [isOpen, setIsOpen] = useState(false);
  const wheelRef = useRef(null);
  const isDraggingRef = useRef(false);

  // Apply theme variables directly to document root
  const applyTheme = useCallback((hex, rgb, text) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.style.setProperty("--accent-color", hex);
    root.style.setProperty("--accent-rgb", rgb);
    root.style.setProperty("--accent-glow", `rgba(${rgb}, 0.45)`);
    root.style.setProperty("--accent-dim", `rgba(${rgb}, 0.15)`);
    root.style.setProperty("--accent-border", `rgba(${rgb}, 0.4)`);
    root.style.setProperty("--accent-hover-border", `rgba(${rgb}, 0.8)`);
    root.style.setProperty("--accent-text", text || hex);
    root.style.setProperty("--accent-shadow", `0 0 25px rgba(${rgb}, 0.35)`);
  }, []);

  // Initialize from localStorage or default Cyber Amber
  useEffect(() => {
    try {
      const saved = localStorage.getItem("abdoskills_custom_theme");
      if (saved) {
        const parsed = JSON.parse(saved);
        setCurrentColor(parsed);
        setLockedColor(parsed);
        applyTheme(parsed.hex, parsed.rgb, parsed.text);
      } else {
        applyTheme("#f59e0b", "245, 158, 11", "#fbbf24");
      }
    } catch {
      applyTheme("#f59e0b", "245, 158, 11", "#fbbf24");
    }
  }, [applyTheme]);

  // Compute color from Mouse coordinates on the 360-degree color wheel
  const handleWheelMove = useCallback((e) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = rect.width / 2;
    if (distance > maxRadius + 10) return; // Outside wheel tolerance

    // Angle in degrees [0, 360]
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    if (angle < 0) angle += 360;

    // Saturation and Lightness
    const saturation = Math.min(100, Math.max(70, Math.round((distance / maxRadius) * 100)));
    const lightness = 50;

    const [r, g, b] = hslToRgb(angle, saturation, lightness);
    const hex = rgbToHex(r, g, b);
    const rgbStr = `${r}, ${g}, ${b}`;

    // Generate lighter text highlight color
    const [tr, tg, tb] = hslToRgb(angle, saturation, 65);
    const textHex = rgbToHex(tr, tg, tb);

    const newColor = {
      hex,
      rgb: rgbStr,
      text: textHex,
      name: `Hue ${Math.round(angle)}°`,
      hue: Math.round(angle)
    };

    setCurrentColor(newColor);
    applyTheme(hex, rgbStr, textHex);
  }, [applyTheme]);

  const handleWheelClick = (e) => {
    handleWheelMove(e);
    setLockedColor(currentColor);
    try {
      localStorage.setItem("abdoskills_custom_theme", JSON.stringify(currentColor));
    } catch {
      // Ignore
    }
  };

  const handlePresetSelect = (preset) => {
    const colorObj = {
      hex: preset.hex,
      rgb: preset.rgb,
      text: preset.text,
      name: preset.name,
      hue: preset.hue
    };
    setCurrentColor(colorObj);
    setLockedColor(colorObj);
    applyTheme(preset.hex, preset.rgb, preset.text);
    try {
      localStorage.setItem("abdoskills_custom_theme", JSON.stringify(colorObj));
    } catch {
      // Ignore
    }
  };

  const handleMouseLeaveContainer = () => {
    setIsOpen(false);
    // Restore locked color
    setCurrentColor(lockedColor);
    applyTheme(lockedColor.hex, lockedColor.rgb, lockedColor.text);
  };

  return (
    <div
      onMouseLeave={handleMouseLeaveContainer}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center font-mono select-none"
    >
      {/* 360-Degree Continuous Chromatic Color Wheel Panel */}
      <div
        className={`absolute bottom-0 right-0 p-5 rounded-3xl bg-[#0d0d12]/95 border backdrop-blur-2xl transition-all duration-400 ease-out origin-bottom-right flex flex-col items-center gap-4 ${
          isOpen
            ? "opacity-100 scale-100 translate-x-0 translate-y-0 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            : "opacity-0 scale-50 translate-x-2 translate-y-2 pointer-events-none"
        }`}
        style={{
          borderColor: `rgba(${currentColor.rgb}, 0.4)`,
          boxShadow: `0 0 35px rgba(${currentColor.rgb}, 0.25)`
        }}
      >
        {/* Header: Live Color Badge */}
        <div className="flex items-center justify-between w-full gap-3 border-b border-zinc-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full shadow-md"
              style={{ backgroundColor: currentColor.hex }}
            ></span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              {currentColor.name}
            </span>
          </div>
          <span
            className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 border"
            style={{
              color: currentColor.text,
              borderColor: `rgba(${currentColor.rgb}, 0.4)`
            }}
          >
            {currentColor.hex}
          </span>
        </div>

        {/* 360° Chromatic Spectrum Color Wheel */}
        <div className="relative flex items-center justify-center">
          <div
            ref={wheelRef}
            onMouseMove={handleWheelMove}
            onClick={handleWheelClick}
            className="relative w-44 h-44 rounded-full cursor-crosshair shadow-[0_0_25px_rgba(0,0,0,0.8)] transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              background: `conic-gradient(
                from 0deg,
                #ff0000 0deg,
                #ff8800 30deg,
                #ffff00 60deg,
                #88ff00 90deg,
                #00ff00 120deg,
                #00ff88 150deg,
                #00ffff 180deg,
                #0088ff 210deg,
                #0000ff 240deg,
                #8800ff 270deg,
                #ff00ff 300deg,
                #ff0088 330deg,
                #ff0000 360deg
              )`
            }}
          >
            {/* Center Saturation Core & Inner Ring */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-b from-transparent via-black/30 to-black/80 pointer-events-none"></div>
            
            {/* Center Indicator Orb */}
            <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#0a0a0e] border-2 flex items-center justify-center shadow-lg pointer-events-none"
              style={{ borderColor: currentColor.hex }}
            >
              <span
                className="w-5 h-5 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: currentColor.hex,
                  boxShadow: `0 0 12px ${currentColor.hex}`
                }}
              ></span>
            </div>
          </div>
        </div>

        {/* Quick Cyber Presets Bar */}
        <div className="w-full space-y-2 pt-1 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest px-1">
            <span>Presets</span>
            <span>Click to lock</span>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            {PRESET_THEMES.map((preset) => {
              const isLocked = lockedColor.hex.toLowerCase() === preset.hex.toLowerCase();
              return (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(preset)}
                  onMouseEnter={() => {
                    setCurrentColor(preset);
                    applyTheme(preset.hex, preset.rgb, preset.text);
                  }}
                  className={`w-6 h-6 rounded-full transition-all duration-200 transform hover:scale-125 focus:outline-none flex items-center justify-center ${
                    isLocked ? "scale-115 ring-2 ring-white" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    backgroundColor: preset.hex,
                    boxShadow: isLocked ? `0 0 10px ${preset.hex}` : "none"
                  }}
                  title={preset.name}
                >
                  {isLocked && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Glowing Color Wheel Orb Trigger (42px × 42px Compact Ball) */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open 360 Color Wheel"
        className={`w-11 h-11 rounded-full bg-[#0d0d12]/95 border flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 ${
          isOpen ? "opacity-0 pointer-events-none scale-75" : "opacity-100 scale-100 pointer-events-auto"
        }`}
        style={{
          borderColor: `rgba(${currentColor.rgb}, 0.7)`,
          boxShadow: `0 0 20px rgba(${currentColor.rgb}, 0.5), inset 0 0 10px rgba(${currentColor.rgb}, 0.2)`
        }}
        title="Hover to open 360° Chromatic Color Wheel"
      >
        {/* Continuous 360° Conic Wheel Core */}
        <span
          className="w-5 h-5 rounded-full transition-transform duration-700 hover:rotate-180"
          style={{
            background: `conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)`,
            boxShadow: `0 0 10px ${currentColor.hex}`
          }}
        ></span>
      </button>
    </div>
  );
}
