"use client";

import { useStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Download, Volume2, Maximize2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const campaigns = useStore((s) => s.campaigns);
  const asset = campaigns.flatMap((c) => c.assets).find((a) => a.id === id);

  if (!asset) return <div className="py-20 text-center text-zinc-500">Asset not found.</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl">
      <button onClick={() => router.back()} className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h1 className="mb-2 text-xl font-semibold tracking-tight">{asset.campaignName}</h1>
      <p className="mb-8 text-sm text-zinc-500">{asset.creatorName} · Variant {asset.variantLabel}</p>

      {/* Video Player */}
      <div className="mb-6 overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900">
        <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900" />
          <div className="relative flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800/80"><Play className="h-7 w-7 text-zinc-300 ml-1" /></div>
            <p className="text-sm text-zinc-400">AI-Generated Ad Preview</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
            <div className="mb-2 h-1 w-full rounded-full bg-zinc-700"><div className="h-full w-0 rounded-full bg-accent" /></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3"><Play className="h-4 w-4 text-zinc-400" /><span className="text-xs font-mono text-zinc-500">0:00 / 0:{String(asset.durationSeconds).padStart(2, "0")}</span><Volume2 className="h-4 w-4 text-zinc-400" /></div>
              <Maximize2 className="h-4 w-4 text-zinc-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <p className="text-xs font-medium text-zinc-500 mb-3">Asset Details</p>
          <div className="space-y-2 text-sm">
            {[["Format", asset.format], ["Resolution", asset.resolution], ["Duration", `0:${String(asset.durationSeconds).padStart(2, "0")}`], ["File Size", `${asset.fileSizeMB} MB`], ["Style", asset.stylePreset]].map(([l, v]) => (
              <div key={l} className="flex justify-between"><span className="text-zinc-500">{l}</span><span className="text-zinc-300">{v}</span></div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <p className="text-xs font-medium text-zinc-500 mb-3">License</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-zinc-500">Status</span><StatusBadge status={asset.licenseStatus} /></div>
            <div className="flex justify-between"><span className="text-zinc-500">Start</span><span className="text-zinc-300">{new Date(asset.licenseStartDate).toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">End</span><span className="text-zinc-300">{new Date(asset.licenseEndDate).toLocaleDateString()}</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">Channels</span><span className="text-zinc-300 text-right">{asset.licensedChannels.join(", ")}</span></div>
          </div>
        </div>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover">
        <Download className="h-4 w-4" /> Download Asset ({asset.fileSizeMB} MB)
      </button>
    </motion.div>
  );
}
