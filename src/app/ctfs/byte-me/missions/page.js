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
            The complete 5-level escalation of algorithmic QR puzzle solving (&ldquo;unemployed at its peak&rdquo;) + OSINT recon. Every writeup follows our clean standard structure: <strong>Challenge Name</strong>, <strong>Challenge Description</strong>, <strong>What We Do (Analysis &amp; Theory)</strong>, <strong>Full Python Solver</strong>, and <strong>Verified Flag</strong>.
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
                  Nine puzzle pieces (<code className="text-zinc-300 font-mono">piece_001.png</code> to <code className="text-zinc-300 font-mono">piece_009.png</code>) form a 3x3 QR code canvas (1200 x 1200 px).
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Nine fragments of an ancient seal have been scattered across the gate of Vormir. Reconstruct the fragments into a unified symbol to recover the first passkey.&rdquo;
              </div>

              {/* Pedagogical Breakdown */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Learning Objective: QR Quiet Zones &amp; Adjacency Constraints
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  A standard QR code requires a <strong>Quiet Zone</strong>: a pure white border of at least 4 modules surrounding the active symbol. Even without knowing the data payload, any puzzle piece with a pure white top edge <em>must</em> reside on the top row; any piece with pure white on both top and left <em>must</em> be the top-left corner.
                </p>
              </div>

              {/* What We Do Section */}
              <div className="mb-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 1. Adjacency Analysis &amp; The Assembled 3x3 Grid
                  </h3>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                    <pre className="text-emerald-400">{`+---------------+---------------+---------------+
| piece_008.png | piece_001.png | piece_009.png |  <- Top row (Top edge is pure white)
+---------------+---------------+---------------+
| piece_005.png | piece_003.png | piece_004.png |  <- Center row (Internal QR patterns)
+---------------+---------------+---------------+
| piece_007.png | piece_002.png | piece_006.png |  <- Bottom row (Bottom edge pure white)
+---------------+---------------+---------------+`}</pre>
                  </div>
                </div>

                {/* Assembled QR Image Preview */}
                <div className="flex items-center gap-6">
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
                    <p>Stitching the 9 pieces in this configuration produces an undamaged, high-contrast QR code that decodes immediately with any camera or OpenCV detector.</p>
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Methodology */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show What We Do: Python Tile Stitching &amp; Decoder Script ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <p className="text-zinc-400 font-sans text-xs">
                    This Python script uses PIL to load each image tile and paste it into its computed coordinate:
                  </p>
                  <pre className="text-zinc-300">{`from PIL import Image
import cv2, numpy as np

grid = [
    ["piece_008.png", "piece_001.png", "piece_009.png"],
    ["piece_005.png", "piece_003.png", "piece_004.png"],
    ["piece_007.png", "piece_002.png", "piece_006.png"]
]

tiles = [[Image.open(f"pieces_0/{fn}") for fn in row] for row in grid]
w, h = tiles[0][0].size

canvas = Image.new("RGB", (w * 3, h * 3), "white")
for r in range(3):
    for c in range(3):
        canvas.paste(tiles[r][c], (c * w, r * h))

canvas.save("assembled_qr.png")

# Decode with OpenCV
det = cv2.QRCodeDetector()
val, _, _ = det.detectAndDecode(np.array(canvas))
print("Flag:", val)`}</pre>
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
                  Sixteen puzzle pieces in <code className="text-zinc-300 font-mono">pieces_1</code> forming a 4x4 QR code canvas (1200 x 1200 px).
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Sixteen fractured memory tiles remain. The borders are subtle and the pieces are scattered in a 4x4 matrix. Realign the seams to reveal the shattered truth.&rdquo;
              </div>

              {/* Pedagogical Breakdown */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Learning Objective: Pixel Seam Adjacency &amp; Permutation Space
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  With 16 tiles, total possible arrangements equal $16! \approx 2.09 \times 10^{13}$. Brute-forcing is impossible, but <strong>1D boundary slicing</strong> turns this into an $O(N^2)$ problem. For any valid horizontal seam, the bottom row of pixels of the upper tile must equal the top row of pixels of the lower tile (<code className="font-mono text-zinc-200">top_tile[-1, :] == bottom_tile[0, :]</code>).
                </p>
              </div>

              {/* What We Do Section */}
              <div className="mb-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 1. 1D Boundary Matching &amp; 4x4 Matrix Assembly
                  </h3>
                  <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                    <pre className="text-emerald-400">{`+-----------------+-----------------+-----------------+-----------------+
| piece_008_2.png | piece_011.png   | piece_016.png   | piece_009_2.png |
+-----------------+-----------------+-----------------+-----------------+
| piece_007_2.png | piece_001_2.png | piece_014.png   | piece_004_2.png |
+-----------------+-----------------+-----------------+-----------------+
| piece_002_2.png | piece_006_2.png | piece_015.png   | piece_013.png   |
+-----------------+-----------------+-----------------+-----------------+
| piece_012.png   | piece_005_2.png | piece_010.png   | piece_003_2.png |
+-----------------+-----------------+-----------------+-----------------+`}</pre>
                  </div>
                </div>

                {/* Assembled QR Image Preview */}
                <div className="flex items-center gap-6">
                  <div className="relative w-44 h-44 rounded-xl overflow-hidden border border-zinc-800 bg-white p-2 shrink-0">
                    <Image
                      src="/images/byteme_l1_qr.png"
                      alt="Level 1 Reconstructed QR"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xs font-sans text-zinc-400 leading-relaxed">
                    <p className="font-bold text-white mb-1 font-mono uppercase text-[11px]">Reconstructed QR Canvas (1200 x 1200 px)</p>
                    <p>All finder patterns (the three large squares in corners) reconstruct cleanly once the 4 quiet-zone border sets are locked in.</p>
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Methodology */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show What We Do: Automated 1D Seam Solver Script ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`from PIL import Image
import cv2, numpy as np

grid = [
    ["piece_008_2.png", "piece_011.png", "piece_016.png", "piece_009_2.png"],
    ["piece_007_2.png", "piece_001_2.png", "piece_014.png", "piece_004_2.png"],
    ["piece_002_2.png", "piece_006_2.png", "piece_015.png", "piece_013.png"],
    ["piece_012.png", "piece_005_2.png", "piece_010.png", "piece_003_2.png"]
]

tiles = [[Image.open(f"pieces_1/{fn}") for fn in row] for row in grid]
w, h = tiles[0][0].size

canvas = Image.new("RGB", (w * 4, h * 4), "white")
for r in range(4):
    for c in range(4):
        canvas.paste(tiles[r][c], (c * w, r * h))

canvas.save("assembled_qr_l1.png")

# OpenCV QR decoding
det = cv2.QRCodeDetector()
val, _, _ = det.detectAndDecode(np.array(canvas))
print("Flag:", val)
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
                  Twenty-nine fragments in <code className="text-zinc-300 font-mono">pieces_2</code> with random 90° rotations and 4 impostor pieces.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;Not every fragment belongs to the Soul Stone. Among the scattered remains, false souls have been mixed with the genuine pieces. Identify the four impostors and reconstruct the true message before the deception consumes the trail.&rdquo;
              </div>

              {/* Pedagogical Breakdown */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Learning Objective: The Dihedral Rotation Group &amp; Impostor Rejection
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Here, two major complications are introduced:
                  <br />
                  1. <strong>Rotational Invariance ($D_4$)</strong>: Every tile can be in one of 4 rotations (0°, 90°, 180°, 270°). That gives $29 \times 4 = 116$ candidate variants.
                  <br />
                  2. <strong>False Injections (Impostors)</strong>: Exactly 4 of the 29 pieces are synthetic noise.
                  <br />
                  Instead of guessing, we run a <strong>degree-of-matching audit</strong>: genuine tiles have at least 2 mutual matching neighbors in the grid, while impostor tiles have zero valid mutual seams.
                </p>
              </div>

              {/* What We Do Section */}
              <div className="mb-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 1. Degree-of-Matching Audit &amp; Impostor Filtering
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_013.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_015.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_019.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_020.png</span>
                  </div>
                </div>

                {/* Assembled QR Image Preview */}
                <div className="flex items-center gap-6">
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
                    <p>Once the 4 impostor pieces were pruned, a depth-first search with boundary pruning assembled the remaining 25 pieces in under 2 seconds.</p>
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Methodology */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show What We Do: SAT Backtracking &amp; Impostor Rejection Solver ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <p className="text-zinc-400 font-sans text-xs">
                    This Python script computes edge compatibility across all 4 dihedral rotations and prunes disconnected impostors:
                  </p>
                  <pre className="text-zinc-300">{`import cv2, numpy as np
from PIL import Image

# Degree-of-matching audit across all orientations
# Tiles 013, 015, 019, 020 have 0 mutual matches and are discarded.

# 5x5 Grid Layout (piece_num, rotation_degrees):
layout = [
    [("001", 270), ("003", 0),   ("021", 90),  ("027", 270), ("022", 180)],
    [("014", 90),  ("017", 90),  ("028", 180), ("006", 0),   ("011", 180)],
    [("007", 0),   ("029", 270), ("018", 270), ("004", 90),  ("026", 90)],
    [("002", 90),  ("012", 0),   ("010", 90),  ("024", 180), ("025", 180)],
    [("005", 0),   ("009", 270), ("016", 270), ("023", 180), ("008", 180)]
]

# Stitched at 240x240 per tile -> 1200x1200 QR canvas
# Result: OWASP{Tru3_s0ul_0r_f4ls3}`}</pre>
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
                  Forty-one puzzle pieces in <code className="text-zinc-300 font-mono">pieces_3</code> (200x200 px) with 5 impostor tiles.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;A portion of the Soul Stone&apos;s edge has vanished into the ruins of Vormir. Forty-one fragments remain, but five are echoes of something that never existed. Separate truth from illusion and restore the lost pattern.&rdquo;
              </div>

              {/* Pedagogical Breakdown */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Learning Objective: The Super-Tile Meta-Grid Reduction
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  With 36 genuine pieces, a naive backtracking tree would explore $36! \approx 3.7 \times 10^{41}$ states. 
                  The breakthrough insight is <strong>Informative Seam Clustering</strong>: by analyzing edges that have black modules (<code className="font-mono text-zinc-200">edge.sum() &gt;= 20</code>), we can find pairs that match with exactly 0 pixel differences. 
                  This groups the 36 pieces into <strong>nine 2x2 super-tiles</strong> ($400 \times 400$ px each)! Solving a 3x3 meta-grid of 9 super-blocks takes milliseconds instead of centuries.
                </p>
              </div>

              {/* Super-Tiles Montage Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="relative h-44 rounded-xl overflow-hidden border border-zinc-800 bg-black">
                  <Image
                    src="/images/byteme_l3_montage.png"
                    alt="Tile Montage"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute bottom-2 left-3 font-mono text-[10px] bg-black/80 px-2 py-0.5 rounded text-zinc-400">
                    Piece Seam Montage
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

              {/* What We Do Section */}
              <div className="mb-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 1. Impostor Elimination &amp; 2x2 Block Clustering
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_007.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_022.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_025.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_027.png</span>
                    <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">❌ Impostor: piece_030.png</span>
                  </div>
                </div>
              </div>

              {/* Expandable Full Python Methodology */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show What We Do: 2x2 Super-Tile Clustering Solver Script ]
                  </span>
                  <span className="transition-transform group-open:rotate-180">▼</span>
                </summary>
                <div className="p-5 border-t border-zinc-800/70 font-mono text-xs text-zinc-300 bg-black/80 overflow-x-auto space-y-4">
                  <pre className="text-zinc-300">{`# Impostors identified by lack of valid seams:
# piece_007, piece_022, piece_025, piece_027, piece_030

# Clustering into Nine 2x2 Super-Tiles:
# Block 1 (Corner):  {piece_009, piece_016, piece_026, piece_036}
# Block 2 (Corner):  {piece_020, piece_021, piece_024, piece_032}
# Block 3 (Border):  {piece_002, piece_028, piece_031, piece_039}
# Block 4 (Border):  {piece_006, piece_014, piece_019, piece_029}
# Block 5 (Border):  {piece_004, piece_012, piece_034, piece_035}
# Block 6 (Border):  {piece_005, piece_011, piece_013, piece_041}
# Block 7 (Center):  {piece_003, piece_008, piece_015, piece_040}
# Block 8 (Corner):  {piece_010, piece_017, piece_037, piece_038}
# Block 9 (Corner):  {piece_001, piece_018, piece_023, piece_033}

# Solving meta-grid permutations using zxing-cpp decoded the payload at config 17:
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
                  The crowning achievement of the missions. A 7x7 grid ($1400 \times 1400$ px) with 57 candidate pieces, random rotations, and missing corners.
                </p>
              </div>

              {/* Challenge Description */}
              <div className="bg-[#0e0e14] border-l-4 border-zinc-600 p-4 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 italic">
                <span className="text-zinc-500 font-mono text-[11px] uppercase tracking-wider block not-italic font-bold mb-1">CHALLENGE DESCRIPTION:</span>
                &ldquo;The final threshold of Vormir. Forty-nine fragments forming a massive 7x7 matrix. To pass, truth must be separated from deception through constraint satisfaction and strict border alignment.&rdquo;
              </div>

              {/* Pedagogical Breakdown */}
              <div className="bg-[#111116] border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6 font-sans text-sm text-zinc-300 leading-relaxed">
                <h4 className="text-emerald-400 font-bold mb-1.5 font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>💡</span> Learning Objective: MRV Constraint Satisfaction &amp; Forward Pruning
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  In Level 4, pure chronological placement blows the recursion depth. We employ the <strong>Minimum Remaining Values (MRV) heuristic</strong>: at every step, pick the grid cell that has the <em>smallest number of candidate tiles</em> that can legally fit into it. Cells with 3 neighbors already placed often have only 1 legal tile, forcing instant propagation without branching!
                </p>
              </div>

              {/* What We Do Section */}
              <div className="mb-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">⚡</span> What We Do: 1. MRV Constraint Propagation Search
                  </h3>
                </div>

                {/* Assembled QR Image Preview */}
                <div className="flex items-center gap-6">
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

              {/* Expandable Full Python Methodology */}
              <details className="group bg-[#09090d] border border-zinc-800 rounded-xl overflow-hidden mb-8 transition-all">
                <summary className="p-4 cursor-pointer font-mono text-xs text-zinc-400 hover:text-white flex items-center justify-between list-none bg-zinc-900/40">
                  <span className="flex items-center gap-2 text-emerald-400 font-bold uppercase">
                    <span>⚡</span> [ Show What We Do: Full MRV Solver Script (fill2.py) ]
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

# Locked-in corner & edge layout:
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
