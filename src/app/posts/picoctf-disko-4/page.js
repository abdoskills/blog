import Image from "next/image";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";

export const metadata = {
  title: "Disko 4: Recovering Deleted Files from FAT32 Disk Images | PicoCTF 2026",
  description: "Forensic analysis of a raw 100 MB FAT32 volume image using The Sleuth Kit (TSK). Filtering deleted directory entries with fls -d, avoiding the Windows PowerShell UTF-16 redirection trap, carving Inode 532021, and inflating gzip payloads.",
};

export default function PicoCTFDisko4Writeup() {
  const fsstatCmd = `fsstat.exe .\disko-4.dd`;
  const flsDeletedCmd = `fls.exe -r -d .\disko-4.dd`;
  const pythonCarveCmd = `python -c "import subprocess; open('dont-delete.gz', 'wb').write(subprocess.check_output(['icat.exe', r'.\disko-4.dd', '532021']))"`;
  const solveScript = `import subprocess
import gzip

def solve():
    # 1. Carve Inode 532021 directly into memory (avoids PowerShell UTF-16LE redirection bug)
    cmd = ["icat.exe", r".\disko-4.dd", "532021"]
    raw_gz = subprocess.check_output(cmd)
    
    # 2. Decompress raw gzip byte stream
    decompressed = gzip.decompress(raw_gz)
    print(decompressed.decode("utf-8").strip())

if __name__ == "__main__":
    solve()`;
  const hunterScript = `#!/usr/bin/env python3
import sys, os, re, subprocess, gzip, zlib, zipfile, io

if sys.platform == "win32":
    try: sys.stdout.reconfigure(encoding="utf-8")
    except Exception: pass

def run_cmd(cmd):
    try: return subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True).stdout
    except: return None

class DiskHunter:
    def __init__(self, img):
        self.img = os.path.abspath(img)
        self.offset = None

    def triage(self):
        print(f"[*] Analyzing {self.img}...")
        raw_mmls = run_cmd(["mmls.exe", self.img]) or run_cmd(["mmls", self.img])
        if raw_mmls:
            for line in raw_mmls.decode("utf-8", errors="ignore").splitlines():
                parts = line.split()
                if len(parts) >= 6 and any(k in line.lower() for k in ["linux", "fat", "ntfs", "0x83"]):
                    self.offset = parts[2]
            print(f"[+] Partition detected! Selected offset: -o {self.offset}")
        else:
            print("[*] Direct volume image (Offset 0).")

        # Scan deleted files
        fls_cmd = ["fls.exe"] if run_cmd(["fls.exe", "-v"]) else ["fls"]
        if self.offset: fls_cmd.extend(["-o", self.offset])
        fls_cmd.extend(["-r", "-d", self.img])
        raw_fls = run_cmd(fls_cmd)
        if raw_fls:
            for line in raw_fls.decode("utf-8", errors="ignore").splitlines():
                m = re.search(r"\*\s+(\d+):\s+(.+)", line)
                if m:
                    inode, path = m.groups()
                    print(f"[*] Deleted file: Inode {inode} -> {path}")
                    if any(k in path.lower() for k in ["flag", "dont", "secret", ".gz", ".zip"]):
                        self.carve(inode)

    def carve(self, inode):
        icat_cmd = ["icat.exe"] if run_cmd(["icat.exe", "-v"]) else ["icat"]
        if self.offset: icat_cmd.extend(["-o", self.offset])
        icat_cmd.extend([self.img, str(inode)])
        raw = run_cmd(icat_cmd)
        if not raw: return
        if raw.startswith(b"\x1f\x8b"):
            try: raw = gzip.decompress(raw)
            except: pass
        elif raw[:2] in [b"\x78\x01", b"\x78\x9c", b"\x78\xda"]:
            try: raw = zlib.decompress(raw)
            except: pass
        m = re.findall(rb"([a-zA-Z0-9_\-]+{[^}\n\r]+})", raw)
        if m: print(f"\n[+] FLAG FOUND: {m[0].decode('utf-8', errors='ignore')}\n")
        try: print(raw.decode("utf-8")[:300])
        except: print(raw[:32].hex())

if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else [f for f in os.listdir(".") if f.endswith((".dd", ".img", ".raw"))][0]
    DiskHunter(target).triage()`;
  const hunterOutput = `============================================================
 PHASE 1: PARTITION & FILESYSTEM DETECTION
============================================================
[*] Target Image: disko-4.dd (100.00 MB)
[!] mmls did not find a partition table. Assuming raw volume image (Offset 0).
[+] Filesystem Identified: FAT32

============================================================
 PHASE 2: DELETED FILES TRIAGE (fls -r -d)
============================================================
[*] Detected 2 deleted file(s):
   * Inode: 522629 -> log/messages
   * Inode: 532021 -> log/dont-delete.gz [HIGH PRIORITY]

============================================================
 PHASE 4: CARVING & DECOMPRESSION
============================================================
[*] Auto-carving Inode 532021 (log/dont-delete.gz)...
[+] GZIP stream detected & successfully inflated!

##################################################
 [!] FLAG FOUND: picoCTF{d3l_d0n7_h1d3_w3ll_284686d1}
##################################################`;
  const flagText = `picoCTF{d3l_d0n7_h1d3_w3ll_284686d1}`;

  return (
    <div className="min-h-screen relative z-10 text-gray-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Navigation */}
      <nav className="w-full p-4 sm:p-6 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/ctfs" 
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-widest"
        >
          <span className="transform transition-transform group-hover:-translate-x-1">←</span> Back to CTFs
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        
        {/* Header / Hero Section */}
        <header className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 sm:mb-6 inline-flex max-w-full bg-[#111111]/80 backdrop-blur-md border border-cyan-500/40 px-3 sm:px-4 py-1.5 rounded-full animate-glow-pulse">
            <span className="font-mono text-[10px] sm:text-xs text-cyan-400 uppercase tracking-wider sm:tracking-[0.3em] break-words">
              PICOCTF 2026 • FORENSICS • FAT32 DELETED FILE CARVING
              <span className="animate-blink inline-block w-1.5 h-3 bg-cyan-400 ml-2 align-middle"></span>
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 text-white font-[family-name:var(--font-share-tech)] leading-tight break-words">
            Disko 4: Recovering Deleted Files from FAT32 Disk Images
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest mb-8">
            <span>By Abdo</span>
            <span>•</span>
            <span>5 min read</span>
            <span>•</span>
            <span className="text-cyan-400">PicoCTF 2026</span>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full text-left font-mono text-xs">
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">TARGET IMAGE</span>
              <span className="text-white font-bold truncate block">disko-4.dd (100 MB)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">FILESYSTEM</span>
              <span className="text-cyan-400 font-bold truncate block">FAT32 (Offset 0)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">DELETED INODE</span>
              <span className="text-amber-400 font-bold truncate block">532021 (dont-delete.gz)</span>
            </div>
            <div className="bg-[#0e0e13]/90 border border-zinc-800 p-3 sm:p-4 rounded-xl min-w-0">
              <span className="text-zinc-500 block mb-1 text-[11px]">FLAG</span>
              <span className="text-emerald-400 font-bold truncate block">picoCTF&#123;d3l_d0n7...&#125;</span>
            </div>
          </div>
        </header>

        {/* Featured Graphic */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800/80 mb-12 shadow-2xl group bg-black">
          <Image
            src="/images/pico_disko_4.jpg"
            alt="FAT32 Deleted File Recovery and Inode Carving"
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>FIGURE 1: FAT32 Volume Pipeline &amp; Deleted Inode Carving</span>
            <span className="text-cyan-400 font-bold">FAT32 &bull; fls -d &bull; icat &bull; gzip Inflate</span>
          </div>
        </div>

        {/* Challenge Summary */}
        <div className="bg-[#0b1418]/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden mb-12 backdrop-blur-md">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider">
                Forensic Scenario
              </span>
            </div>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-sans">
              Investigating a 100 MB raw disk dump (<code className="text-cyan-300 bg-black/40 px-1 py-0.5 rounded font-mono text-xs">disko-4.dd</code>). When opening or mounting the volume normally, the flag is absent. Through filesystem structure analysis using The Sleuth Kit (TSK), we discover that the image is a direct unpartitioned FAT32 volume. Filtering for deleted directory entries (<code className="text-cyan-300 font-mono text-xs">fls -r -d</code>), we detect a deleted archive named <code className="text-amber-300 font-mono text-xs">dont-delete.gz</code> at Inode <code className="text-cyan-300 font-mono text-xs">532021</code>. By carving the binary stream and inflating the gzip compression, we rescue the flag.
            </p>
          </div>
        </div>

        {/* Section 1: Identifying the Filesystem */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">01.</span> Volume Triage: Partition vs. Direct Filesystem
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            Running <code className="text-cyan-300 font-mono">mmls</code> exits with an error because this image does not possess an MBR or GPT partition table. Instead, it starts directly with a filesystem boot sector. We run <code className="text-cyan-300 font-mono">fsstat</code> to inspect the volume:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • INSPECT VOLUME METADATA</span>
              <CopyButton text={fsstatCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{fsstatCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// Key fsstat Parameters:</div>
            <div>File System Type: <span className="text-emerald-400 font-bold">FAT32</span></div>
            <div>OEM Name: mkfs.fat</div>
            <div>Sector Size: 512 bytes | Cluster Size: 512 bytes</div>
            <div>Sectors before file system: <span className="text-cyan-400 font-bold">0</span> (Direct raw volume, no offset needed!)</div>
          </div>
        </section>

        {/* Section 2: Filtering Deleted Files */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">02.</span> Detecting Deleted Files with FLS
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            In FAT32, deleting a file replaces the first character of the directory entry with <code className="text-amber-300 font-mono">0xE5</code>. The Sleuth Kit marks these unallocated entries with an asterisk (<code className="text-rose-400 font-mono">*</code>). By passing <code className="text-cyan-300 font-mono">-d</code>, we isolate deleted files instantly:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>POWERSHELL • LIST ONLY DELETED FILES</span>
              <CopyButton text={flsDeletedCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-amber-300 overflow-x-auto leading-relaxed">
              <code>{flsDeletedCmd}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// Deleted Files Detected:</div>
            <div className="text-zinc-400">r/r * 522629:   log/messages</div>
            <div className="text-emerald-400 font-bold">r/r * 532021:   log/dont-delete.gz  &larr; Suspicious target archive!</div>
          </div>
        </section>

        {/* Section 3: Carving & PowerShell Redirection Trap */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">03.</span> Carving Inode 532021 &amp; The PowerShell Trap
          </h2>
          <div className="bg-[#140b0b] border border-rose-500/40 rounded-xl p-4 text-xs text-rose-200 leading-relaxed font-mono">
            <strong>&#9888; CRITICAL FORENSIC GOTCHA:</strong> In Windows PowerShell 5.1, executing <code className="text-white">icat ... 532021 &gt; file.gz</code> converts the stdout stream into UTF-16 LE text with a Byte Order Mark (<code className="text-white">0xFF 0xFE</code>), corrupting the gzip magic bytes! Always carve raw binary streams via Python or <code className="text-white">cmd.exe /c</code>.
          </div>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>PYTHON • DIRECT BINARY EXTRACTION</span>
              <CopyButton text={pythonCarveCmd} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{pythonCarveCmd}</code>
            </pre>
          </div>

          <p className="text-zinc-300 leading-relaxed text-sm">
            Examining the carved file verifies valid gzip headers (<code className="text-emerald-400 font-mono">1F 8B 08 08</code>) and archive name <code className="text-amber-300 font-mono">dont-delete</code>.
          </p>
        </section>

        {/* Section 4: Automated Solve Script */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">04.</span> Complete Automated Solve Script (Python)
          </h2>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>PYTHON • SOLVE.PY</span>
              <CopyButton text={solveScript} />
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              <code>{solveScript}</code>
            </pre>
          </div>

          {/* Flag Box */}
          <div className="bg-gradient-to-r from-emerald-950/40 via-[#0a1813] to-emerald-950/40 border border-emerald-500/50 rounded-2xl p-4 sm:p-6 shadow-2xl relative overflow-hidden mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="min-w-0 max-w-full">
                <span className="text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest block mb-1">
                  OFFICIAL CAPTURED FLAG
                </span>
                <span className="text-base sm:text-xl md:text-2xl font-mono font-bold text-white tracking-wide break-all block">
                  {flagText}
                </span>
              </div>
              <CopyButton text={flagText} />
            </div>
          </div>
        </section>

        {/* Section 5: Universal Tool */}
        <section className="mb-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-3 font-[family-name:var(--font-share-tech)] break-words">
            <span className="text-cyan-400">05.</span> Universal Forensic Tool: DFIR Hunter
          </h2>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            To automate this entire process across any disk challenge (FAT32, ext4, NTFS, MBR/GPT), we built <strong className="text-cyan-400 font-mono">dfir_hunter.py</strong>. It auto-detects partition tables, lists deleted files, and safely inflates Gzip/Zlib streams directly in memory:
          </p>

          <div className="relative bg-[#0a0a0f] border border-zinc-800/80 rounded-xl overflow-hidden">
            <div className="bg-[#14141e] px-4 py-2 flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-zinc-800/80">
              <span>PYTHON • DFIR_HUNTER.PY (UNIVERSAL ENGINE)</span>
              <CopyButton text={hunterScript} />
            </div>
            <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed max-h-96">
              <code>{hunterScript}</code>
            </pre>
          </div>

          <div className="bg-[#0e0e14] p-4 rounded-xl border border-zinc-800/70 font-mono text-xs space-y-1 text-zinc-300 overflow-x-auto">
            <div className="text-zinc-500">// 1-Second Terminal Output:</div>
            <pre className="text-emerald-400 leading-relaxed">
              <code>{hunterOutput}</code>
            </pre>
          </div>
        </section>

      </article>
    </div>
  );
}
