"use client";

import { useStore } from "@/store";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Play, Grid, List } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import Link from "next/link";

export default function AssetsPage() {
  const campaigns = useStore((s) => s.campaigns);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const allAssets = campaigns.flatMap((c) => c.assets);
  const filtered = allAssets.filter((a) =>
    a.campaignName.toLowerCase().includes(search.toLowerCase()) || a.creatorName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Asset Library</h1>
        <p className="mt-1 text-sm text-zinc-500">All generated AI video assets and their license status.</p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assets..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 pl-9 pr-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-accent/50" />
        </div>
        <div className="flex rounded-lg border border-zinc-800 overflow-hidden">
          <button onClick={() => setViewMode("grid")} className={`p-2 ${viewMode === "grid" ? "bg-zinc-800 text-zinc-200" : "text-zinc-500"}`}><Grid className="h-4 w-4" /></button>
          <button onClick={() => setViewMode("list")} className={`p-2 ${viewMode === "list" ? "bg-zinc-800 text-zinc-200" : "text-zinc-500"}`}><List className="h-4 w-4" /></button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 py-16 text-center">
          <Play className="mx-auto mb-3 h-8 w-8 text-zinc-700" />
          <p className="text-sm text-zinc-500">No assets yet. Complete a campaign to generate video assets.</p>
          <Link href="/brand" className="mt-4 inline-block text-xs text-accent hover:text-accent-hover">Browse Creators</Link>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((asset, i) => (
            <motion.div key={asset.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Link href={`/brand/assets/${asset.id}`} className="group block rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden transition-all hover:border-zinc-700">
                <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900" />
                  <div className="relative"><Play className="h-8 w-8 text-zinc-600 group-hover:text-zinc-400 transition-colors" /></div>
                  <div className="absolute bottom-2 right-2 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-mono text-zinc-400">0:{String(asset.durationSeconds).padStart(2, "0")}</div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-zinc-200 truncate">{asset.campaignName}</h3>
                    <span className="text-[11px] font-medium text-zinc-500 shrink-0 ml-2">Var {asset.variantLabel}</span>
                  </div>
                  <p className="text-xs text-zinc-500">{asset.creatorName} · {asset.resolution}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <StatusBadge status={asset.licenseStatus} />
                    <span className="text-[11px] text-zinc-600">Exp {new Date(asset.licenseEndDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-zinc-800/40">
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Asset</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Creator</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Format</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">License</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Expires</th>
              <th className="px-5 py-3"></th>
            </tr></thead>
            <tbody>
              {filtered.map((asset) => (
                <tr key={asset.id} className="border-b border-zinc-800/20 last:border-0">
                  <td className="px-5 py-4"><p className="text-sm text-zinc-200">{asset.campaignName}</p><p className="text-xs text-zinc-500">Variant {asset.variantLabel}</p></td>
                  <td className="px-5 py-4 text-sm text-zinc-400">{asset.creatorName}</td>
                  <td className="px-5 py-4 text-xs text-zinc-400">{asset.resolution}</td>
                  <td className="px-5 py-4"><StatusBadge status={asset.licenseStatus} /></td>
                  <td className="px-5 py-4 text-xs text-zinc-500">{new Date(asset.licenseEndDate).toLocaleDateString()}</td>
                  <td className="px-5 py-4"><button className="text-zinc-500 hover:text-zinc-300"><Download className="h-4 w-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
