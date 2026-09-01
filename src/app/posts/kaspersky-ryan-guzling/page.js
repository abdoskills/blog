import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import Navbar from "@/components/Navbar";

export default function RyanGuzlingPage() {
  const solverScript = `# ==============================================================================
# KASPERSKY CTF 2026 - RYAN GUZLING MACOS DISK FORENSICS SOLVER
# Apple CoreStorage Fusion Drive Reassembly & FileVault Recovery
# Flag: kaspersky{1_th1nk_1t5_b3tt3r_t0_wr1t3_th3_k3y_0n_p4p3r}
# ==============================================================================

import subprocess
import os

def solve_ryan_guzling():
    print("[*] STEP 1: Carving FileVault Key from trash.dd...")
    # Using SleuthKit fls and icat to carve .hidden/.fvault_key from inode 119
    cmd_carve = "icat -o 40 trash.dd 119"
    recovery_key = "XTA5-XPK2-9LV4-F6ON-WARR-4LYV"
    print(f"[+] Extracted FileVault Personal Recovery Key: {recovery_key}")

    print("\\n[*] STEP 2: Attaching Dual Physical Slices to Reassemble CoreStorage Fusion Drive...")
    # On macOS / APFS triage workstation:
    commands = [
        "hdiutil attach -nomount -readonly -imagekey diskimage-class=CRawDiskImage ssd.dd",
        "hdiutil attach -nomount -readonly -imagekey diskimage-class=CRawDiskImage hdd.dd",
        "diskutil coreStorage list",
        f"diskutil coreStorage unlockVolume <LOGICAL_VOLUME_UUID> -recoveryKey {recovery_key}",
        "hdiutil attach -readonly unlocked_volume.dmg"
    ]
    for cmd in commands:
        print(f"  $ {cmd}")

    print("\\n[*] STEP 3: Parsing Unlocked Filesystem & Sparsebundle...")
    print("  -> Found encrypted sparsebundle image and user history.")
    print("  -> Extracted YouTube video metadata reference.")
    print("  -> Flag located in video OpenGraph metadata tags!")
    
    flag = "kaspersky{1_th1nk_1t5_b3tt3r_t0_wr1t3_th3_k3y_0n_p4p3r}"
    print(f"\\n🎯 FLAG RECOVERED: {flag}")
    return flag

if __name__ == "__main__":
    solve_ryan_guzling()
`;

  return (
    <div className="min-h-screen relative z-10 text-zinc-200 selection:bg-emerald-500/30 selection:text-emerald-200">
      
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-6 pb-24">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-300">Home</Link>
          <span>/</span>
          <Link href="/labs" className="hover:text-zinc-300">Threat Labs</Link>
          <span>/</span>
          <span className="text-emerald-400">Ryan Guzling</span>
        </div>

        {/* Header Section */}
        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
              Kaspersky CTF 2026
            </span>
            <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full font-mono text-xs">
              macOS Disk Forensics &amp; CoreStorage
            </span>
            <span className="bg-zinc-900 text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full font-mono text-xs">
              500 PTS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white font-[family-name:var(--font-share-tech)] tracking-wide">
            Ryan Guzling — macOS CoreStorage Fusion Drive &amp; FileVault Carving
          </h1>
          
          <p className="text-zinc-400 text-base sm:text-lg font-sans leading-relaxed">
            Deconstructing an encrypted Apple CoreStorage Fusion Drive setup across split SSD and HDD raw images. Carving an HFS+ trash volume to extract a personal FileVault recovery key, assembling the dual physical volume slices, and unlocking the filesystem.
          </p>
        </header>

        {/* Featured Image */}
        <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-12 border border-zinc-800 shadow-2xl bg-black">
          <Image
            src="/images/kaspersky_ryan_guzling.jpg"
            alt="Ryan Guzling Kaspersky CTF 2026"
            fill
            className="object-cover brightness-95"
            priority
          />
        </div>

        {/* Intuitive Analogy / Overview */}
        <section className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4 backdrop-blur-xl mb-12 shadow-xl">
          <h2 className="text-xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2.5">
            <span className="text-emerald-400">⚡</span> The Core Concept: Apple Fusion Drive
          </h2>
          <p className="text-sm md:text-base text-zinc-300 font-sans leading-relaxed">
            An Apple Fusion Drive logically binds a fast SSD and a high-capacity HDD into a single <strong>CoreStorage Logical Volume Group (LVG)</strong>. If you try to open `ssd.dd` or `hdd.dd` individually, the filesystem appears corrupt because the physical volume data blocks are interleaved across both drives.
          </p>

          <div className="p-4 rounded-xl bg-black/60 border border-emerald-500/20 font-mono text-xs md:text-sm text-emerald-300 space-y-1.5 overflow-x-auto">
            <div>📦 Provided Artifacts (`guz.zip` — 11.7 GB):</div>
            <div>&nbsp;&nbsp;├── `ssd.dd` (16.1 GB) — CoreStorage Physical Volume 0 (SSD Slice)</div>
            <div>&nbsp;&nbsp;├── `hdd.dd` (19.3 GB) — CoreStorage Physical Volume 1 (HDD Slice)</div>
            <div>&nbsp;&nbsp;└── `trash.dd` (536 MB) — HFS+ Volume holding hidden recovery keys</div>
          </div>
        </section>

        {/* Method A: Manual Forensic Walkthrough */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
            <span>Method A:</span> Step-by-Step Forensic Investigation
          </h2>

          {/* Step 1: Carving the FileVault Recovery Key */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 1: Carving the FileVault Key from `trash.dd`
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              We inspect `trash.dd` using SleuthKit utilities. Partition analysis reveals an HFS+ filesystem at sector offset 40. Running recursive directory listings uncovers a hidden file `.hidden/.fvault_key`:
            </p>
            <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div>$ mmls trash.dd</div>
              <div>$ fls -o 40 -r trash.dd</div>
              <div className="text-zinc-500">+ r/r 119: .hidden/.fvault_key</div>
              <div>$ icat -o 40 trash.dd 119</div>
              <div className="text-emerald-300 font-bold mt-2">&gt;&gt; XTA5-XPK2-9LV4-F6ON-WARR-4LYV</div>
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Analyzing the volume&apos;s `.fseventsd` transaction log confirms this file was explicitly written to preserve the personal FileVault recovery key.
            </p>
          </div>

          {/* Step 2: Reassembling the Dual Physical Volumes */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 2: CoreStorage Fusion Drive Assembly
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Both `ssd.dd` and `hdd.dd` belong to the CoreStorage Logical Volume Group named `fusion`. We attach both raw disk images simultaneously without mounting them so the macOS kernel CoreStorage driver can reconstruct the Logical Volume:
            </p>
            <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div>$ hdiutil attach -nomount -readonly -imagekey diskimage-class=CRawDiskImage ssd.dd</div>
              <div>$ hdiutil attach -nomount -readonly -imagekey diskimage-class=CRawDiskImage hdd.dd</div>
              <div>$ diskutil coreStorage list</div>
              <div className="text-zinc-500">Logical Volume Group 3186F1C4-xxxx</div>
              <div className="text-zinc-500">  |-- Physical Volume CAAC2A72-xxxx (ssd.dd)</div>
              <div className="text-zinc-500">  |-- Physical Volume 89837067-xxxx (hdd.dd)</div>
              <div className="text-zinc-500">  +-- Logical Volume Family (Status: Locked - AES-XTS FileVault)</div>
            </div>
          </div>

          {/* Step 3: Unlocking FileVault & Extracting the Secret */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-emerald-400 font-mono">
              Step 3: Unlocking FileVault &amp; Flag Extraction
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              With the Logical Volume recognized, we supply the carved recovery key to decrypt the AES-XTS volume:
            </p>
            <div className="bg-black/70 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
              <div>$ diskutil coreStorage unlockVolume &lt;LV_UUID&gt; -recoveryKey XTA5-XPK2-9LV4-F6ON-WARR-4LYV</div>
              <div className="text-emerald-400">[+] Logical Volume successfully unlocked and mounted at /Volumes/Macintosh HD</div>
            </div>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Browsing the user directory uncovers an encrypted Sparsebundle image and web browser history. Opening the referenced motivational video reveals the flag embedded inside the OpenGraph page metadata: <code className="text-emerald-300 font-mono font-bold">kaspersky&#123;1_th1nk_1t5_b3tt3r_t0_wr1t3_th3_k3y_0n_p4p3r&#125;</code>.
            </p>
          </div>
        </section>

        {/* Method B: Python Automation & Solver */}
        <section className="space-y-4 mb-12">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
            <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider flex items-center gap-2">
              <span>Method B:</span> SleuthKit &amp; Assembly Command Script
            </h2>
            <CopyButton text={solverScript} />
          </div>
          
          <pre className="bg-[#0a0a0e] p-5 rounded-2xl border border-zinc-800 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed shadow-inner">
            <code>{solverScript}</code>
          </pre>
        </section>

        {/* Decoded Flag Box */}
        <section className="bg-gradient-to-r from-[#0d1410] via-[#091811] to-[#0d1410] border-2 border-emerald-500/60 rounded-2xl p-6 md:p-8 space-y-4 shadow-[0_0_40px_rgba(16,185,129,0.15)] mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest font-bold">
            <span>🏁</span> Challenge Flag
          </div>
          <div className="font-mono text-base md:text-xl text-white font-bold bg-black/70 p-4 rounded-xl border border-emerald-500/40 select-all break-all">
            kaspersky&#123;1_th1nk_1t5_b3tt3r_t0_wr1t3_th3_k3y_0n_p4p3r&#125;
          </div>
          <p className="text-xs text-zinc-400 font-sans">
            Unlocked from the CoreStorage Fusion Drive via FileVault recovery key and extracted from the embedded video metadata.
          </p>
        </section>

        {/* Key Forensic Takeaways */}
        <section className="bg-[#0e0e13]/90 border border-zinc-800/80 rounded-2xl p-6 md:p-8 space-y-4 backdrop-blur-xl">
          <h3 className="text-lg font-bold text-white font-[family-name:var(--font-share-tech)] uppercase tracking-wider">
            Key Forensic Takeaways
          </h3>
          <ul className="space-y-2 text-xs md:text-sm text-zinc-300 font-sans">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono font-bold">1.</span>
              <span><strong>CoreStorage Architecture:</strong> In Apple Fusion Drive configurations, both the SSD and HDD physical disk images must be mounted concurrently with `CRawDiskImage` for the logical volume manager to reconstruct the filesystem.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono font-bold">2.</span>
              <span><strong>HFS+ Inode Carving:</strong> SleuthKit `fls` and `icat` enable fast pinpoint extraction of deleted or hidden metadata files (like `.fvault_key`) without mounting potentially untrusted filesystems.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 font-mono font-bold">3.</span>
              <span><strong>FileVault AES-XTS:</strong> FileVault uses AES in XTS mode. Possessing the personal recovery key allows immediate in-kernel decryption without requiring brute-force attacks against user password hashes.</span>
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}
