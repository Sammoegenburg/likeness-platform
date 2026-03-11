"use client";

import { useStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, FileText, Target, Pen } from "lucide-react";

const STEPS = ["Details", "Audience", "Script", "Review"];

export default function CampaignBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const creator = useStore((s) => s.creators.find((c) => c.id === id));
  const addCampaign = useStore((s) => s.addCampaign);

  const [step, setStep] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [script, setScript] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const estimatedCost = useMemo(() => {
    if (!creator) return 0;
    const basePrice = creator.licenseFee;
    const wordCount = script.trim().split(/\s+/).filter(Boolean).length;
    const lengthMultiplier = wordCount > 100 ? 1.5 : wordCount > 50 ? 1.2 : 1;
    return Math.round(basePrice * lengthMultiplier);
  }, [creator, script]);

  if (!creator) {
    return (
      <div className="py-20 text-center text-zinc-500">Creator not found.</div>
    );
  }

  const canProceed = () => {
    if (step === 0) return campaignName.length > 0 && productUrl.length > 0;
    if (step === 1) return targetAudience.length > 0;
    if (step === 2) return script.length > 0;
    return true;
  };

  const handleSubmit = () => {
    const campaign = {
      id: `campaign-${Date.now()}`,
      creatorId: creator.id,
      brandName: "Demo Brand Co.",
      campaignName,
      productUrl,
      targetAudience,
      script,
      status: "pending" as const,
      estimatedCost,
      createdAt: new Date().toISOString(),
    };
    addCampaign(campaign);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
          <Check className="h-7 w-7 text-emerald-400" />
        </div>
        <h2 className="mt-5 text-lg font-semibold">
          Submitted for Creator Approval
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          {creator.name} will review your campaign and script. You&apos;ll be
          notified once they respond.
        </p>
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => router.push("/brand")}
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition-colors hover:bg-zinc-800"
          >
            Back to Marketplace
          </button>
          <button
            onClick={() => router.push("/creator/dashboard")}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            View as Creator
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-2xl"
    >
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">
          Campaign Builder
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Licensing {creator.name}&apos;s likeness for an AI-generated ad.
        </p>
      </div>

      {/* Steps */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                i === step
                  ? "bg-zinc-800 text-zinc-100"
                  : i < step
                  ? "text-zinc-400 hover:text-zinc-300"
                  : "text-zinc-600"
              }`}
            >
              {i < step ? (
                <Check className="h-3 w-3 text-emerald-400" />
              ) : (
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px]">
                  {i + 1}
                </span>
              )}
              {s}
            </button>
            {i < STEPS.length - 1 && (
              <div className="h-px w-6 bg-zinc-800" />
            )}
          </div>
        ))}
      </div>

      {/* Form Steps */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-zinc-300">
                <FileText className="h-4 w-4 text-zinc-500" />
                Campaign Details
              </div>
              <p className="mb-5 text-xs text-zinc-600">
                Name your campaign and provide the product landing page.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    placeholder="e.g. Q1 Product Launch — Skincare Serum"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                    Product URL
                  </label>
                  <input
                    type="url"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="https://yourbrand.com/product"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent/50"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-zinc-300">
                <Target className="h-4 w-4 text-zinc-500" />
                Target Audience
              </div>
              <p className="mb-5 text-xs text-zinc-600">
                Describe who this ad is designed to reach.
              </p>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Audience Description
                </label>
                <textarea
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  rows={4}
                  placeholder="e.g. Health-conscious women aged 28–45 who follow skincare routines and shop for clean beauty products online"
                  className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent/50"
                />
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-1 flex items-center gap-2 text-sm font-medium text-zinc-300">
                <Pen className="h-4 w-4 text-zinc-500" />
                Ad Script
              </div>
              <p className="mb-5 text-xs text-zinc-600">
                Write the script for the AI-generated ad. This exact script will
                be shown to {creator.name} for approval.
              </p>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Script
                </label>
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  rows={8}
                  placeholder={`Write the ad copy that ${creator.name} will deliver in the generated video...`}
                  className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent/50"
                />
              </div>

              {script.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 rounded-lg bg-zinc-800/40 p-4"
                >
                  <p className="text-xs font-medium text-zinc-400">
                    Cost Estimate
                  </p>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-zinc-100">
                      ${estimatedCost.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {script.trim().split(/\s+/).filter(Boolean).length} words
                      ·{" "}
                      {script.trim().split(/\s+/).filter(Boolean).length > 100
                        ? "Extended"
                        : script.trim().split(/\s+/).filter(Boolean).length > 50
                        ? "Standard"
                        : "Short"}{" "}
                      script
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-600">
                    Base fee: ${creator.licenseFee.toLocaleString()} · Scripts
                    over 100 words incur a 1.5× surcharge.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-5 text-sm font-medium text-zinc-300">
                Review & Submit
              </div>

              <div className="space-y-4 text-sm">
                <div className="rounded-lg bg-zinc-800/30 p-4">
                  <p className="text-xs font-medium text-zinc-500">Creator</p>
                  <p className="mt-1 text-zinc-200">{creator.name}</p>
                </div>
                <div className="rounded-lg bg-zinc-800/30 p-4">
                  <p className="text-xs font-medium text-zinc-500">Campaign</p>
                  <p className="mt-1 text-zinc-200">{campaignName}</p>
                </div>
                <div className="rounded-lg bg-zinc-800/30 p-4">
                  <p className="text-xs font-medium text-zinc-500">Product URL</p>
                  <p className="mt-1 text-zinc-200">{productUrl}</p>
                </div>
                <div className="rounded-lg bg-zinc-800/30 p-4">
                  <p className="text-xs font-medium text-zinc-500">
                    Target Audience
                  </p>
                  <p className="mt-1 text-zinc-200">{targetAudience}</p>
                </div>
                <div className="rounded-lg bg-zinc-800/30 p-4">
                  <p className="text-xs font-medium text-zinc-500">Script</p>
                  <p className="mt-1 whitespace-pre-wrap text-zinc-200">
                    {script}
                  </p>
                </div>
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <p className="text-xs font-medium text-accent">
                    Total Licensing Fee
                  </p>
                  <p className="mt-1 text-xl font-semibold text-zinc-100">
                    ${estimatedCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:text-zinc-200 disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-800"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Submit for Creator Approval
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
