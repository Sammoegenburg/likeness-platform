"use client";

import { useStore } from "@/store";
import Link from "next/link";
import { motion } from "framer-motion";
import { CompletenessRing } from "@/components/ui/completeness-ring";
import { Shield, Mic, Eye, Hand, Brain, Edit, Plus } from "lucide-react";

export default function ProfilePage() {
  const profiles = useStore((s) => s.creatorProfiles);
  const profile = profiles[0]; // Demo: show Maya's profile

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-lg font-semibold text-zinc-200">No profile set up yet</h2>
        <p className="mt-2 text-sm text-zinc-500">Complete the onboarding to create your likeness profile.</p>
        <Link href="/creator/onboarding" className="mt-6 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover">
          <Plus className="mr-2 inline h-4 w-4" /> Start Onboarding
        </Link>
      </div>
    );
  }

  const sections = [
    {
      title: "Voice & Speech",
      icon: Mic,
      items: [
        ["Pitch", profile.voice.pitchRange],
        ["Tone", profile.voice.toneQuality.join(", ")],
        ["Pace", `${profile.voice.speakingPace} (${profile.voice.averageWPM} WPM)`],
        ["Cadence", profile.voice.cadencePattern],
        ["Accent", `${profile.voice.accentRegion} (${profile.voice.accentIntensity})`],
        ["Filler Words", profile.voice.fillerWords.join(", ") || "None"],
        ["Greeting", profile.voice.greetingStyle],
        ["Sign-offs", profile.voice.signOffPhrases.join(" · ")],
        ["Signature Expressions", profile.voice.signatureExpressions.join(" · ")],
        ["Transitions", profile.voice.transitionPhrases.join(" · ")],
        ["Humor Style", profile.voice.humorStyle.join(", ")],
        ["Humor Freq", profile.voice.humorFrequency],
        ["Laugh Style", profile.voice.laughStyle],
        ["Storytelling", profile.voice.storytellingApproach],
      ],
    },
    {
      title: "Visual Identity",
      icon: Eye,
      items: [
        ["Skin Tone", profile.visual.skinTone],
        ["Hair", `${profile.visual.hairColor} — ${profile.visual.hairStyle}`],
        ["Eyes", profile.visual.eyeColor],
        ["Build", `${profile.visual.buildType} — ${profile.visual.heightApprox}`],
        ["Features", profile.visual.distinguishingFeatures.join(", ")],
        ["Wardrobe", profile.visual.typicalWardrobe.join(", ")],
        ["Colors", profile.visual.wardrobeColorPalette.join(", ")],
        ["Accessories", profile.visual.accessorySignatures.join(", ")],
        ["Makeup", `${profile.visual.makeupStyle} — ${profile.visual.makeupNotes}`],
        ["Background", profile.visual.typicalBackgroundSetting],
        ["Lighting", `${profile.visual.lightingPreference} — ${profile.visual.lightingNotes}`],
        ["Camera", `${profile.visual.preferredCameraAngle}, ${profile.visual.typicalFraming}, ${profile.visual.cameraDistance}`],
        ["Lens", profile.visual.lensStyle],
      ],
    },
    {
      title: "Physical Mannerisms",
      icon: Hand,
      items: [
        ["Gestures", `${profile.mannerisms.gestureFrequency} (${profile.mannerisms.dominantHand} hand)`],
        ["Signature Gestures", profile.mannerisms.signatureGestures.join(", ")],
        ["Resting Position", profile.mannerisms.handRestingPosition],
        ["Expression", profile.mannerisms.defaultExpression],
        ["Eyebrows", profile.mannerisms.eyebrowExpressiveness],
        ["Smile", `${profile.mannerisms.smileType}, ${profile.mannerisms.smileFrequency}`],
        ["Eye Contact", profile.mannerisms.eyeContactPattern],
        ["Head Movement", profile.mannerisms.headMovementStyle],
        ["Posture", profile.mannerisms.posture],
        ["Product Handling", profile.mannerisms.productHoldingStyle],
        ["Props", profile.mannerisms.propUsage.join(", ")],
      ],
    },
    {
      title: "Content Personality",
      icon: Brain,
      items: [
        ["Energy", profile.personality.energyLevel],
        ["Energy Arc", profile.personality.openingEnergyVsClosing],
        ["Address Style", profile.personality.audienceAddressStyle],
        ["CTA", `${profile.personality.callToActionStyle} — ${profile.personality.ctaPlacement}`],
        ["Engagement", profile.personality.viewerEngagementTactics.join(", ")],
        ["Structure", profile.personality.typicalVideoStructure],
        ["Hook", profile.personality.hookStyle],
        ["Length", profile.personality.averageContentLength],
        ["Product Intro", profile.personality.productIntroStyle],
        ["Disclosure", profile.personality.sponsorshipDisclosureStyle],
        ["Authenticity", profile.personality.authenticitySignals.join(", ")],
        ["Catchphrases", profile.personality.catchphrases.join(", ")],
        ["Verbal Tics", profile.personality.verbalTics.join(", ")],
        ["Vocabulary", profile.personality.vocabularyLevel],
        ["Profanity", profile.personality.profanityLevel],
        ["Comfortable Topics", profile.personality.comfortableTopics.join(", ")],
        ["Off-Limit Topics", profile.personality.offLimitTopics.join(", ")],
      ],
    },
    {
      title: "Brand Guidelines",
      icon: Shield,
      items: [
        ["Accepted Categories", profile.brandGuidelines.acceptedProductCategories.join(", ")],
        ["Rejected Categories", profile.brandGuidelines.rejectedProductCategories.join(", ")],
        ["Base Fee", `$${profile.brandGuidelines.baseLicenseFee.toLocaleString()}`],
        ["Max Licenses", String(profile.brandGuidelines.maxConcurrentLicenses)],
        ["Exclusivity Period", `${profile.brandGuidelines.exclusivityPeriodDays} days`],
        ["Channels", profile.brandGuidelines.allowedUsageChannels.join(", ")],
        ["Geo", profile.brandGuidelines.geographicRestrictions.join(", ")],
        ["Tone Boundaries", profile.brandGuidelines.toneBoundaries],
        ["Must Avoid", profile.brandGuidelines.messagingMustAvoid.join(", ")],
      ],
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Likeness Profile</h1>
          <p className="mt-1 text-sm text-zinc-500">Your AI training data — used to generate authentic video content.</p>
        </div>
        <div className="flex items-center gap-4">
          <CompletenessRing percent={profile.profileCompleteness} size={52} strokeWidth={4} />
          <Link href="/creator/onboarding" className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200">
            <Edit className="h-3.5 w-3.5" /> Edit Profile
          </Link>
        </div>
      </div>

      {/* Basic Info Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-6 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800 text-lg font-semibold text-zinc-200">{profile.avatar}</div>
          <div>
            <h2 className="text-base font-semibold">{profile.name}</h2>
            <p className="text-sm text-zinc-500">{profile.handle} · {profile.niche}</p>
            <p className="mt-1 text-xs text-zinc-500">{profile.bio}</p>
          </div>
        </div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section, si) => (
          <motion.div key={section.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.05 }}
            className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="h-4 w-4 text-zinc-500" />
              <h3 className="text-sm font-semibold text-zinc-300">{section.title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {section.items.map(([label, value]) => (
                <div key={label} className="text-xs">
                  <span className="text-zinc-600">{label}</span>
                  <p className="mt-0.5 text-zinc-300 leading-relaxed">{value || "—"}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
