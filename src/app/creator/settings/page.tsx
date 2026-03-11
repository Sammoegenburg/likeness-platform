"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Bell, Shield, DollarSign, Globe } from "lucide-react";

export default function SettingsPage() {
  const [baseFee, setBaseFee] = useState(5000);
  const [maxLicenses, setMaxLicenses] = useState(3);
  const [exclusivityDays, setExclusivityDays] = useState(30);
  const [autoApprove, setAutoApprove] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">Manage your licensing preferences and account settings.</p>
      </div>

      <div className="space-y-6">
        {/* Pricing */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
          <div className="flex items-center gap-2 mb-4"><DollarSign className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Pricing</h3></div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Base License Fee</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">$</span>
                <input type="number" value={baseFee} onChange={(e) => setBaseFee(Number(e.target.value))} min={500} step={500}
                  className="w-32 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-accent/50" />
                <span className="text-xs text-zinc-500">per ad</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Licensing Controls */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
          <div className="flex items-center gap-2 mb-4"><Shield className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Licensing Controls</h3></div>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Max Concurrent Licenses</label>
              <input type="number" value={maxLicenses} onChange={(e) => setMaxLicenses(Number(e.target.value))} min={1} max={20}
                className="w-24 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-accent/50" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-zinc-400">Exclusivity Period (days)</label>
              <input type="number" value={exclusivityDays} onChange={(e) => setExclusivityDays(Number(e.target.value))} min={0} max={365}
                className="w-24 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-accent/50" />
              <p className="mt-1 text-[11px] text-zinc-600">Days before a competitor in the same category can license your likeness.</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-zinc-400">Auto-approve trusted brands</p>
                <p className="mt-0.5 text-[11px] text-zinc-600">Skip manual review for brands you&apos;ve worked with before.</p>
              </div>
              <button onClick={() => setAutoApprove(!autoApprove)}
                className={`relative h-6 w-11 rounded-full transition-colors ${autoApprove ? "bg-accent" : "bg-zinc-700"}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${autoApprove ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
          <div className="flex items-center gap-2 mb-4"><Bell className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Notifications</h3></div>
          <div className="space-y-4">
            {[
              { label: "Email notifications", desc: "Receive email for new licensing requests and payments.", value: emailNotifs, toggle: setEmailNotifs },
              { label: "Push notifications", desc: "Browser push for time-sensitive approvals.", value: pushNotifs, toggle: setPushNotifs },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div><p className="text-xs font-medium text-zinc-400">{item.label}</p><p className="mt-0.5 text-[11px] text-zinc-600">{item.desc}</p></div>
                <button onClick={() => item.toggle(!item.value)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${item.value ? "bg-accent" : "bg-zinc-700"}`}>
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${item.value ? "left-[22px]" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Account */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
          <div className="flex items-center gap-2 mb-4"><Globe className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Account</h3></div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-zinc-500">Email</span><span className="text-zinc-300">maya@example.com</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">Account ID</span><span className="text-zinc-400 font-mono text-xs">ecl_cr_1a2b3c4d</span></div>
            <div className="flex justify-between"><span className="text-zinc-500">Joined</span><span className="text-zinc-300">Oct 2025</span></div>
          </div>
        </motion.div>

        <button onClick={handleSave}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
