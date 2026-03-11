"use client";

import { useStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  ArrowLeft,
  Check,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function CreatorProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const creator = useStore((s) => s.creators.find((c) => c.id === id));

  if (!creator) {
    return (
      <div className="py-20 text-center text-zinc-500">Creator not found.</div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6 lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800 text-lg font-semibold text-zinc-200">
              {creator.avatar}
            </div>
            <h1 className="mt-4 text-lg font-semibold">{creator.name}</h1>
            <p className="text-sm text-zinc-500">{creator.handle}</p>

            <div className="mt-4 flex items-center gap-1.5">
              <span className="rounded-md bg-zinc-800/80 px-2.5 py-1 text-xs font-medium text-zinc-400">
                {creator.niche}
              </span>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              {creator.bio}
            </p>

            <div className="mt-6 grid w-full grid-cols-2 gap-3">
              <div className="rounded-lg bg-zinc-800/50 p-3">
                <div className="flex items-center justify-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-sm font-semibold text-zinc-200">
                    {creator.followers}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-zinc-600">Followers</p>
              </div>
              <div className="rounded-lg bg-zinc-800/50 p-3">
                <div className="flex items-center justify-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-sm font-semibold text-zinc-200">
                    {creator.engagement}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-zinc-600">Engagement</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {creator.platforms.map((p) => (
                <span
                  key={p}
                  className="flex items-center gap-1 rounded-md border border-zinc-800/60 px-2 py-0.5 text-[11px] text-zinc-500"
                >
                  <Globe className="h-3 w-3" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* License Details */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
            <h2 className="text-base font-semibold">Licensing Terms</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3 rounded-lg bg-zinc-800/30 p-4">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check className="h-3 w-3 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    Flat Fee Licensing
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    ${creator.licenseFee.toLocaleString()} per generated AI
                    advertisement. No residuals, no hidden costs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-zinc-800/30 p-4">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check className="h-3 w-3 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    Script Approval Required
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    Creator must approve every script before AI generation
                    begins. Full right of refusal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg bg-zinc-800/30 p-4">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
                  <Check className="h-3 w-3 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    90-Day Usage License
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    Generated assets licensed for 90 days of commercial use
                    across digital advertising channels.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href={`/brand/campaign/${creator.id}`}
              className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              License Likeness — ${creator.licenseFee.toLocaleString()}/ad
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
