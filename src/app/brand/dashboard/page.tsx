"use client";

import { useStore } from "@/store";
import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, Video, FileCheck, Megaphone, ArrowUpRight, Plus } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function BrandDashboardPage() {
  const campaigns = useStore((s) => s.campaigns);
  const brandSpend = useStore((s) => s.brandSpend);
  const creators = useStore((s) => s.creators);

  const totalSpend = brandSpend.reduce((sum, e) => sum + e.spend, 0);
  const thisMonthSpend = brandSpend[brandSpend.length - 1]?.spend ?? 0;
  const activeCampaigns = campaigns.filter((c) => c.status !== "rejected" && c.status !== "draft").length;
  const completedAssets = campaigns.reduce((sum, c) => sum + c.assets.length, 0);

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Brand Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">Overview of your AI likeness campaigns and spend.</p>
        </div>
        <Link href="/brand" className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
          <Plus className="h-4 w-4" />
          New Campaign
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "This Month Spend", value: `$${thisMonthSpend.toLocaleString()}`, icon: DollarSign, accent: true },
          { label: "Total Spend", value: `$${totalSpend.toLocaleString()}`, icon: DollarSign, accent: false },
          { label: "Active Campaigns", value: String(activeCampaigns), icon: Megaphone, accent: false },
          { label: "Generated Assets", value: String(completedAssets), icon: Video, accent: false },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`rounded-xl border p-5 ${stat.accent ? "border-accent/20 bg-accent/5" : "border-zinc-800/60 bg-zinc-900/40"}`}
          >
            <div className="flex items-center gap-2">
              <stat.icon className={`h-4 w-4 ${stat.accent ? "text-accent" : "text-zinc-500"}`} />
              <span className="text-xs font-medium text-zinc-500">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Spend Chart */}
      <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Monthly Spend</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={brandSpend}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px" }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Spend"]} />
              <Area type="monotone" dataKey="spend" stroke="#0066FF" strokeWidth={2} fill="url(#spendGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-300">Recent Campaigns</h2>
          <Link href="/brand/campaigns" className="text-xs text-accent hover:text-accent-hover transition-colors">View all</Link>
        </div>
        <div className="space-y-3">
          {campaigns.slice(0, 5).map((campaign) => {
            const creator = creators.find((c) => c.id === campaign.creatorId);
            return (
              <div key={campaign.id} className="flex items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-950/50 p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-zinc-200 truncate">{campaign.campaignName}</h3>
                    <StatusBadge status={campaign.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-zinc-500">{creator?.name} · ${campaign.estimatedCost.toLocaleString()}</p>
                </div>
                <Link href={campaign.status === "completed" ? `/brand/assets` : `/brand/campaigns/${campaign.id}`}
                  className="ml-4 flex items-center gap-1 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700">
                  View <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
