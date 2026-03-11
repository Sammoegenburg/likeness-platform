"use client";

import { useStore } from "@/store";
import Link from "next/link";
import { motion } from "framer-motion";
import { Video, Users, TrendingUp, ArrowRight } from "lucide-react";

export default function StudioPage() {
  const creators = useStore((s) => s.creators);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">AI Video Studio</h1>
        <p className="mt-1 text-sm text-zinc-500">Select a creator to begin configuring an AI-generated video ad.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {creators.map((creator, i) => (
          <motion.div key={creator.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link href={`/brand/studio/${creator.id}`} className="group block rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5 transition-all hover:border-zinc-700/60 hover:bg-zinc-900/70">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-300">{creator.avatar}</div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-100">{creator.name}</h3>
                  <p className="text-xs text-zinc-500">{creator.niche}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-zinc-600" /><span className="text-xs text-zinc-400">{creator.followers}</span></div>
                <div className="flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-zinc-600" /><span className="text-xs text-zinc-400">{creator.engagement}</span></div>
              </div>
              <div className="flex items-center justify-between border-t border-zinc-800/40 pt-3">
                <span className="text-sm font-semibold text-accent">${creator.licenseFee.toLocaleString()}<span className="text-xs font-normal text-zinc-500">/ad</span></span>
                <span className="flex items-center gap-1 text-xs text-zinc-500 group-hover:text-accent transition-colors">
                  Configure <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
