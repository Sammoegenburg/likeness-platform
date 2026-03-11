"use client";

import { useStore } from "@/store";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  DollarSign,
  ArrowUpRight,
  TrendingUp,
  FileCheck,
  Bell,
  Plus,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { CompletenessRing } from "@/components/ui/completeness-ring";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function CreatorDashboardPage() {
  const campaigns = useStore((s) => s.campaigns);
  const creators = useStore((s) => s.creators);
  const earnings = useStore((s) => s.earnings);
  const licenses = useStore((s) => s.licenses);
  const notifications = useStore((s) => s.notifications);
  const profiles = useStore((s) => s.creatorProfiles);

  const profile = profiles[0]; // Demo: Maya

  const pendingCampaigns = campaigns.filter((c) => c.status === "pending");
  const totalEarnings = earnings.reduce((sum, e) => sum + e.revenue, 0);
  const thisMonth = earnings[earnings.length - 1]?.revenue ?? 0;
  const activeLicenses = licenses.filter((l) => l.status === "active" || l.status === "expiring-soon").length;
  const unreadNotifs = notifications.filter((n) => !n.read);

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Creator Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">Manage licensing requests and track passive revenue.</p>
        </div>
        <Link href="/creator/onboarding" className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
          <Plus className="h-3.5 w-3.5" /> Edit Profile
        </Link>
      </div>

      {/* Profile Completeness Banner */}
      {profile && profile.profileCompleteness < 100 && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center gap-4 rounded-xl border border-accent/20 bg-accent/5 p-4">
          <CompletenessRing percent={profile.profileCompleteness} size={48} strokeWidth={4} />
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-200">Complete your likeness profile</p>
            <p className="mt-0.5 text-xs text-zinc-500">Higher completeness means more accurate AI-generated content.</p>
          </div>
          <Link href="/creator/onboarding" className="rounded-lg bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-hover">Complete Setup</Link>
        </motion.div>
      )}

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "This Month", value: `$${thisMonth.toLocaleString()}`, icon: DollarSign, accent: true },
          { label: "Total Earned", value: `$${totalEarnings.toLocaleString()}`, icon: TrendingUp, accent: false },
          { label: "Active Licenses", value: String(activeLicenses), icon: FileCheck, accent: false },
          { label: "Pending Requests", value: String(pendingCampaigns.length), icon: Clock, accent: false },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className={`rounded-xl border p-5 ${stat.accent ? "border-accent/20 bg-accent/5" : "border-zinc-800/60 bg-zinc-900/40"}`}>
            <div className="flex items-center gap-2">
              <stat.icon className={`h-4 w-4 ${stat.accent ? "text-accent" : "text-zinc-500"}`} />
              <span className="text-xs font-medium text-zinc-500">{stat.label}</span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Notifications Preview */}
      {unreadNotifs.length > 0 && (
        <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2"><Bell className="h-4 w-4 text-zinc-500" /><h2 className="text-sm font-semibold text-zinc-300">Recent Notifications</h2></div>
            <Link href="/creator/notifications" className="text-xs text-accent hover:text-accent-hover">View all</Link>
          </div>
          <div className="space-y-2">
            {unreadNotifs.slice(0, 3).map((n) => (
              <div key={n.id} className="flex items-center gap-3 rounded-lg bg-zinc-950/50 p-3">
                <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-200 truncate">{n.title}</p>
                  <p className="text-[11px] text-zinc-500 truncate">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earnings Chart */}
      <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Revenue from AI Likeness Licensing</h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earnings}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717a", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a", borderRadius: "8px", fontSize: "12px" }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#0066FF" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Licensing Requests */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Licensing Requests</h2>
        {campaigns.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-600">No licensing requests yet.</p>
        ) : (
          <div className="space-y-3">
            {campaigns.map((campaign) => {
              const creator = creators.find((c) => c.id === campaign.creatorId);
              return (
                <motion.div key={campaign.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-950/50 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-zinc-200 truncate">{campaign.campaignName}</h3>
                      <StatusBadge status={campaign.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500">{campaign.brandName} · ${campaign.estimatedCost.toLocaleString()}</p>
                  </div>
                  <div className="ml-4 flex items-center gap-2">
                    {campaign.status === "pending" && (
                      <Link href={`/creator/review/${campaign.id}`} className="flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white hover:bg-accent-hover">
                        Review <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                    {campaign.status === "approved" && (
                      <Link href={`/generate/${campaign.id}`} className="flex items-center gap-1 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700">
                        Generate <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                    {campaign.status === "completed" && (
                      <Link href={`/generate/${campaign.id}`} className="flex items-center gap-1 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700">
                        View <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
