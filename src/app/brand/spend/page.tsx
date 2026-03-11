"use client";

import { useStore } from "@/store";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SpendPage() {
  const brandSpend = useStore((s) => s.brandSpend);
  const campaigns = useStore((s) => s.campaigns);
  const creators = useStore((s) => s.creators);

  const totalSpend = brandSpend.reduce((sum, e) => sum + e.spend, 0);
  const avgPerCampaign = Math.round(totalSpend / Math.max(campaigns.length, 1));

  // Spend by creator
  const creatorSpend = creators.map((c) => ({
    name: c.name.split(" ")[0],
    spend: campaigns.filter((cp) => cp.creatorId === c.id).reduce((s, cp) => s + cp.totalSpend, 0),
  })).filter((c) => c.spend > 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Spend Tracking</h1>
        <p className="mt-1 text-sm text-zinc-500">Monitor your licensing spend across creators and campaigns.</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Spend", value: `$${totalSpend.toLocaleString()}`, icon: DollarSign },
          { label: "Avg per Campaign", value: `$${avgPerCampaign.toLocaleString()}`, icon: TrendingUp },
          { label: "Active Campaigns", value: String(campaigns.filter((c) => c.status !== "rejected").length), icon: TrendingUp },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2"><stat.icon className="h-4 w-4 text-zinc-500" /><span className="text-xs font-medium text-zinc-500">{stat.label}</span></div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Monthly Spend Trend</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={brandSpend}>
              <defs><linearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0066FF" stopOpacity={0.2} /><stop offset="100%" stopColor="#0066FF" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px" }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Spend"]} />
              <Area type="monotone" dataKey="spend" stroke="#0066FF" strokeWidth={2} fill="url(#spGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {creatorSpend.length > 0 && (
        <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
          <h2 className="mb-4 text-sm font-semibold text-zinc-300">Spend by Creator</h2>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={creatorSpend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px" }}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Spend"]} />
                <Bar dataKey="spend" fill="#0066FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Campaign Spend Table */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Campaign Spend Breakdown</h2>
        <table className="w-full">
          <thead><tr className="border-b border-zinc-800/40">
            <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Campaign</th>
            <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Creator</th>
            <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Spend</th>
            <th className="pb-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Payment</th>
          </tr></thead>
          <tbody>
            {campaigns.map((c) => {
              const cr = creators.find((x) => x.id === c.creatorId);
              return (
                <tr key={c.id} className="border-b border-zinc-800/20 last:border-0">
                  <td className="py-3 text-sm text-zinc-200">{c.campaignName}</td>
                  <td className="py-3 text-sm text-zinc-400">{cr?.name}</td>
                  <td className="py-3 text-sm font-medium text-zinc-300">${c.totalSpend.toLocaleString()}</td>
                  <td className="py-3"><StatusBadge status={c.paymentStatus} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
