"use client";

import { useStore } from "@/store";
import { motion } from "framer-motion";
import { FileCheck, AlertTriangle } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

export default function LicensesPage() {
  const licenses = useStore((s) => s.licenses);

  const active = licenses.filter((l) => l.status === "active");
  const expiring = licenses.filter((l) => l.status === "expiring-soon");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Active Licenses</h1>
        <p className="mt-1 text-sm text-zinc-500">Track who is using your likeness and when licenses expire.</p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <div className="flex items-center gap-2"><FileCheck className="h-4 w-4 text-zinc-500" /><span className="text-xs font-medium text-zinc-500">Active Licenses</span></div>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{active.length + expiring.length}</p>
        </div>
        {expiring.length > 0 && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
            <div className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-400" /><span className="text-xs font-medium text-amber-400">Expiring Soon</span></div>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{expiring.length}</p>
          </div>
        )}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
          <div className="flex items-center gap-2"><span className="text-xs font-medium text-zinc-500">Total License Revenue</span></div>
          <p className="mt-2 text-2xl font-semibold tracking-tight">${licenses.reduce((s, l) => s + l.revenue, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Licenses Table */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-zinc-800/40">
            <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Brand</th>
            <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Campaign</th>
            <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Channels</th>
            <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Period</th>
            <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Status</th>
            <th className="px-5 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-600">Revenue</th>
          </tr></thead>
          <tbody>
            {licenses.map((lic, i) => (
              <motion.tr key={lic.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                className="border-b border-zinc-800/20 last:border-0">
                <td className="px-5 py-4 text-sm font-medium text-zinc-200">{lic.brandName}</td>
                <td className="px-5 py-4 text-sm text-zinc-400">{lic.campaignName}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1">
                    {lic.channels.map((ch) => (
                      <span key={ch} className="rounded-md bg-zinc-800/60 px-1.5 py-0.5 text-[10px] text-zinc-500">{ch}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4 text-xs text-zinc-500">{new Date(lic.startDate).toLocaleDateString()} — {new Date(lic.endDate).toLocaleDateString()}</td>
                <td className="px-5 py-4"><StatusBadge status={lic.status} /></td>
                <td className="px-5 py-4 text-sm font-medium text-zinc-300">${lic.revenue.toLocaleString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
