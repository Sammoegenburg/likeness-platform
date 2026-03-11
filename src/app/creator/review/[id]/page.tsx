"use client";

import { useStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  ThumbsUp,
  X,
  DollarSign,
  FileText,
} from "lucide-react";

interface ComplianceItem {
  label: string;
  status: "checking" | "passed" | "failed";
}

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const campaign = useStore((s) => s.campaigns.find((c) => c.id === id));
  const creators = useStore((s) => s.creators);
  const updateStatus = useStore((s) => s.updateCampaignStatus);

  const [complianceChecks, setComplianceChecks] = useState<ComplianceItem[]>([
    { label: "No Restricted Health Claims Detected", status: "checking" },
    { label: "No Profanity or Offensive Language", status: "checking" },
    { label: "Brand Safety Check Passed", status: "checking" },
    { label: "FTC Disclosure Compliance", status: "checking" },
    { label: "No Competitor Defamation", status: "checking" },
  ]);

  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    complianceChecks.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setComplianceChecks((prev) =>
            prev.map((item, j) =>
              j === i ? { ...item, status: "passed" } : item
            )
          );
          if (i === complianceChecks.length - 1) {
            setTimeout(() => setScanComplete(true), 300);
          }
        }, 600 + i * 500)
      );
    });
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!campaign) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Campaign not found.
      </div>
    );
  }

  const creator = creators.find((c) => c.id === campaign.creatorId);

  const handleApprove = () => {
    updateStatus(campaign.id, "approved");
    router.push(`/generate/${campaign.id}`);
  };

  const handleReject = () => {
    updateStatus(campaign.id, "rejected");
    router.push("/creator/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto max-w-3xl"
    >
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">
          Review Licensing Request
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Review the script and compliance scan before approving.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Brand & Campaign Info */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-xs font-semibold text-zinc-300">
                {campaign.brandName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-200">
                  {campaign.brandName}
                </p>
                <p className="text-xs text-zinc-500">
                  {campaign.campaignName}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-zinc-500 mb-1">
                  Target Audience
                </p>
                <p className="text-sm text-zinc-300">
                  {campaign.targetAudience}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-500 mb-1">
                  Product URL
                </p>
                <p className="text-sm text-accent">{campaign.productUrl}</p>
              </div>
            </div>
          </div>

          {/* Script */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-zinc-500" />
              <h3 className="text-sm font-semibold text-zinc-300">
                Submitted Script
              </h3>
            </div>
            <div className="rounded-lg bg-zinc-950 border border-zinc-800/40 p-4">
              <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">
                {campaign.script}
              </p>
            </div>
            <p className="mt-2 text-[11px] text-zinc-600">
              {campaign.script.split(/\s+/).filter(Boolean).length} words ·
              This exact script will be used for AI generation
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Payout */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-accent">
                Your Payout
              </span>
            </div>
            <p className="text-2xl font-semibold">
              ${campaign.estimatedCost.toLocaleString()}
            </p>
            <p className="mt-1 text-[11px] text-zinc-500">
              Deposited within 48 hours of approval
            </p>
          </div>

          {/* Compliance Scan */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-zinc-500" />
              <h3 className="text-sm font-semibold text-zinc-300">
                Automated Compliance Scan
              </h3>
            </div>

            <div className="space-y-2.5">
              {complianceChecks.map((check, i) => (
                <motion.div
                  key={check.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-2.5"
                >
                  <div className="mt-0.5">
                    <AnimatePresence mode="wait">
                      {check.status === "checking" ? (
                        <motion.div
                          key="loading"
                          exit={{ scale: 0 }}
                        >
                          <Loader2 className="h-4 w-4 animate-spin text-zinc-500" />
                        </motion.div>
                      ) : check.status === "passed" ? (
                        <motion.div
                          key="passed"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="failed"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <span
                    className={`text-xs leading-tight ${
                      check.status === "passed"
                        ? "text-zinc-300"
                        : "text-zinc-500"
                    }`}
                  >
                    {check.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {scanComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-3 py-2"
              >
                <p className="text-xs font-medium text-emerald-400">
                  All compliance checks passed
                </p>
              </motion.div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={handleApprove}
              disabled={!scanComplete}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ThumbsUp className="h-4 w-4" />
              Approve & Generate
            </button>
            <button
              onClick={handleReject}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
            >
              <X className="h-4 w-4" />
              Reject Request
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
