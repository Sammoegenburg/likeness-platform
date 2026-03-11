"use client";

import { useStore } from "@/store";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export default function EarningsPage() {
  const earnings = useStore((s) => s.earnings);
  const campaigns = useStore((s) => s.campaigns);
  const creators = useStore((s) => s.creators);

  const totalEarnings = earnings.reduce((sum, e) => sum + e.revenue, 0);
  const thisMonth = earnings[earnings.length - 1]?.revenue ?? 0;
  const lastMonth = earnings[earnings.length - 2]?.revenue ?? 0;
  const growth = lastMonth > 0 ? Math.round(((thisMonth - lastMonth) / lastMonth) * 100) : 0;

  // Earnings by brand
  const byBrand = campaigns
    .filter((c) => c.status === "completed" || c.status === "approved")
    .map((c) => ({ name: c.brandName.split(" ")[0], revenue: c.estimatedCost }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Earnings</h1>
        <p className="mt-1 text-sm text-zinc-500">Detailed breakdown of your passive AI likeness revenue.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "This Month", value: `$${thisMonth.toLocaleString()}`, sub: `${growth > 0 ? "+" : ""}${growth}% vs last month`, icon: DollarSign, accent: true },
          { label: "Total Earned", value: `$${totalEarnings.toLocaleString()}`, sub: "All time", icon: TrendingUp, accent: false },
          { label: "Completed Campaigns", value: String(campaigns.filter((c) => c.status === "completed").length), sub: "Delivered assets", icon: Calendar, accent: false },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`rounded-xl border p-5 ${stat.accent ? "border-accent/20 bg-accent/5" : "border-zinc-800/60 bg-zinc-900/40"}`}>
            <div className="flex items-center gap-2"><stat.icon className={`h-4 w-4 ${stat.accent ? "text-accent" : "text-zinc-500"}`} /><span className="text-xs font-medium text-zinc-500">{stat.label}</span></div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</p>
            <p className="mt-1 text-[11px] text-zinc-600">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Monthly Revenue</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earnings}>
              <defs><linearGradient id="eGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0066FF" stopOpacity={0.2} /><stop offset="100%" stopColor="#0066FF" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px" }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#0066FF" strokeWidth={2} fill="url(#eGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {byBrand.length > 0 && (
        <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
          <h2 className="mb-4 text-sm font-semibold text-zinc-300">Revenue by Brand</h2>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byBrand}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px" }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
                <Bar dataKey="revenue" fill="#0066FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Payout History */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Payout History</h2>
        <div className="space-y-3">
          {campaigns.filter((c) => c.status === "completed").map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-950/50 p-4">
              <div><p className="text-sm font-medium text-zinc-200">{c.campaignName}</p><p className="text-xs text-zinc-500">{c.brandName} · {new Date(c.createdAt).toLocaleDateString()}</p></div>
              <span className="text-sm font-semibold text-emerald-400">+${c.estimatedCost.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
