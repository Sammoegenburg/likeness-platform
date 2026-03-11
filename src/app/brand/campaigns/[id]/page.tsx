"use client";

import { useStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Video, FileText } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import Link from "next/link";

const TIMELINE_STEPS = ["Submitted", "Creator Review", "Approved", "Generating", "Completed"];

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const campaign = useStore((s) => s.campaigns.find((c) => c.id === id));
  const creators = useStore((s) => s.creators);

  if (!campaign) {
    return <div className="py-20 text-center text-zinc-500">Campaign not found.</div>;
  }

  const creator = creators.find((c) => c.id === campaign.creatorId);
  const statusIndex = { draft: 0, pending: 1, approved: 2, rejected: 1, generating: 3, completed: 4 }[campaign.status] ?? 0;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-4xl">
      <button onClick={() => router.back()} className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{campaign.campaignName}</h1>
          <p className="mt-1 text-sm text-zinc-500">{creator?.name} · Created {new Date(campaign.createdAt).toLocaleDateString()}</p>
        </div>
        <StatusBadge status={campaign.status} />
      </div>

      {/* Timeline */}
      <div className="mb-8 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <h2 className="mb-4 text-sm font-semibold text-zinc-300">Campaign Timeline</h2>
        <div className="flex items-center justify-between">
          {TIMELINE_STEPS.map((step, i) => (
            <div key={step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${i <= statusIndex ? "bg-accent/10" : "bg-zinc-800"}`}>
                  {i < statusIndex ? <CheckCircle2 className="h-4 w-4 text-accent" /> : i === statusIndex ? <Clock className="h-4 w-4 text-accent" /> : <div className="h-2 w-2 rounded-full bg-zinc-600" />}
                </div>
                <span className={`mt-2 text-[11px] ${i <= statusIndex ? "text-zinc-300" : "text-zinc-600"}`}>{step}</span>
              </div>
              {i < TIMELINE_STEPS.length - 1 && <div className={`mx-2 h-px flex-1 ${i < statusIndex ? "bg-accent/30" : "bg-zinc-800"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-3"><FileText className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Script</h3></div>
            <div className="rounded-lg bg-zinc-950 border border-zinc-800/40 p-4">
              <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">{campaign.script}</p>
            </div>
            <p className="mt-2 text-[11px] text-zinc-600">{campaign.script.split(/\s+/).filter(Boolean).length} words</p>
          </div>

          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <h3 className="text-sm font-semibold text-zinc-300 mb-3">Campaign Details</h3>
            <div className="space-y-3 text-sm">
              {[["Target Audience", campaign.targetAudience], ["Product URL", campaign.productUrl], ["Video Format", campaign.videoFormat], ["Style Preset", campaign.stylePreset], ["Variants", String(campaign.variants)]].map(([label, value]) => (
                <div key={label} className="flex justify-between"><span className="text-zinc-500">{label}</span><span className="text-zinc-300 text-right max-w-[60%]">{value}</span></div>
              ))}
            </div>
          </div>

          {/* Assets */}
          {campaign.assets.length > 0 && (
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
              <div className="flex items-center gap-2 mb-3"><Video className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Generated Assets</h3></div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {campaign.assets.map((asset) => (
                  <Link key={asset.id} href={`/brand/assets/${asset.id}`} className="rounded-lg border border-zinc-800/40 bg-zinc-950/50 p-4 transition-colors hover:border-zinc-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-zinc-400">Variant {asset.variantLabel}</span>
                      <StatusBadge status={asset.licenseStatus} />
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between"><span className="text-zinc-500">Format</span><span className="text-zinc-300">{asset.format}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Resolution</span><span className="text-zinc-300">{asset.resolution}</span></div>
                      <div className="flex justify-between"><span className="text-zinc-500">Duration</span><span className="text-zinc-300">{asset.durationSeconds}s</span></div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
            <p className="text-xs font-medium text-accent mb-1">Total Spend</p>
            <p className="text-2xl font-semibold">${campaign.totalSpend.toLocaleString()}</p>
            <div className="mt-2"><StatusBadge status={campaign.paymentStatus} /></div>
          </div>
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <p className="text-xs font-medium text-zinc-500 mb-2">Creator</p>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold text-zinc-300">{creator?.avatar}</div>
              <div><p className="text-sm font-medium text-zinc-200">{creator?.name}</p><p className="text-xs text-zinc-500">{creator?.handle}</p></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
