"use client";

import { useStore } from "@/store";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ArrowUpRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

export default function CampaignsPage() {
  const campaigns = useStore((s) => s.campaigns);
  const creators = useStore((s) => s.creators);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = campaigns.filter((c) => {
    const matchesSearch = c.campaignName.toLowerCase().includes(search.toLowerCase()) || c.brandName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Campaigns</h1>
        <p className="mt-1 text-sm text-zinc-500">Track and manage all your licensing campaigns.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-2 pl-9 pr-3.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-accent/50" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-zinc-600" />
          {["all", "pending", "approved", "generating", "completed", "rejected"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${statusFilter === s ? "bg-zinc-800 text-zinc-200" : "text-zinc-500 hover:text-zinc-300"}`}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800/40">
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Campaign</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Creator</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Status</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Cost</th>
              <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Date</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((campaign, i) => {
              const creator = creators.find((c) => c.id === campaign.creatorId);
              return (
                <motion.tr key={campaign.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                  className="border-b border-zinc-800/20 last:border-0">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-zinc-200">{campaign.campaignName}</p>
                    <p className="text-xs text-zinc-500">{campaign.brandName}</p>
                  </td>
                  <td className="px-5 py-4 text-sm text-zinc-400">{creator?.name || "—"}</td>
                  <td className="px-5 py-4"><StatusBadge status={campaign.status} /></td>
                  <td className="px-5 py-4 text-sm font-medium text-zinc-300">${campaign.estimatedCost.toLocaleString()}</td>
                  <td className="px-5 py-4 text-xs text-zinc-500">{new Date(campaign.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <Link href={`/brand/campaigns/${campaign.id}`} className="flex items-center gap-1 text-xs text-accent hover:text-accent-hover transition-colors">
                      View <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-zinc-600">No campaigns match your filters.</div>
        )}
      </div>
    </div>
  );
}
