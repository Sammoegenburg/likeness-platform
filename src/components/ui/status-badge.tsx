"use client";

import { Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";

const CONFIG: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string; className: string }> = {
  draft: { icon: Clock, label: "Draft", className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
  pending: { icon: Clock, label: "Pending Review", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  approved: { icon: CheckCircle2, label: "Approved", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  rejected: { icon: XCircle, label: "Rejected", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  generating: { icon: Loader2, label: "Generating", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  completed: { icon: CheckCircle2, label: "Completed", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  active: { icon: CheckCircle2, label: "Active", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  "expiring-soon": { icon: Clock, label: "Expiring Soon", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  expired: { icon: XCircle, label: "Expired", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  paid: { icon: CheckCircle2, label: "Paid", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  processing: { icon: Loader2, label: "Processing", className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  unpaid: { icon: Clock, label: "Unpaid", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
};

export function StatusBadge({ status }: { status: string }) {
  const c = CONFIG[status] || CONFIG.pending;
  const Icon = c.icon;

  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${c.className}`}>
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  );
}
