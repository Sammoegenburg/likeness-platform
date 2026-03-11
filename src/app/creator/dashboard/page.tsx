"use client";

import { useStore } from "@/store";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  DollarSign,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
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

  const pendingCampaigns = campaigns.filter((c) => c.status === "pending");
  const approvedCampaigns = campaigns.filter(
    (c) => c.status === "approved" || c.status === "completed" || c.status === "generating"
  );
  const totalEarnings = earnings.reduce((sum, e) => sum + e.revenue, 0);
  const thisMonth = earnings[earnings.length - 1]?.revenue ?? 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">
          Creator Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Manage licensing requests and track passive revenue.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "This Month",
            value: `$${thisMonth.toLocaleString()}`,
            icon: DollarSign,
            accent: true,
          },
          {
            label: "Total Earned",
            value: `$${totalEarnings.toLocaleString()}`,
            icon: TrendingUp,
            accent: false,
          },
          {
            label: "Pending Requests",
            value: pendingCampaigns.length.toString(),
            icon: Clock,
            accent: false,
          },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-5 ${
              stat.accent
                ? "border-accent/20 bg-accent/5"
                : "border-zinc-800/60 bg-zinc-900/40"
            }`}
          >
            <div className="flex items-center gap-2">
              <stat.icon
                className={`h-4 w-4 ${
                  stat.accent ? "text-accent" : "text-zinc-500"
                }`}
              />
              <span className="text-xs font-medium text-zinc-500">
                {stat.label}
              </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">
          Revenue from AI Likeness Licensing
        </h2>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earnings}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: "#71717a", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(value: any) => [
                  `$${Number(value).toLocaleString()}`,
                  "Revenue",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#0066FF"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">
          Licensing Requests
        </h2>

        {campaigns.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-600">
            No licensing requests yet.
          </p>
        ) : (
          <div className="space-y-3">
            {campaigns.map((campaign) => {
              const creator = creators.find(
                (c) => c.id === campaign.creatorId
              );
              return (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between rounded-lg border border-zinc-800/40 bg-zinc-950/50 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-zinc-200 truncate">
                        {campaign.campaignName}
                      </h3>
                      <StatusBadge status={campaign.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {campaign.brandName} · ${campaign.estimatedCost.toLocaleString()}
                    </p>
                  </div>

                  <div className="ml-4 flex items-center gap-2">
                    {campaign.status === "pending" && (
                      <Link
                        href={`/creator/review/${campaign.id}`}
                        className="flex items-center gap-1 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
                      >
                        Review
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                    {campaign.status === "approved" && (
                      <Link
                        href={`/generate/${campaign.id}`}
                        className="flex items-center gap-1 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
                      >
                        Generate
                        <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    )}
                    {campaign.status === "completed" && (
                      <Link
                        href={`/generate/${campaign.id}`}
                        className="flex items-center gap-1 rounded-md bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700"
                      >
                        View
                        <ArrowUpRight className="h-3 w-3" />
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

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string; className: string }> = {
    pending: {
      icon: Clock,
      label: "Pending Review",
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    approved: {
      icon: CheckCircle2,
      label: "Approved",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    rejected: {
      icon: XCircle,
      label: "Rejected",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
    },
    generating: {
      icon: Loader2,
      label: "Generating",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    completed: {
      icon: CheckCircle2,
      label: "Completed",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
  };

  const c = config[status] || config.pending;
  const Icon = c.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${c.className}`}
    >
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  );
}
