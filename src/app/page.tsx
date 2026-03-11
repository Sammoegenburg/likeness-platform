"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Hexagon, Shield, Zap, DollarSign } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mb-8 flex items-center justify-center gap-2">
          <Hexagon className="h-8 w-8 text-accent" strokeWidth={2} />
          <span className="text-2xl font-semibold tracking-tight">Echelon</span>
        </div>

        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
          License creator likeness.
          <br />
          <span className="text-zinc-500">Generate compliant AI ads.</span>
        </h1>

        <p className="mt-5 text-base leading-relaxed text-zinc-400">
          An enterprise licensing layer between brands and creators. Transparent
          rights management, automated compliance scanning, and AI-generated
          video — all with full creator control.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/brand"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Enter as Brand
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/creator/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          >
            Enter as Creator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mx-auto mt-24 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-800/30 sm:grid-cols-3"
      >
        {[
          {
            icon: Shield,
            title: "Creator Control",
            desc: "Every script reviewed and approved before generation begins.",
          },
          {
            icon: Zap,
            title: "Instant Generation",
            desc: "AI-rendered video ads with full lip sync and voice synthesis.",
          },
          {
            icon: DollarSign,
            title: "Passive Revenue",
            desc: "Creators earn flat licensing fees without shooting a single frame.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-zinc-950 p-6"
          >
            <item.icon className="mb-3 h-5 w-5 text-zinc-500" />
            <h3 className="text-sm font-medium text-zinc-200">{item.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
              {item.desc}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
