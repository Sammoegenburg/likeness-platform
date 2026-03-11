"use client";

import { useStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Download,
  CheckCircle2,
  Hexagon,
  Volume2,
  Maximize2,
} from "lucide-react";

const GENERATION_STEPS = [
  { label: "Initializing Generation Pipeline", duration: 1200 },
  { label: "Rendering Digital Twin Model", duration: 2000 },
  { label: "Synthesizing Voice Audio", duration: 1800 },
  { label: "Applying Lip Sync Calibration", duration: 1500 },
  { label: "Compositing Final Video", duration: 1400 },
  { label: "Running Quality Assurance", duration: 800 },
];

export default function GeneratePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const campaign = useStore((s) => s.campaigns.find((c) => c.id === id));
  const creators = useStore((s) => s.creators);
  const updateStatus = useStore((s) => s.updateCampaignStatus);

  const [currentStep, setCurrentStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startGeneration = useCallback(() => {
    if (!campaign) return;
    setHasStarted(true);
    updateStatus(campaign.id, "generating");

    let stepIndex = 0;
    const totalDuration = GENERATION_STEPS.reduce(
      (sum, s) => sum + s.duration,
      0
    );
    let elapsed = 0;

    const runStep = () => {
      if (stepIndex >= GENERATION_STEPS.length) {
        setProgress(100);
        setIsComplete(true);
        updateStatus(campaign.id, "completed");
        return;
      }

      setCurrentStep(stepIndex);
      const stepDuration = GENERATION_STEPS[stepIndex].duration;

      const progressInterval = setInterval(() => {
        elapsed += 50;
        setProgress(Math.min((elapsed / totalDuration) * 100, 99));
      }, 50);

      setTimeout(() => {
        clearInterval(progressInterval);
        stepIndex++;
        runStep();
      }, stepDuration);
    };

    runStep();
  }, [campaign, updateStatus]);

  useEffect(() => {
    if (campaign?.status === "completed") {
      setIsComplete(true);
      setProgress(100);
      setCurrentStep(GENERATION_STEPS.length - 1);
      setHasStarted(true);
    }
  }, [campaign?.status]);

  if (!campaign) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Campaign not found.
      </div>
    );
  }

  const creator = creators.find((c) => c.id === campaign.creatorId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-3xl"
    >
      <button
        onClick={() => router.push("/creator/dashboard")}
        className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">
          {isComplete ? "Generated Asset" : "Video Generation"}
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          {campaign.campaignName} · {creator?.name}
        </p>
      </div>

      {!hasStarted && campaign.status === "approved" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
            <Hexagon className="h-7 w-7 text-accent" />
          </div>
          <h2 className="text-base font-semibold text-zinc-200">
            Ready to Generate
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            The creator has approved this script. Begin AI video generation
            using {creator?.name}&apos;s licensed digital twin.
          </p>
          <button
            onClick={startGeneration}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <Play className="h-4 w-4" />
            Begin Generation
          </button>
        </motion.div>
      )}

      {hasStarted && !isComplete && (
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-400">
                Generating...
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <motion.div
                className="h-full rounded-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {GENERATION_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: i <= currentStep ? 1 : 0.4,
                }}
                className="flex items-center gap-3"
              >
                <div className="flex h-6 w-6 items-center justify-center">
                  {i < currentStep ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </motion.div>
                  ) : i === currentStep ? (
                    <div className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-zinc-800" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    i <= currentStep ? "text-zinc-300" : "text-zinc-600"
                  }`}
                >
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-4"
        >
          {/* Video Player */}
          <div className="overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900">
            <div className="relative aspect-video bg-zinc-950 flex items-center justify-center">
              {/* Simulated video content */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900" />
              <div className="relative flex flex-col items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-800/80 backdrop-blur">
                  <Play className="h-8 w-8 text-zinc-300 ml-1" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-zinc-300">
                    AI-Generated Ad Preview
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">
                    {creator?.name} · {campaign.campaignName}
                  </p>
                </div>
              </div>

              {/* Video controls bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
                <div className="mb-2 h-1 w-full rounded-full bg-zinc-700">
                  <div className="h-full w-0 rounded-full bg-accent" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Play className="h-4 w-4 text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-500">
                      0:00 / 0:32
                    </span>
                    <Volume2 className="h-4 w-4 text-zinc-400" />
                  </div>
                  <Maximize2 className="h-4 w-4 text-zinc-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Asset Info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
              <p className="text-xs font-medium text-zinc-500 mb-2">
                Asset Details
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Format</span>
                  <span className="text-zinc-300">MP4 (H.264)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Resolution</span>
                  <span className="text-zinc-300">1080 × 1920</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Duration</span>
                  <span className="text-zinc-300">0:32</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">File Size</span>
                  <span className="text-zinc-300">24.8 MB</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
              <p className="text-xs font-medium text-zinc-500 mb-2">
                License
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Creator</span>
                  <span className="text-zinc-300">{creator?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Usage Period</span>
                  <span className="text-zinc-300">90 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Channels</span>
                  <span className="text-zinc-300">Digital Ads</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">License Fee</span>
                  <span className="font-medium text-accent">
                    ${campaign.estimatedCost.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
              <Download className="h-4 w-4" />
              Download Asset
            </button>
            <button
              onClick={() => router.push("/creator/dashboard")}
              className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-800"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
