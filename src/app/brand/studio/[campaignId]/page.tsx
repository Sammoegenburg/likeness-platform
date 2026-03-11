"use client";

import { useStore } from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Monitor, Smartphone, Square, Sliders, Mic, Eye, Layers, Check } from "lucide-react";
import type { CampaignExpanded } from "@/store";

const FORMAT_OPTIONS = [
  { value: "vertical-9x16", label: "9:16 Vertical", desc: "TikTok, Reels, Shorts", icon: Smartphone },
  { value: "horizontal-16x9", label: "16:9 Horizontal", desc: "YouTube, Display Ads", icon: Monitor },
  { value: "square-1x1", label: "1:1 Square", desc: "Instagram Feed, Carousel", icon: Square },
];

const STYLE_PRESETS = [
  { value: "natural", label: "Natural", desc: "Authentic creator feel, minimal editing" },
  { value: "cinematic", label: "Cinematic", desc: "Film-grade color, dramatic lighting" },
  { value: "studio", label: "Studio", desc: "Clean, professional, brand-safe" },
  { value: "casual", label: "Casual", desc: "Handheld vlog-style, relatable" },
  { value: "high-energy", label: "High Energy", desc: "Fast cuts, dynamic movement" },
  { value: "minimal", label: "Minimal", desc: "Simple, product-focused, clean" },
];

