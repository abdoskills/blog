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
      num: "L0",
      title: "First Fragment",
      grid: "3x3 GRID",
      points: "100 PTS",
      tagline: "3x3 QR Puzzle & Quiet Zone Adjacency",
      flag: "OWASP{Th3_f1rst_fr4gm3nt}"
    },
    {
      id: "level-1",
      num: "L1",
      title: "Shattered Memories",
      grid: "4x4 GRID",
      points: "200 PTS",
      tagline: "4x4 Matrix Continuity & Boundary Detection",
      flag: "OWASP{Sh4tt3r3d_m3m0r13s}"
    },
    {
      id: "level-2",
      num: "L2",
      title: "False Souls",
      grid: "5x5 GRID + ROTATIONS",
      points: "300 PTS",
      tagline: "4 Impostor Tiles & 4-Way Rotation Solver",
      flag: "OWASP{Tru3_s0ul_0r_f4ls3}"
    },
    {
      id: "level-3",
      num: "L3",
      title: "Lost Edge",
      grid: "6x6 GRID + SUPER-TILES",
      points: "400 PTS",
      tagline: "2x2 Super-Tiles & Meta-Grid Permutation",
      flag: "OWASP{Th3_l0st_3dg3}"
    },
    {
      id: "level-4",
      num: "L4",
      title: "Judgment of Vormir",
      grid: "7x7 MASTER GRID",
      points: "500 PTS",
      tagline: "Constraint Satisfaction Solver & MRV Search",
      flag: "OWASP{J3dg3m3nt_0f_V0rm1r}"
    },
    {
      id: "osint-witness",
      num: "OSINT",
      title: "Vormir's Hidden Witness",
      grid: "RECON TRACK",
      points: "150 PTS",
      tagline: "Digital Footprint & Expedition Intel",
      flag: "OWASP{h1dd3n_w1tn3ss_v0rm1r}"
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
            <span>{m.title}</span>
          </button>
        ))}
      </div>

      <main className="flex-grow pt-6 pb-24 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        {/* Page Breadcrumbs & Header */}
        <div className="mb-10 text-left border-b border-zinc-800/80 pb-6">
          <div className="mb-3 inline-flex items-center gap-2 bg-[#111111]/80 backdrop-blur-md border border-zinc-700/50 px-3 py-1 rounded-full text-xs font-mono">
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
            Missions &amp; OSINT Dossier
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base font-sans max-w-3xl leading-relaxed">
            The complete 5-level escalation of algorithmic QR puzzle solving (&ldquo;unemployed at its peak&rdquo;) + OSINT recon. Navigate smoothly using the right-side rail to see the mathematical models, impostor filtering, and Python assembly scripts.
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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
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

              {/* Grid Diagram & Assembly */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  1. Piece Adjacency &amp; Quiet Zone Alignment
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Each tile has edges that pair seamlessly with its adjacent neighbor. Quiet zones (pure white borders) define outer perimeter boundaries:
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <pre className="text-emerald-400">{`+---------------+---------------+---------------+
| piece_008.png | piece_001.png | piece_009.png |
+---------------+---------------+---------------+
| piece_005.png | piece_003.png | piece_004.png |
+---------------+---------------+---------------+
| piece_007.png | piece_002.png | piece_006.png |
+---------------+---------------+---------------+`}</pre>
                </div>
              </div>

              {/* Assembled QR Image */}
              <div className="relative w-48 h-48 rounded-xl overflow-hidden mb-6 border border-zinc-800 bg-white p-2">
                <Image
                  src="/images/byteme_l0_qr.png"
                  alt="Level 0 Reconstructed QR"
                  fill
                  className="object-contain"
                />
              </div>

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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
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

              {/* Grid Diagram */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  1. 4x4 Grid Edge Reconstruction
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

              {/* Assembled QR Image */}
              <div className="relative w-48 h-48 rounded-xl overflow-hidden mb-6 border border-zinc-800 bg-white p-2">
                <Image
                  src="/images/byteme_l1_qr.png"
                  alt="Level 1 Reconstructed QR"
                  fill
                  className="object-contain"
                />
              </div>

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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
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
                  <em>&ldquo;Not every fragment belongs to the Soul Stone. Identify the 4 impostors and reconstruct the true message.&rdquo;</em>
                  29 pieces provided (240 x 240 px each) with random 90-degree rotations. The genuine canvas requires exactly 25 tiles (5x5).
                </p>
              </div>

              {/* Impostor Filtering & Methodology */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  1. Backtracking &amp; Impostor Detection
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  For all 29 pieces and all 4 orientations (0°, 90°, 180°, 270° rotations), we computed pixel-for-pixel seam matching against adjacent neighbors. Exactly 4 pieces contradicted all valid border and internal topologies:
                </p>
                <div className="flex flex-wrap gap-2 mb-4 font-mono text-xs">
                  <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">Impostor: piece_013.png</span>
                  <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">Impostor: piece_015.png</span>
                  <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">Impostor: piece_019.png</span>
                  <span className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1 rounded">Impostor: piece_020.png</span>
                </div>
              </div>

              {/* Assembled QR Image */}
              <div className="relative w-48 h-48 rounded-xl overflow-hidden mb-6 border border-zinc-800 bg-white p-2">
                <Image
                  src="/images/byteme_l2_qr.png"
                  alt="Level 2 Reconstructed QR"
                  fill
                  className="object-contain"
                />
              </div>

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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
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
                  41 fragments provided (200 x 200 px). Five are false echoes (41 - 5 = 36 genuine tiles forming a 6x6 grid).
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

              {/* 2x2 Super-Tile Logic */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  1. The 2x2 Super-Tile Clustering Breakthrough
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Eliminating the 5 impostor tiles (<code className="text-zinc-300 font-mono">007, 022, 025, 027, 030</code>) left 36 tiles. Rather than brute-forcing 36! positions, seam autocorrelation grouped them into exactly <strong>nine 2x2 super-tiles</strong>:
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <span className="text-zinc-500"># Center Super-Block (0 white margins):</span>
                  <br />
                  <span className="text-zinc-300">Block 7: &#123;piece_003, piece_008, piece_015, piece_040&#125;</span>
                  <br />
                  <br />
                  <span className="text-zinc-500"># 4 Corner Super-Blocks (2 white margins):</span>
                  <br />
                  <span className="text-emerald-400">Blocks 1, 2, 8, 9 (TL, TR, BL, BR)</span>
                  <br />
                  <br />
                  <span className="text-zinc-500"># 4 Border Super-Blocks (1 white margin):</span>
                  <br />
                  <span className="text-zinc-300">Blocks 3, 4, 5, 6 (Top, Bottom, Left, Right)</span>
                </div>
              </div>

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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
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
                  The final trial of the Soul Stone. A massive 7x7 grid (1400 x 1400 px) requiring full Minimum Remaining Values (MRV) constraint propagation to satisfy all rotational edge boundary conditions.
                </p>
              </div>

              {/* Assembled QR Image */}
              <div className="relative w-56 h-56 rounded-xl overflow-hidden mb-6 border border-zinc-800 bg-white p-2">
                <Image
                  src="/images/byteme_l4_qr.png"
                  alt="Level 4 Reconstructed QR"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase mb-3">
                  1. MRV Heuristic &amp; Complete Reconstruction
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Using our custom solver <code className="text-zinc-300 font-mono">solve_l4mrv.py</code> and <code className="text-zinc-300 font-mono">fill2.py</code>, the 49 tiles were placed sequentially based on the slot with the fewest remaining candidate tiles:
                </p>
                <div className="bg-black/90 rounded-xl p-4 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto mb-4">
                  <span className="text-zinc-500"># Decoded QR Payload:</span>
                  <br />
                  <span className="text-emerald-400">SOUL STONE // JUDGMENT OF VORMIR // OWASP&#123;J3dg3m3nt_0f_V0rm1r&#125;</span>
                </div>
              </div>

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

              <div className="mt-6 border-b border-zinc-800/80 pb-6 mb-8">
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

              <div className="relative w-full h-48 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-zinc-800 bg-black">
                <Image
                  src="/images/byteme_stalker0.jpg"
                  alt="Stalker Recon Intel"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="bg-[#111116] border border-zinc-800 p-5 rounded-xl font-mono text-xs text-zinc-400 leading-relaxed mb-6">
                <span className="text-white font-bold">[ VAULT RECORD RECOVERED ]</span>
                <br />
                OPEN vault // AUTH keeper // READ /soul/fragment
                <br />
                RECOVER block=17 // RECOVER block=18
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
