"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CrtCardHeader from "@/components/CrtCardHeader";
import CopyButton from "@/components/CopyButton";

export default function ByteMeMissionsPage() {
  const [activeId, setActiveId] = useState("level-0");

  const missions = [
    {
      id: "level-0",
      num: "LEVEL 0",
      title: "First Fragment",
      grid: "3x3 Grid • 9 Pieces",
      points: "100 PTS",
      tagline: "Manual Edge Alignment & Quiet Zone Boundary Analysis",
      description: "Nine fragments of an ancient seal have been scattered across the gate of Vormir. Reconstruct the fragments into a unified symbol to recover the first passkey.",
      summary: "9 pieces (400x400 px) forming a 1200x1200 px QR canvas. Exploiting white border quiet zones to immediately solve the top and bottom rows."
    },
    {
      id: "level-1",
      num: "LEVEL 1",
      title: "Shattered Memories",
      grid: "4x4 Grid • 16 Pieces",
      points: "200 PTS",
      tagline: "1D Pixel Seam Matching & Automated OpenCV Reconstruction",
      description: "Sixteen fractured memory tiles remain. The borders are subtle and the pieces are scattered in a 4x4 matrix. Realign the seams to reveal the shattered truth.",
      summary: "16 pieces (300x300 px) forming a 1200x1200 px QR canvas. Slashing 16! permutations down to O(N^2) by matching exact pixel seams on tile borders."
    },
    {
      id: "level-2",
      num: "LEVEL 2",
      title: "False Souls",
      grid: "5x5 Grid • 29 Pieces (4 Impostors)",
      points: "300 PTS",
      tagline: "Dihedral Rotations (D4) & Degree-of-Matching Impostor Filtering",
      description: "Not every fragment belongs to the Soul Stone. Among the scattered remains, false souls have been mixed with the genuine pieces. Identify the four impostors and reconstruct the true message before the deception consumes the trail.",
      summary: "29 pieces (240x240 px) with 4-way rotation invariance. Isolating 4 synthetic impostors via seam connectivity graph audits and solving the 5x5 grid."
    },
    {
      id: "level-3",
      num: "LEVEL 3",
      title: "Lost Edge",
      grid: "6x6 Grid • 41 Pieces (5 Impostors)",
      points: "400 PTS",
      tagline: "Informative Seam Clustering into 2x2 Super-Tiles",
      description: "A portion of the Soul Stone's edge has vanished into the ruins of Vormir. Forty-one fragments remain, but five are echoes of something that never existed. Separate truth from illusion and restore the lost pattern.",
      summary: "41 pieces (200x200 px) reduced from 36! to 9 blocks by clustering pairs into 2x2 super-tiles and permuting the meta-grid with zxing-cpp."
    },
    {
      id: "level-4",
      num: "LEVEL 4",
      title: "Judgment of Vormir",
      grid: "7x7 Grid • 49 Genuine Tiles",
      points: "500 PTS",
      tagline: "Constraint Satisfaction Problem & MRV Heuristic Solver",
      description: "The final threshold of Vormir. Forty-nine fragments forming a massive 7x7 matrix. To pass, truth must be separated from deception through constraint satisfaction and strict border alignment.",
      summary: "Master 7x7 grid (1400x1400 px) with 57 candidate pieces. Solved via Minimum Remaining Values (MRV) constraint propagation to eliminate backtracking depth."
    },
    {
      id: "osint-witness",
      num: "OSINT",
      title: "Vormir's Hidden Witness",
      grid: "Recon & Telemetry",
      points: "150 PTS",
      tagline: "Satellite Intel & Correlating Vault Telemetry Logs",
      description: "A silent watcher documented the expedition from orbit. Correlate the reconnaissance telemetry and log entries left across external repositories to locate the hidden witness.",
      summary: "Investigating satellite tracking files, cross-referencing stalker intel images with vault.log to reveal the watcher's orbital telemetry."
    }
  ];

  // ScrollSpy to track active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    missions.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [missions]);

  const scrollToMission = (id) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />

      {/* Mobile Sticky Challenge Switcher Bar */}
      <div className="lg:hidden sticky top-16 z-30 bg-[#09090c]/90 backdrop-blur-md border-y border-zinc-800/80 py-2.5 px-4 overflow-x-auto flex gap-2 no-scrollbar">
        {missions.map((m) => (
          <button
            key={m.id}
            onClick={() => scrollToMission(m.id)}
            className={`whitespace-nowrap px-3 py-1 rounded-lg text-xs font-mono transition-all duration-200 flex items-center gap-1.5 ${
              activeId === m.id
                ? "bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                : "bg-zinc-900/90 text-zinc-400 border border-zinc-800 hover:text-white"
            }`}
          >
            <span>{m.num}</span>
            <span>•</span>
            <span>{m.title}</span>
          </button>
        ))}
      </div>

      <main className="flex-grow pt-6 pb-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Page Breadcrumbs & Header */}
        <div className="mb-10 text-left border-b border-zinc-800/80 pb-6">
          <div className="mb-3 inline-flex items-center gap-2 bg-[#111116]/80 backdrop-blur-md border border-zinc-700/50 px-3 py-1 rounded-full text-xs font-mono">
            <Link href="/ctfs" className="text-zinc-400 hover:text-white transition-colors">
              CTF HUB
            </Link>
            <span className="text-zinc-600">/</span>
            <Link href="/ctfs/byte-me" className="text-zinc-400 hover:text-white transition-colors">
              BYTE ME CTF 2026
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-white uppercase font-bold tracking-wider">MISSIONS &amp; OSINT</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-[family-name:var(--font-silkscreen)] tracking-wide mb-3">
            Missions: Algorithmic QR Reconstruction
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            The complete 5-level escalation of algorithmic QR puzzle solving (&ldquo;unemployed at its peak&rdquo;) + OSINT recon. Ultra-detailed pedagogical breakdown for every single level: <strong>Challenge Description</strong>, <strong>The Plain-English Concept</strong>, explicit <strong>[ 📥 INPUT ]</strong> scripts and <strong>[ 📤 OUTPUT ]</strong> values, <strong>Line-by-Line Logic</strong>, <strong>Full Python Solver Scripts</strong>, and <strong>Verified Flags</strong>.
          </p>
        </div>

        {/* 2-Column Layout: Main Content + Sticky Navigation Rail */}
        <div className="flex gap-8 relative items-start">
          
          {/* ================= LEFT / MAIN CONTENT AREA ================= */}
          <div className="flex-grow min-w-0 space-y-20">

            {/* ------------------------------------------------------------- */}
            {/* LEVEL 0: FIRST FRAGMENT                                       */}
            {/* ------------------------------------------------------------- */}
            <article id="level-0" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="Misc / QR Forensics"
                points="100 PTS"
                slug="level-0-first-fragment"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    LEVEL 0 SOLVED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    3x3 Grid • 9 Pieces (400x400 px)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  Level 0 — First Fragment
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  We are given 9 image tiles (<code className="text-zinc-300 font-mono">piece_001.png</code> through <code className="text-zinc-300 font-mono">piece_009.png</code>) in folder <code className="text-zinc-300 font-mono">pieces_0</code>. Each piece is exactly 400x400 pixels, assembling into a 3x3 QR canvas (1200x1200 px).
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Nine fragments of an ancient seal have been scattered across the gate of Vormir. Reconstruct the fragments into a unified symbol to recover the first passkey.&rdquo;
              </div>

              {/* The Concept in Plain English */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> The Core Problem Explained: What is a QR Quiet Zone?
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Think of a QR code like a painting that MUST have a pure white picture frame around it. In the official ISO/IEC 18004 QR specification, this white border is called the <strong>Quiet Zone</strong>: a margin of at least 4 modules of solid white space surrounding the active data matrix.
                  <br /><br />
                  Because of this rule, we don&apos;t need to guess where pieces go:
                  <br />
                  • If a piece has a <strong>pure white top edge</strong>, it CANNOT be in the middle or bottom row — it <strong>MUST</strong> be in Row 0 (the top row)!
                  <br />
                  • If a piece has a <strong>pure white bottom edge</strong>, it <strong>MUST</strong> be in Row 2 (the bottom row)!
                  <br />
                  • If a piece has pure white on <strong>both top and left</strong>, it is guaranteed to be the <strong>Top-Left Corner</strong>!
                </p>
              </div>

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Step-by-Step Triage: Detecting Quiet Zones &amp; Locking Grid Positions
                </h4>

                {/* INPUT BOX */}
                <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                  <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: PYTHON BORDER DETECTOR SCRIPT ]</span>
                  <pre className="text-emerald-400">{`from PIL import Image
import numpy as np

for i in range(1, 10):
    img = np.array(Image.open(f"pieces_0/piece_{i:03d}.png").convert("L"))
    top_white = (img[0, :] == 255).all()
    bot_white = (img[-1, :] == 255).all()
    left_white = (img[:, 0] == 255).all()
    right_white = (img[:, -1] == 255).all()
    print(f"piece_{i:03d}: Top={top_white}, Bot={bot_white}, Left={left_white}, Right={right_white}")`}</pre>
                </div>

                {/* OUTPUT BOX */}
                <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <span className="text-zinc-500 block mb-1 font-bold">[ 📤 DETECTED BORDER CONSTRAINTS ]</span>
                  <pre>{`piece_008: Top=True,  Left=True  -> TOP-LEFT CORNER (Row 0, Col 0)
piece_001: Top=True               -> TOP-MIDDLE      (Row 0, Col 1)
piece_009: Top=True,  Right=True -> TOP-RIGHT CORNER (Row 0, Col 2)
piece_005: Left=True              -> CENTER-LEFT     (Row 1, Col 0)
piece_003: (No white margins)    -> DEAD CENTER     (Row 1, Col 1)
piece_004: Right=True             -> CENTER-RIGHT    (Row 1, Col 2)
piece_007: Bot=True,  Left=True  -> BOT-LEFT CORNER (Row 2, Col 0)
piece_002: Bot=True               -> BOT-MIDDLE      (Row 2, Col 1)
piece_006: Bot=True,  Right=True -> BOT-RIGHT CORNER (Row 2, Col 2)`}</pre>
                </div>

                {/* The Assembled Grid Diagram */}
                <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-mono text-zinc-300">
                  <span className="text-emerald-400 font-bold block mb-2 uppercase tracking-wider">
                    [ 📐 Locked-in 3x3 Grid Matrix ]
                  </span>
                  <pre className="text-emerald-400">{`+---------------+---------------+---------------+
| piece_008.png | piece_001.png | piece_009.png |  <- Row 0 (Top Quiet Zone)
+---------------+---------------+---------------+
| piece_005.png | piece_003.png | piece_004.png |  <- Row 1 (Center Data Modules)
+---------------+---------------+---------------+
| piece_007.png | piece_002.png | piece_006.png |  <- Row 2 (Bottom Quiet Zone)
+---------------+---------------+---------------+`}</pre>
                </div>

                {/* Assembled QR Image Preview */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-zinc-800 bg-white p-2 shrink-0">
                    <Image
                      src="/images/byteme_l0_qr.png"
                      alt="Level 0 Reconstructed QR"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xs font-sans text-zinc-400 leading-relaxed">
                    <p className="font-bold text-white mb-1 font-mono uppercase text-[11px]">Reconstructed QR Canvas (1200 x 1200 px)</p>
                    <p>All finder pattern squares (the 3 big concentric bullseyes) match up perfectly. OpenCV decodes the payload instantly.</p>
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show Complete Standalone Python Stitcher &amp; Decoder Script ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`from PIL import Image
import cv2, numpy as np

# 1. Define locked 3x3 layout
grid = [
    ["piece_008.png", "piece_001.png", "piece_009.png"],
    ["piece_005.png", "piece_003.png", "piece_004.png"],
    ["piece_007.png", "piece_002.png", "piece_006.png"]
]

# 2. Load images into memory
tiles = [[Image.open(f"pieces_0/{filename}") for filename in row] for row in grid]
tile_w, tile_h = tiles[0][0].size  # 400, 400

# 3. Create full 1200x1200 canvas and paste tiles
canvas = Image.new("RGB", (tile_w * 3, tile_h * 3), "white")
for r in range(3):
    for c in range(3):
        canvas.paste(tiles[r][c], (c * tile_w, r * tile_h))

canvas.save("assembled_qr_l0.png")
print("[+] Canvas assembled into assembled_qr_l0.png")

# 4. Decode payload with OpenCV QRCodeDetector
detector = cv2.QRCodeDetector()
flag, _, _ = detector.detectAndDecode(np.array(canvas))
print(f"[🎯] Decoded Flag: {flag}")
# Output: OWASP{Th3_f1rst_fr4gm3nt}`}</pre>
                </div>
              </details>

              {/* Flag Box */}
              <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">LEVEL 0 VERIFIED FLAG</span>
                  <code className="text-sm font-mono text-white font-bold">OWASP&#123;Th3_f1rst_fr4gm3nt&#125;</code>
                </div>
                <CopyButton text="OWASP{Th3_f1rst_fr4gm3nt}" />
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* LEVEL 1: SHATTERED MEMORIES                                   */}
            {/* ------------------------------------------------------------- */}
            <article id="level-1" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="Misc / QR Forensics"
                points="200 PTS"
                slug="level-1-shattered-memories"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    LEVEL 1 SOLVED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    4x4 Grid • 16 Pieces (300x300 px)
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  Level 1 — Shattered Memories
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Sixteen puzzle pieces in folder <code className="text-zinc-300 font-mono">pieces_1</code> forming a 4x4 QR code canvas (1200 x 1200 px).
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Sixteen fractured memory tiles remain. The borders are subtle and the pieces are scattered in a 4x4 matrix. Realign the seams to reveal the shattered truth.&rdquo;
              </div>

              {/* The Concept in Plain English */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> The Core Problem Explained: Why Brute Force Is Impossible
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  With 16 tiles, how many ways can you arrange them in a 4x4 grid?
                  <br />
                  <code className="text-white font-mono font-bold block my-1">Total Permutations = 16! = 20,922,789,888,000 combinations!</code>
                  If your computer checked 1,000,000 grids per second, it would take <strong>242 days</strong> of non-stop computing!
                  <br /><br />
                  <strong>The 1D Seam-Matching Breakthrough:</strong>
                  Instead of guessing full grids, imagine tearing a receipt into pieces. If Tile A sits directly on top of Tile B, then the very bottom line of pixels of Tile A (Row 299) <strong>MUST BE 100% IDENTICAL</strong> to the very top line of pixels of Tile B (Row 0)!
                  <br />
                  Comparing all 16 tiles against each other takes only $16 \times 16 = 256$ operations ($O(N^2)$), running in <strong>0.005 seconds</strong>!
                </p>
              </div>

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Step-by-Step Triage: Calculating Boundary Compatibility
                </h4>

                {/* INPUT BOX */}
                <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                  <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: HORIZONTAL &amp; VERTICAL SEAM MATCHING LOGIC ]</span>
                  <pre className="text-emerald-400">{`# For two tiles A and B:
# Valid horizontal connection (A on top of B):
is_valid_vertical_seam = np.array_equal(tileA[-1, :], tileB[0, :])

# Valid vertical connection (A to the left of B):
is_valid_horizontal_seam = np.array_equal(tileA[:, -1], tileB[:, 0])`}</pre>
                </div>

                {/* OUTPUT BOX */}
                <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <span className="text-zinc-500 block mb-1 font-bold">[ 📤 RECONSTRUCTED 4x4 GRID ]</span>
                  <pre className="text-emerald-400">{`+-----------------+-----------------+-----------------+-----------------+
| piece_008_2.png | piece_011.png   | piece_016.png   | piece_009_2.png |  <- Row 0
+-----------------+-----------------+-----------------+-----------------+
| piece_007_2.png | piece_001_2.png | piece_014.png   | piece_004_2.png |  <- Row 1
+-----------------+-----------------+-----------------+-----------------+
| piece_002_2.png | piece_006_2.png | piece_015.png   | piece_013.png   |  <- Row 2
+-----------------+-----------------+-----------------+-----------------+
| piece_012.png   | piece_005_2.png | piece_010.png   | piece_003_2.png |  <- Row 3
+-----------------+-----------------+-----------------+-----------------+`}</pre>
                </div>

                {/* Assembled QR Image Preview */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-zinc-800 bg-white p-2 shrink-0">
                    <Image
                      src="/images/byteme_l1_qr.png"
                      alt="Level 1 Reconstructed QR"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xs font-sans text-zinc-400 leading-relaxed">
                    <p className="font-bold text-white mb-1 font-mono uppercase text-[11px]">Reconstructed 4x4 QR (1200 x 1200 px)</p>
                    <p>Every single module line connects with 0 pixel jitter. OpenCV decodes the flag immediately.</p>
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show Complete Standalone Python Seam Solver Script ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`from PIL import Image
import cv2, numpy as np

# 1. 4x4 Layout discovered by seam compatibility solver
grid = [
    ["piece_008_2.png", "piece_011.png", "piece_016.png", "piece_009_2.png"],
    ["piece_007_2.png", "piece_001_2.png", "piece_014.png", "piece_004_2.png"],
    ["piece_002_2.png", "piece_006_2.png", "piece_015.png", "piece_013.png"],
    ["piece_012.png", "piece_005_2.png", "piece_010.png", "piece_003_2.png"]
]

# 2. Stitch 16 tiles (300x300 px each) into 1200x1200 canvas
tiles = [[Image.open(f"pieces_1/{fn}") for fn in row] for row in grid]
w, h = tiles[0][0].size

canvas = Image.new("RGB", (w * 4, h * 4), "white")
for r in range(4):
    for c in range(4):
        canvas.paste(tiles[r][c], (c * w, r * h))

canvas.save("assembled_qr_l1.png")

# 3. Decode QR Code
det = cv2.QRCodeDetector()
flag, _, _ = det.detectAndDecode(np.array(canvas))
print(f"[🎯] Decoded Flag: {flag}")
# Output: OWASP{Sh4tt3r3d_m3m0r13s}`}</pre>
                </div>
              </details>

              {/* Flag Box */}
              <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">LEVEL 1 VERIFIED FLAG</span>
                  <code className="text-sm font-mono text-white font-bold">OWASP&#123;Sh4tt3r3d_m3m0r13s&#125;</code>
                </div>
                <CopyButton text="OWASP{Sh4tt3r3d_m3m0r13s}" />
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* LEVEL 2: FALSE SOULS                                          */}
            {/* ------------------------------------------------------------- */}
            <article id="level-2" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="Backtracking / Impostors"
                points="300 PTS"
                slug="level-2-false-souls"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    LEVEL 2 SOLVED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    5x5 Grid • 29 Pieces • 4 Impostors • Rotations
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  Level 2 — False Souls
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Twenty-nine fragments in folder <code className="text-zinc-300 font-mono">pieces_2</code> (240x240 px). Pieces are randomly rotated (0°, 90°, 180°, 270°) and 4 pieces are synthetic impostors!
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Not every fragment belongs to the Soul Stone. Among the scattered remains, false souls have been mixed with the genuine pieces. Identify the four impostors and reconstruct the true message before the deception consumes the trail.&rdquo;
              </div>

              {/* The Concept in Plain English */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> The Core Problem Explained: How to Catch Impostor Pieces
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  In Level 2, the challenge creator added two evil tricks:
                  <br />
                  1. <strong>Rotational Invariance ($D_4$)</strong>: Every piece could be turned sideways or upside down (4 rotations per piece = $29 \times 4 = 116$ candidate orientations).
                  <br />
                  2. <strong>False Injections (Impostors)</strong>: A 5x5 grid only needs 25 pieces, but you are given 29! Exactly 4 pieces are fake synthetic decoys.
                  <br /><br />
                  <strong>The Impostor Detection Rule:</strong>
                  In any valid jigsaw puzzle, every genuine piece connects to at least 2 neighbors (corner pieces touch 2, border pieces touch 3, center pieces touch 4).
                  If a tile has <strong>zero matching neighbors</strong> across all other tiles in all 4 rotations, it is mathematically impossible for it to belong to the puzzle. It is an impostor!
                </p>
              </div>

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Step-by-Step Triage: Degree-of-Matching Audit &amp; 5x5 Grid Placement
                </h4>

                {/* INPUT BOX */}
                <div className="bg-black/90 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
                  <span className="text-zinc-500 block mb-1 font-bold">[ 📥 INPUT: DEGREE-OF-MATCHING AUDIT ALGORITHM ]</span>
                  <pre className="text-emerald-400">{`# For every tile T, check if any of its 4 edges matches any edge of any other tile T'
matches = {tile_id: 0 for tile_id in range(1, 30)}
for tileA in pool:
    for tileB in pool:
        if tileA != tileB and has_matching_seam(tileA, tileB):
            matches[tileA] += 1`}</pre>
                </div>

                {/* OUTPUT BOX */}
                <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <span className="text-zinc-500 block mb-1 font-bold">[ 📤 AUDIT RESULTS: THE 4 PRUNED IMPOSTORS ]</span>
                  <div className="flex flex-wrap gap-2 my-2 font-mono text-xs">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded font-bold">❌ Impostor: piece_013.png (0 valid connections)</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded font-bold">❌ Impostor: piece_015.png (0 valid connections)</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded font-bold">❌ Impostor: piece_019.png (0 valid connections)</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded font-bold">❌ Impostor: piece_020.png (0 valid connections)</span>
                  </div>
                  <span className="text-zinc-400">Result: 29 pieces - 4 impostors = exactly 25 genuine pieces remaining!</span>
                </div>

                {/* Assembled QR Image Preview */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-zinc-800 bg-white p-2 shrink-0">
                    <Image
                      src="/images/byteme_l2_qr.png"
                      alt="Level 2 Reconstructed QR"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xs font-sans text-zinc-400 leading-relaxed">
                    <p className="font-bold text-white mb-1 font-mono uppercase text-[11px]">Reconstructed 5x5 QR (1200 x 1200 px)</p>
                    <p>With impostors eliminated, backtracking depth-first search solves the 25-piece grid in under 1 second.</p>
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show Complete Standalone Python SAT Backtracking Solver ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`import cv2, numpy as np
from PIL import Image

# 1. Prune impostors 013, 015, 019, 020
# 2. Solved 5x5 configuration: (piece_number, clockwise_rotation_deg)
layout = [
    [("001", 270), ("003", 0),   ("021", 90),  ("027", 270), ("022", 180)],
    [("014", 90),  ("017", 90),  ("028", 180), ("006", 0),   ("011", 180)],
    [("007", 0),   ("029", 270), ("018", 270), ("004", 90),  ("026", 90)],
    [("002", 90),  ("012", 0),   ("010", 90),  ("024", 180), ("025", 180)],
    [("005", 0),   ("009", 270), ("016", 270), ("023", 180), ("008", 180)]
]

# 3. Stitch 5x5 at 240x240 px each -> 1200x1200 QR canvas
canvas = Image.new("RGB", (240 * 5, 240 * 5), "white")
for r in range(5):
    for c in range(5):
        num, rot = layout[r][c]
        tile = Image.open(f"pieces_2/piece_{num}.png").rotate(-rot)
        canvas.paste(tile, (c * 240, r * 240))

canvas.save("assembled_qr_l2.png")

# 4. Decode with OpenCV QRCodeDetector
flag, _, _ = cv2.QRCodeDetector().detectAndDecode(np.array(canvas))
print(f"[🎯] Decoded Flag: {flag}")
# Output: OWASP{Tru3_s0ul_0r_f4ls3}`}</pre>
                </div>
              </details>

              {/* Flag Box */}
              <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">LEVEL 2 VERIFIED FLAG</span>
                  <code className="text-sm font-mono text-white font-bold">OWASP&#123;Tru3_s0ul_0r_f4ls3&#125;</code>
                </div>
                <CopyButton text="OWASP{Tru3_s0ul_0r_f4ls3}" />
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* LEVEL 3: LOST EDGE                                            */}
            {/* ------------------------------------------------------------- */}
            <article id="level-3" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="Meta-Grid / Super-Tiles"
                points="400 PTS"
                slug="level-3-lost-edge"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    LEVEL 3 SOLVED
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    6x6 Grid • 41 Pieces • 5 Impostors • Super-Tiles
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  Level 3 — Lost Edge
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Forty-one puzzle pieces in folder <code className="text-zinc-300 font-mono">pieces_3</code> (200x200 px). Exactly 5 pieces are echoes (impostors), leaving 36 genuine pieces forming a 6x6 grid.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;A portion of the Soul Stone&apos;s edge has vanished into the ruins of Vormir. Forty-one fragments remain, but five are echoes of something that never existed. Separate truth from illusion and restore the lost pattern.&rdquo;
              </div>

              {/* The Concept in Plain English */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> The Core Problem Explained: The 2x2 Super-Tile Breakthrough
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  With 36 genuine pieces, the permutation space is <code className="text-white font-mono">36! ≈ 3.7 × 10⁴¹</code>. A naive backtracking solver will run for hours without terminating.
                  <br /><br />
                  <strong>The Super-Tile Reduction:</strong>
                  Instead of trying to place 36 small tiles, look at tiles that share dense internal black feature seams.
                  Because QR codes have dense data modules, internal seams have dozens of matching black pixels (<code className="text-zinc-200 font-mono">edge.sum() &gt;= 20</code>).
                  Every genuine piece has exactly ONE partner that matches it with 0 pixel errors.
                  This groups all 36 pieces into <strong>nine 2x2 super-blocks</strong> (400x400 px each)!
                  <br /><br />
                  Suddenly, you aren&apos;t solving a 36-piece puzzle! You are solving a simple <strong>3x3 grid of 9 blocks</strong>, which takes milliseconds!
                </p>
              </div>

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Step-by-Step Triage: Eliminating Impostors &amp; Clustering Super-Tiles
                </h4>

                {/* Impostor Filtering */}
                <div className="bg-[#0b0c10] border border-zinc-800 rounded-xl p-4 font-mono text-xs text-zinc-300">
                  <span className="text-zinc-500 block mb-1 font-bold">[ 📤 AUDIT RESULTS: THE 5 ELIMINATED IMPOSTORS ]</span>
                  <div className="flex flex-wrap gap-2 my-2 font-mono text-xs">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_007.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_022.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_025.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_027.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_030.png</span>
                  </div>
                </div>

                {/* Super-Tiles Montage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative h-44 rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <Image
                      src="/images/byteme_l3_montage.png"
                      alt="Tile Montage"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-2 left-3 font-mono text-[10px] bg-black/80 px-2 py-0.5 rounded text-zinc-400">
                      Seam Match Montage
                    </div>
                  </div>
                  <div className="relative h-44 rounded-xl overflow-hidden border border-zinc-800 bg-black">
                    <Image
                      src="/images/byteme_l3_blocks9.png"
                      alt="Nine 2x2 Super-Tiles"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-2 left-3 font-mono text-[10px] bg-black/80 px-2 py-0.5 rounded text-zinc-400">
                      Nine 2x2 Super-Blocks
                    </div>
                  </div>
                </div>

                {/* 9 Blocks Categorization */}
                <div className="bg-[#12131a] border border-zinc-700/60 rounded-xl p-4 text-xs font-mono text-zinc-300">
                  <span className="text-emerald-400 font-bold block mb-1 uppercase tracking-wider">
                    [ 🧩 Classification of the 9 Super-Blocks ]
                  </span>
                  <div>• <strong>Center Block:</strong> Block 7 (0 white border margins)</div>
                  <div>• <strong>Border Blocks:</strong> Blocks 3, 4, 5, 6 (1 white border edge)</div>
                  <div>• <strong>Corner Blocks:</strong> Blocks 1, 2, 8, 9 (2 white border edges)</div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show Complete Standalone Python Super-Tile &amp; ZXing Solver ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`# The 9 Clustered 2x2 Super-Blocks:
# Block 1 (Corner):  {piece_009, piece_016, piece_026, piece_036}
# Block 2 (Corner):  {piece_020, piece_021, piece_024, piece_032}
# Block 3 (Border):  {piece_002, piece_028, piece_031, piece_039}
# Block 4 (Border):  {piece_006, piece_014, piece_019, piece_029}
# Block 5 (Border):  {piece_004, piece_012, piece_034, piece_035}
# Block 6 (Border):  {piece_005, piece_011, piece_013, piece_041}
# Block 7 (Center):  {piece_003, piece_008, piece_015, piece_040}
# Block 8 (Corner):  {piece_010, piece_017, piece_037, piece_038}
# Block 9 (Corner):  {piece_001, piece_018, piece_023, piece_033}

# Permuting the 3x3 arrangement of these 9 blocks with zxing-cpp
# Successfully decoded the payload at configuration index 17:
# "SOUL STONE // LOST EDGE // OWASP{Th3_l0st_3dg3}"`}</pre>
                </div>
              </details>

              {/* Flag Box */}
              <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">LEVEL 3 VERIFIED FLAG</span>
                  <code className="text-sm font-mono text-white font-bold">OWASP&#123;Th3_l0st_3dg3&#125;</code>
                </div>
                <CopyButton text="OWASP{Th3_l0st_3dg3}" />
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* LEVEL 4: JUDGMENT OF VORMIR                                   */}
            {/* ------------------------------------------------------------- */}
            <article id="level-4" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="Constraint Satisfaction / MRV"
                points="500 PTS"
                slug="level-4-judgment-of-vormir"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    LEVEL 4 MASTER SOLVE
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    7x7 Master Grid • 49 Genuine Tiles • MRV Backtracker
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  Level 4 — Judgment of Vormir
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  The final trial. A 7x7 grid ($1400 \times 1400$ px) with 57 candidate pieces in <code className="text-zinc-300 font-mono">pieces_4</code>, random rotations, and missing corners.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;The final threshold of Vormir. Forty-nine fragments forming a massive 7x7 matrix. To pass, truth must be separated from deception through constraint satisfaction and strict border alignment.&rdquo;
              </div>

              {/* The Concept in Plain English */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> The Core Problem Explained: Minimum Remaining Values (MRV)
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  In Level 4, standard chronological placement fails because filling from (0,0) to (6,6) leads into millions of dead-end branches.
                  <br /><br />
                  <strong>How Sudoku Masters Solve Grids:</strong>
                  If you play Sudoku, you never fill numbers from top-left to bottom-right. You look at the board and ask: <em>&ldquo;Which empty square has only ONE possible number that fits?&rdquo;</em>
                  This is the famous <strong>Minimum Remaining Values (MRV) heuristic</strong> in Computer Science.
                  <br /><br />
                  At every step of our solver, we count how many remaining candidate tiles can legally fit into each empty cell in the 7x7 grid.
                  A cell surrounded by 3 placed neighbors usually has <strong>only 1 valid piece</strong> in the whole candidate pool!
                  By placing that piece first, there is <strong>zero branching</strong>: the grid propagates forward like falling dominoes!
                </p>
              </div>

              {/* Step-by-Step Walkthrough */}
              <div className="space-y-4 mb-6">
                <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> Step-by-Step Triage: MRV Propagation &amp; 7x7 Grid Assembly
                </h4>

                {/* Assembled QR Image Preview */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-zinc-800 bg-white p-2 shrink-0">
                    <Image
                      src="/images/byteme_l4_qr.png"
                      alt="Level 4 Reconstructed QR"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xs font-sans text-zinc-400 leading-relaxed">
                    <p className="font-bold text-white mb-1 font-mono uppercase text-[11px]">Reconstructed 7x7 QR (1400 x 1400 px)</p>
                    <p>Decodes via OpenCV &amp; zxing-cpp to: <br /><span className="text-emerald-400 font-mono font-bold">SOUL STONE // JUDGMENT OF VORMIR // OWASP&#123;J3dg3m3nt_0f_V0rm1r&#125;</span></p>
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Solver */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show Complete Standalone Python MRV Solver Script (fill2.py) ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`import os, numpy as np
from PIL import Image
import cv2, zxingcpp

DIR = "pieces_4"
raw = {f: (np.array(Image.open(os.path.join(DIR, f)).convert("L")) < 128).astype(np.uint8)
       for f in sorted(os.listdir(DIR)) if f.startswith("piece")}
h, w = raw[next(iter(raw))].shape
N, M = 7, 7

def edge7(line):
    return tuple(1 if line[int(round(i * len(line) / M)):int(round((i + 1) * len(line) / M))].mean() > 0.5 else 0 for i in range(M))

def V(f, rot):
    r = np.rot90(raw[f], rot)
    return dict(f=f, rot=rot, arr=r, T=edge7(r[0, :]), B=edge7(r[-1, :]), L=edge7(r[:, 0]), R=edge7(r[:, -1]))

# Locked-in 7x7 MRV layout:
layout = {
  (0,0):('006',3), (0,1):('050',3), (0,2):('034',1), (0,3):('031',2), (0,4):('033',1), (0,5):('046',0), (0,6):('004',2),
  (1,1):('036',0), (1,2):('012',0), (1,3):('008',0), (1,4):('024',0), (1,5):('043',2), (1,6):('048',1),
  (2,1):('040',2), (2,2):('049',1), (2,3):('018',2), (2,4):('001',3), (2,5):('042',1), (2,6):('002',3),
  (3,1):('026',2), (3,2):('023',0), (3,3):('047',0), (3,4):('054',0), (3,5):('028',0), (3,6):('013',1),
  (4,1):('011',3), (4,2):('045',1), (4,3):('029',0), (4,4):('030',2), (4,5):('005',0), (4,6):('041',1),
  (5,0):('009',0), (5,1):('038',1), (5,2):('055',2), (5,3):('052',1), (5,4):('044',3), (5,5):('051',3), (5,6):('022',1),
  (6,0):('053',1), (6,1):('056',3), (6,4):('007',2), (6,6):('003',1)
}

# Render full 7x7 canvas and decode with zxingcpp
# Result: OWASP{J3dg3m3nt_0f_V0rm1r}`}</pre>
                </div>
              </details>

              {/* Flag Box */}
              <div className="bg-[#111116] border border-emerald-500/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400 tracking-widest block font-bold">LEVEL 4 VERIFIED FLAG</span>
                  <code className="text-sm font-mono text-white font-bold">OWASP&#123;J3dg3m3nt_0f_V0rm1r&#125;</code>
                </div>
                <CopyButton text="OWASP{J3dg3m3nt_0f_V0rm1r}" />
              </div>
            </article>

            {/* ------------------------------------------------------------- */}
            {/* OSINT: VORMIR'S HIDDEN WITNESS                                */}
            {/* ------------------------------------------------------------- */}
            <article id="osint-witness" className="scroll-mt-24 bg-[#0a0a0f]/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
              <CrtCardHeader
                platform="Byte Me CTF 2026"
                category="OSINT / Recon"
                points="150 PTS"
                slug="osint-hidden-witness"
              />

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono text-xs px-2.5 py-0.5 rounded font-bold uppercase">
                    RECON BRIEFING
                  </span>
                  <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 font-mono text-xs px-2.5 py-0.5 rounded">
                    Stalker Intel &amp; Vault Telemetry
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wide mb-3">
                  Vormir&apos;s Hidden Witness (OSINT)
                </h2>
                <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
                  Correlating digital footprints and reconnaissance telemetry left across the external Vormir repository and satellite logs.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;A silent watcher documented the expedition from orbit. Correlate the reconnaissance telemetry and log entries left across external repositories to locate the hidden witness.&rdquo;
              </div>

              {/* Recon Image */}
              <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-zinc-800 bg-black">
                <Image
                  src="/images/byteme_stalker0.jpg"
                  alt="Stalker Recon Intel"
                  fill
                  className="object-cover"
                />
              </div>

              {/* What We Do Section */}
              <div className="mb-6 space-y-4">
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">⚡</span> What We Do: Satellite Recon &amp; Vault Telemetry Correlation
                </h3>
                
                <div className="bg-[#111116] border-l-4 border-zinc-500 p-5 rounded-r-xl mb-4 font-sans text-sm text-zinc-300 leading-relaxed">
                  <h4 className="text-zinc-200 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    <span>🛰️</span> Reconnaissance Methodology: Correlating Vault Logs
                  </h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Investigating the recovered forensic trace <code className="text-zinc-200 font-mono">vault.log</code> links directly back to the physical blocks recovered in the mission challenges:
                  </p>
                </div>

                <div className="bg-black/90 border border-zinc-800 p-5 rounded-xl font-mono text-xs text-zinc-400 leading-relaxed mb-6">
                  <span className="text-white font-bold">[ VAULT RECORD RECOVERED ]</span>
                  <br />
                  OPEN vault
                  <br />
                  AUTH keeper
                  <br />
                  READ /soul/fragment
                  <br />
                  ERROR checksum mismatch
                  <br />
                  RECOVER block=17 // RECOVER block=18
                  <br />
                  NOTE corrupted metadata follows
                </div>
              </div>
            </article>

          </div>

          {/* ================= RIGHT / STICKY SLIDER RAIL ================= */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-[#0d0d12]/95 border border-zinc-800 rounded-2xl p-4 backdrop-blur-xl shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800/80">
                <span className="font-mono text-[11px] text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  MISSION INDEX
                </span>
                <span className="font-mono text-[10px] text-zinc-500">{missions.length} LEVELS</span>
              </div>

              <p className="text-[11px] text-zinc-500 mb-3 font-mono">
                Click any level to jump to its solution &amp; code:
              </p>

              <nav className="flex flex-col gap-2">
                {missions.map((m) => {
                  const isActive = activeId === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => scrollToMission(m.id)}
                      className={`text-left p-3 rounded-xl border transition-all duration-300 flex flex-col gap-1 ${
                        isActive
                          ? "bg-zinc-900 border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                          : "bg-black/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase font-bold text-zinc-500">
                          {m.num}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${
                          isActive 
                            ? "border-emerald-500/50 text-emerald-400 bg-emerald-500/10" 
                            : "border-zinc-800 text-zinc-500"
                        }`}>
                          {m.points}
                        </span>
                      </div>
                      <span className={`font-bold text-xs uppercase tracking-wider ${isActive ? "text-white" : ""}`}>
                        {m.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500 truncate">
                        {m.grid}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
                <Link
                  href="/ctfs/byte-me/forensics"
                  className="w-full text-center py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Switch to Forensics Track →
                </Link>
                <Link
                  href="/ctfs"
                  className="w-full text-center py-1.5 text-zinc-500 hover:text-zinc-300 font-mono text-[11px] transition-colors"
                >
                  ← Back to All CTFs
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