export default function StudioSessionPage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const router = useRouter();
  const creator = useStore((s) => s.creators.find((c) => c.id === campaignId));
  const addCampaign = useStore((s) => s.addCampaign);

  const [campaignName, setCampaignName] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [script, setScript] = useState("");
  const [videoFormat, setVideoFormat] = useState<CampaignExpanded["videoFormat"]>("vertical-9x16");
  const [stylePreset, setStylePreset] = useState<CampaignExpanded["stylePreset"]>("natural");
  const [variants, setVariants] = useState(1);
  const [voicePace, setVoicePace] = useState<number | null>(null);
  const [voiceEmotion, setVoiceEmotion] = useState<CampaignExpanded["voiceEmotionOverride"]>(null);
  const [backgroundOverride, setBackgroundOverride] = useState("");
  const [wardrobeOverride, setWardrobeOverride] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const estimatedCost = useMemo(() => {
    if (!creator) return 0;
    const base = creator.licenseFee;
    const wordCount = script.trim().split(/\s+/).filter(Boolean).length;
    const lengthMul = wordCount > 100 ? 1.5 : wordCount > 50 ? 1.2 : 1;
    const variantMul = variants > 1 ? 1 + (variants - 1) * 0.4 : 1;
    return Math.round(base * lengthMul * variantMul);
  }, [creator, script, variants]);

  if (!creator) return <div className="py-20 text-center text-zinc-500">Creator not found.</div>;

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10"><Check className="h-7 w-7 text-emerald-400" /></div>
        <h2 className="mt-5 text-lg font-semibold">Campaign Submitted</h2>
        <p className="mt-2 text-sm text-zinc-500">{creator.name} will review your script and studio configuration.</p>
        <div className="mt-8 flex gap-3">
          <button onClick={() => router.push("/brand/campaigns")} className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800">View Campaigns</button>
          <button onClick={() => router.push("/creator/dashboard")} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover">View as Creator</button>
        </div>
      </motion.div>
    );
  }

  const handleSubmit = () => {
    const campaign: CampaignExpanded = {
      id: `campaign-${Date.now()}`,
      creatorId: creator.id,
      brandName: "Demo Brand Co.",
      campaignName,
      productUrl,
      targetAudience,
      script,
      status: "pending",
      estimatedCost,
      createdAt: new Date().toISOString(),
      videoFormat,
      stylePreset,
      variants,
      voicePaceOverride: voicePace,
      voiceEmotionOverride: voiceEmotion,
      backgroundOverride: backgroundOverride || null,
      wardrobeOverride: wardrobeOverride || null,
      lightingOverride: null,
      assets: [],
      totalSpend: estimatedCost,
      paymentStatus: "unpaid",
    };
    addCampaign(campaign);
    setSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button onClick={() => router.back()} className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300"><ArrowLeft className="h-4 w-4" /> Back</button>

      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">AI Video Studio</h1>
        <p className="mt-1 text-sm text-zinc-500">Configure a video ad with {creator.name}&apos;s licensed likeness.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Campaign Info */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <h3 className="mb-4 text-sm font-semibold text-zinc-300">Campaign Details</h3>
            <div className="space-y-4">
              <div><label className="mb-1.5 block text-xs font-medium text-zinc-400">Campaign Name</label>
                <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} placeholder="e.g. Spring Product Launch" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-accent/50" />
              </div>
              <div><label className="mb-1.5 block text-xs font-medium text-zinc-400">Product URL</label>
                <input type="url" value={productUrl} onChange={(e) => setProductUrl(e.target.value)} placeholder="https://yourbrand.com/product" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-accent/50" />
              </div>
              <div><label className="mb-1.5 block text-xs font-medium text-zinc-400">Target Audience</label>
                <textarea value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} rows={2} placeholder="Describe your target audience..." className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-accent/50" />
              </div>
            </div>
          </div>

          {/* Video Format */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-4"><Monitor className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Video Format</h3></div>
            <div className="grid grid-cols-3 gap-3">
              {FORMAT_OPTIONS.map((f) => (
                <button key={f.value} onClick={() => setVideoFormat(f.value as CampaignExpanded["videoFormat"])}
                  className={`rounded-lg border p-4 text-center transition-all ${videoFormat === f.value ? "border-accent/50 bg-accent/5" : "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"}`}>
                  <f.icon className={`mx-auto mb-2 h-6 w-6 ${videoFormat === f.value ? "text-accent" : "text-zinc-500"}`} />
                  <p className="text-xs font-medium text-zinc-200">{f.label}</p>
                  <p className="mt-0.5 text-[10px] text-zinc-500">{f.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Style Preset */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-4"><Sliders className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Style Preset</h3></div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {STYLE_PRESETS.map((s) => (
                <button key={s.value} onClick={() => setStylePreset(s.value as CampaignExpanded["stylePreset"])}
                  className={`rounded-lg border p-3 text-left transition-all ${stylePreset === s.value ? "border-accent/50 bg-accent/5" : "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"}`}>
                  <p className="text-xs font-medium text-zinc-200">{s.label}</p>
                  <p className="mt-0.5 text-[10px] text-zinc-600">{s.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Voice & Visual Controls */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-4"><Mic className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Voice Controls</h3></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Pace Override (WPM)</label>
                <div className="flex items-center gap-2">
                  <input type="range" min={100} max={220} value={voicePace ?? 150} onChange={(e) => setVoicePace(Number(e.target.value))}
                    className="flex-1 accent-accent" />
                  <span className="text-xs font-mono text-zinc-400 w-10 text-right">{voicePace ?? "Auto"}</span>
                </div>
                <p className="mt-1 text-[11px] text-zinc-600">Leave at default to use creator&apos;s natural pace.</p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Emotion</label>
                <div className="flex flex-wrap gap-2">
                  {(["neutral", "enthusiastic", "calm", "urgent"] as const).map((e) => (
                    <button key={e} onClick={() => setVoiceEmotion(voiceEmotion === e ? null : e)}
                      className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all ${voiceEmotion === e ? "border-accent/50 bg-accent/10 text-accent" : "border-zinc-800 text-zinc-500 hover:text-zinc-300"}`}>
                      {e.charAt(0).toUpperCase() + e.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-4"><Eye className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">Visual Overrides</h3></div>
            <div className="space-y-4">
              <div><label className="mb-1.5 block text-xs font-medium text-zinc-400">Background Override</label>
                <input type="text" value={backgroundOverride} onChange={(e) => setBackgroundOverride(e.target.value)} placeholder="Leave blank for creator's default setting" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-accent/50" />
              </div>
              <div><label className="mb-1.5 block text-xs font-medium text-zinc-400">Wardrobe Override</label>
                <input type="text" value={wardrobeOverride} onChange={(e) => setWardrobeOverride(e.target.value)} placeholder="Leave blank for creator's typical wardrobe" className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-accent/50" />
              </div>
            </div>
          </div>

          {/* A/B Variants */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-4"><Layers className="h-4 w-4 text-zinc-500" /><h3 className="text-sm font-semibold text-zinc-300">A/B Variants</h3></div>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4].map((n) => (
                <button key={n} onClick={() => setVariants(n)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-all ${variants === n ? "border-accent/50 bg-accent/10 text-accent" : "border-zinc-800 text-zinc-500 hover:text-zinc-300"}`}>
                  {n}
                </button>
              ))}
              <span className="text-xs text-zinc-500 ml-2">variants · {variants > 1 ? `+${((variants - 1) * 40)}% cost` : "No additional cost"}</span>
            </div>
          </div>

          {/* Script */}
          <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <h3 className="mb-4 text-sm font-semibold text-zinc-300">Ad Script</h3>
            <textarea value={script} onChange={(e) => setScript(e.target.value)} rows={8}
              placeholder={`Write the ad copy that ${creator.name} will deliver...`}
              className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder-zinc-600 outline-none focus:border-accent/50" />
            {script && <p className="mt-2 text-[11px] text-zinc-600">{script.trim().split(/\s+/).filter(Boolean).length} words</p>}
          </div>
        </div>

        {/* Right Sidebar: Summary */}
        <div className="space-y-4">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
              <h3 className="mb-3 text-sm font-semibold text-zinc-300">Creator</h3>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-300">{creator.avatar}</div>
                <div><p className="text-sm font-medium text-zinc-200">{creator.name}</p><p className="text-xs text-zinc-500">{creator.niche}</p></div>
              </div>
            </div>

            <div className="rounded-xl border border-accent/20 bg-accent/5 p-5">
              <p className="text-xs font-medium text-accent mb-2">Estimated Cost</p>
              <p className="text-3xl font-semibold">${estimatedCost.toLocaleString()}</p>
              <div className="mt-3 space-y-1 text-[11px] text-zinc-500">
                <p>Base fee: ${creator.licenseFee.toLocaleString()}</p>
                {variants > 1 && <p>{variants} variants (+{(variants - 1) * 40}%)</p>}
                {script.trim().split(/\s+/).filter(Boolean).length > 100 && <p>Extended script (1.5×)</p>}
              </div>
            </div>

            <button onClick={handleSubmit} disabled={!campaignName || !script}
              className="w-full rounded-lg bg-accent px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed">
              Submit for Creator Approval
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
