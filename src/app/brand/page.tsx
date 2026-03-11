"use client";

import { useStore } from "@/store";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, TrendingUp, ExternalLink } from "lucide-react";

export default function MarketplacePage() {
  const creators = useStore((s) => s.creators);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Marketplace</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Browse verified creators available for AI likeness licensing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {creators.map((creator, i) => (
          <motion.div
            key={creator.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <Link
              href={`/brand/creator/${creator.id}`}
              className="group block rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5 transition-all hover:border-zinc-700/60 hover:bg-zinc-900/70"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-300">
                  {creator.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-zinc-100 truncate">
                      {creator.name}
                    </h3>
                    <ExternalLink className="h-3 w-3 text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <p className="text-xs text-zinc-500">{creator.handle}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1.5">
                <span className="rounded-md bg-zinc-800/80 px-2 py-0.5 text-[11px] font-medium text-zinc-400">
                  {creator.niche}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-zinc-500 line-clamp-2">
                {creator.bio}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-zinc-800/40 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-zinc-600" />
                    <span className="text-xs text-zinc-400">
                      {creator.followers}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-zinc-600" />
                    <span className="text-xs text-zinc-400">
                      {creator.engagement}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-accent">
                  ${creator.licenseFee.toLocaleString()}
                  <span className="text-xs font-normal text-zinc-500">
                    /ad
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
