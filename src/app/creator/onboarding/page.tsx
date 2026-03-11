"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, DEFAULT_VOICE, DEFAULT_VISUAL, DEFAULT_MANNERISMS, DEFAULT_PERSONALITY, DEFAULT_BRAND_GUIDELINES } from "@/store";
import type { VoiceProfile, VisualIdentity, PhysicalMannerisms, ContentPersonality, BrandGuidelines } from "@/store";
import { TagInput } from "@/components/ui/tag-input";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  User,
  Mic,
  Eye,
  Hand,
  Brain,
  Shield,
  Upload,
  Sparkles,
} from "lucide-react";

const STEPS = [
  { label: "Basic Identity", icon: User },
  { label: "Voice & Speech", icon: Mic },
  { label: "Visual Identity", icon: Eye },
  { label: "Physical Mannerisms", icon: Hand },
  { label: "Content Personality", icon: Brain },
  { label: "Brand Guidelines", icon: Shield },
  { label: "Reference Material", icon: Upload },
  { label: "Review & Submit", icon: Sparkles },
];

// Helper components
function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="mb-3 text-sm font-semibold text-zinc-300 border-b border-zinc-800/40 pb-2">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormField({ label, helpText, children }: { label: string; helpText?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-400">{label}</label>
      {children}
      {helpText && <p className="mt-1 text-[11px] text-zinc-600">{helpText}</p>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent/50"
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm leading-relaxed text-zinc-100 placeholder-zinc-600 outline-none transition-colors focus:border-accent/50"
    />
  );
}

function SelectInput({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-accent/50"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function OptionGrid({ value, onChange, options, columns = 3 }: { value: string; onChange: (v: string) => void; options: { value: string; label: string; desc?: string }[]; columns?: number }) {
  return (
    <div className={`grid gap-2 ${columns === 4 ? "grid-cols-2 sm:grid-cols-4" : columns === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"}`}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
            value === o.value
              ? "border-accent/50 bg-accent/5 text-zinc-100"
              : "border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
          }`}
        >
          <p className="text-xs font-medium">{o.label}</p>
          {o.desc && <p className="mt-0.5 text-[11px] text-zinc-600">{o.desc}</p>}
        </button>
      ))}
    </div>
  );
}

function MultiOptionGrid({ value, onChange, options }: { value: string[]; onChange: (v: string[]) => void; options: { value: string; label: string }[] }) {
  const toggle = (v: string) => {
    if (value.includes(v)) onChange(value.filter((x) => x !== v));
    else onChange([...value, v]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => toggle(o.value)}
          className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-all ${
            value.includes(o.value)
              ? "border-accent/50 bg-accent/10 text-accent"
              : "border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function NumberInput({ value, onChange, min, max, step = 1, suffix }: { value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; suffix?: string }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="w-24 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition-colors focus:border-accent/50"
      />
      {suffix && <span className="text-xs text-zinc-500">{suffix}</span>}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState(0);

  // Step 0: Basic Identity
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [bio, setBio] = useState("");
  const [niche, setNiche] = useState("");
  const [secondaryNiches, setSecondaryNiches] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [followerCount, setFollowerCount] = useState("");

  // Step 1: Voice
  const [voice, setVoice] = useState<VoiceProfile>({ ...DEFAULT_VOICE });

  // Step 2: Visual
  const [visual, setVisual] = useState<VisualIdentity>({ ...DEFAULT_VISUAL });

  // Step 3: Mannerisms
  const [mannerisms, setMannerisms] = useState<PhysicalMannerisms>({ ...DEFAULT_MANNERISMS });

  // Step 4: Content Personality
  const [personality, setPersonality] = useState<ContentPersonality>({ ...DEFAULT_PERSONALITY });

  // Step 5: Brand Guidelines
  const [guidelines, setGuidelines] = useState<BrandGuidelines>({ ...DEFAULT_BRAND_GUIDELINES });

  // Step 6: References
  const [sampleVideoUrls, setSampleVideoUrls] = useState<string[]>([]);
  const [sampleAudioUrls, setSampleAudioUrls] = useState<string[]>([]);
  const [referenceNotes, setReferenceNotes] = useState("");

  const handleComplete = () => {
    completeOnboarding();
    router.push("/creator/dashboard");
  };

  const updateVoice = (patch: Partial<VoiceProfile>) => setVoice((v) => ({ ...v, ...patch }));
  const updateVisual = (patch: Partial<VisualIdentity>) => setVisual((v) => ({ ...v, ...patch }));
  const updateMannerisms = (patch: Partial<PhysicalMannerisms>) => setMannerisms((v) => ({ ...v, ...patch }));
  const updatePersonality = (patch: Partial<ContentPersonality>) => setPersonality((v) => ({ ...v, ...patch }));
  const updateGuidelines = (patch: Partial<BrandGuidelines>) => setGuidelines((v) => ({ ...v, ...patch }));

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <FormSection title="Basic Information">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Full Name"><TextInput value={name} onChange={setName} placeholder="Maya Chen" /></FormField>
                <FormField label="Handle"><TextInput value={handle} onChange={setHandle} placeholder="@mayareviews" /></FormField>
              </div>
              <FormField label="Bio" helpText="This appears on your public profile. Be specific about your expertise.">
                <TextArea value={bio} onChange={setBio} placeholder="Describe your content focus, expertise, and what makes your perspective unique..." rows={4} />
              </FormField>
            </FormSection>
            <FormSection title="Niche & Platforms">
              <FormField label="Primary Niche">
                <SelectInput value={niche} onChange={setNiche} options={[
                  { value: "", label: "Select your primary niche..." },
                  { value: "Tech & Gadgets", label: "Tech & Gadgets" },
                  { value: "Fitness & Wellness", label: "Fitness & Wellness" },
                  { value: "Beauty & Skincare", label: "Beauty & Skincare" },
                  { value: "Food & Cooking", label: "Food & Cooking" },
                  { value: "Personal Finance", label: "Personal Finance" },
                  { value: "Fashion & Style", label: "Fashion & Style" },
                  { value: "Travel", label: "Travel" },
                  { value: "Education", label: "Education" },
                  { value: "Gaming", label: "Gaming" },
                  { value: "Home & Lifestyle", label: "Home & Lifestyle" },
                ]} />
              </FormField>
              <TagInput value={secondaryNiches} onChange={setSecondaryNiches} label="Secondary Niches" placeholder="Type and press Enter..." suggestions={["Productivity", "Photography", "Music", "Parenting", "Sustainability", "DIY", "Cars & Auto"]} helpText="Topics you occasionally cover beyond your primary niche." />
              <FormField label="Active Platforms">
                <MultiOptionGrid value={selectedPlatforms} onChange={setSelectedPlatforms} options={[
                  { value: "YouTube", label: "YouTube" },
                  { value: "Instagram", label: "Instagram" },
                  { value: "TikTok", label: "TikTok" },
                  { value: "Twitter", label: "Twitter/X" },
                  { value: "LinkedIn", label: "LinkedIn" },
                  { value: "Twitch", label: "Twitch" },
                  { value: "Podcast", label: "Podcast" },
                ]} />
              </FormField>
              <FormField label="Total Following"><TextInput value={followerCount} onChange={setFollowerCount} placeholder="e.g. 1.2M" /></FormField>
            </FormSection>
          </motion.div>
        );

      case 1:
        return (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <FormSection title="Vocal Characteristics">
              <FormField label="Pitch Range" helpText="The general register of your speaking voice.">
                <OptionGrid value={voice.pitchRange} onChange={(v) => updateVoice({ pitchRange: v as VoiceProfile["pitchRange"] })} options={[
                  { value: "low", label: "Low", desc: "Deep, bass register" },
                  { value: "mid-low", label: "Mid-Low", desc: "Below average" },
                  { value: "mid", label: "Mid", desc: "Average range" },
                  { value: "mid-high", label: "Mid-High", desc: "Above average" },
                  { value: "high", label: "High", desc: "Higher register" },
                ]} columns={5 as 4} />
              </FormField>
              <FormField label="Tone Qualities" helpText="Select all that describe your natural voice.">
                <MultiOptionGrid value={voice.toneQuality} onChange={(v) => updateVoice({ toneQuality: v })} options={[
                  { value: "warm", label: "Warm" },
                  { value: "bright", label: "Bright" },
                  { value: "raspy", label: "Raspy" },
                  { value: "smooth", label: "Smooth" },
                  { value: "nasal", label: "Nasal" },
                  { value: "deep", label: "Deep" },
                  { value: "breathy", label: "Breathy" },
                  { value: "crisp", label: "Crisp" },
                ]} />
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Speaking Pace">
                  <SelectInput value={voice.speakingPace} onChange={(v) => updateVoice({ speakingPace: v as VoiceProfile["speakingPace"] })} options={[
                    { value: "very-slow", label: "Very Slow (~100 WPM)" },
                    { value: "slow", label: "Slow (~120 WPM)" },
                    { value: "moderate", label: "Moderate (~150 WPM)" },
                    { value: "fast", label: "Fast (~180 WPM)" },
                    { value: "very-fast", label: "Very Fast (~200+ WPM)" },
                  ]} />
                </FormField>
                <FormField label="Average WPM">
                  <NumberInput value={voice.averageWPM} onChange={(v) => updateVoice({ averageWPM: v })} min={80} max={250} suffix="words/min" />
                </FormField>
              </div>
              <FormField label="Cadence Pattern" helpText="How your speech rhythm flows.">
                <OptionGrid value={voice.cadencePattern} onChange={(v) => updateVoice({ cadencePattern: v as VoiceProfile["cadencePattern"] })} options={[
                  { value: "steady", label: "Steady", desc: "Even, metronomic" },
                  { value: "rhythmic", label: "Rhythmic", desc: "Musical flow" },
                  { value: "staccato", label: "Staccato", desc: "Punchy, clipped" },
                  { value: "flowing", label: "Flowing", desc: "Smooth, connected" },
                  { value: "conversational", label: "Conversational", desc: "Natural, varied" },
                  { value: "dramatic-pauses", label: "Dramatic Pauses", desc: "Uses silence" },
                ]} />
              </FormField>
              <FormField label="Volume Dynamics">
                <OptionGrid value={voice.volumeDynamics} onChange={(v) => updateVoice({ volumeDynamics: v as VoiceProfile["volumeDynamics"] })} options={[
                  { value: "consistent", label: "Consistent", desc: "Even volume" },
                  { value: "builds-up", label: "Builds Up", desc: "Gets louder over time" },
                  { value: "soft-to-loud", label: "Soft to Loud", desc: "Wide range" },
                  { value: "naturally-varied", label: "Naturally Varied", desc: "Organic shifts" },
                ]} columns={4} />
              </FormField>
            </FormSection>

            <FormSection title="Accent & Pronunciation">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Accent Region" helpText="Where your accent originates from.">
                  <TextInput value={voice.accentRegion} onChange={(v) => updateVoice({ accentRegion: v })} placeholder="e.g. Pacific Northwest US, London RP, Midwest" />
                </FormField>
                <FormField label="Accent Intensity">
                  <OptionGrid value={voice.accentIntensity} onChange={(v) => updateVoice({ accentIntensity: v as VoiceProfile["accentIntensity"] })} options={[
                    { value: "subtle", label: "Subtle" },
                    { value: "moderate", label: "Moderate" },
                    { value: "strong", label: "Strong" },
                  ]} />
                </FormField>
              </div>
              <FormField label="Emphasis Patterns" helpText="How you naturally stress key words or deliver important points.">
                <TextArea value={voice.emphasisPatterns} onChange={(v) => updateVoice({ emphasisPatterns: v })} placeholder="e.g. Drops voice slightly lower on key specs, pauses before delivering verdict, raises pitch at the end of surprising claims" />
              </FormField>
              <FormField label="Pronunciation Notes" helpText="Any words you pronounce distinctively.">
                <TextArea value={voice.pronunciationNotes} onChange={(v) => updateVoice({ pronunciationNotes: v })} placeholder="e.g. Pronounces 'data' as 'day-ta', elongates vowels in brand names" rows={2} />
              </FormField>
            </FormSection>

            <FormSection title="Speech Patterns & Phrases">
              <TagInput value={voice.fillerWords} onChange={(v) => updateVoice({ fillerWords: v })} label="Filler Words" placeholder="Type and press Enter..." suggestions={["um", "uh", "like", "you know", "basically", "right", "so", "actually", "literally", "honestly"]} helpText="Natural filler words you use when speaking. Be honest — this adds authenticity." />
              <FormField label="Filler Frequency">
                <OptionGrid value={voice.fillerFrequency} onChange={(v) => updateVoice({ fillerFrequency: v as VoiceProfile["fillerFrequency"] })} options={[
                  { value: "none", label: "None", desc: "Very clean speech" },
                  { value: "minimal", label: "Minimal", desc: "Rare, polished" },
                  { value: "occasional", label: "Occasional", desc: "Natural amount" },
                  { value: "frequent", label: "Frequent", desc: "Part of your style" },
                ]} columns={4} />
              </FormField>
              <TagInput value={voice.signatureExpressions} onChange={(v) => updateVoice({ signatureExpressions: v })} label="Signature Expressions" placeholder="e.g. 'Here's the thing though'" helpText="Phrases you commonly use that viewers would recognize." />
              <FormField label="Greeting Style" helpText="How you typically open a video or address your audience.">
                <TextArea value={voice.greetingStyle} onChange={(v) => updateVoice({ greetingStyle: v })} placeholder="e.g. Hey everyone, welcome back. Let's get into it." rows={2} />
              </FormField>
              <TagInput value={voice.signOffPhrases} onChange={(v) => updateVoice({ signOffPhrases: v })} label="Sign-Off Phrases" placeholder="e.g. 'That's all for today'" helpText="How you typically close a video." />
              <TagInput value={voice.transitionPhrases} onChange={(v) => updateVoice({ transitionPhrases: v })} label="Transition Phrases" placeholder="e.g. 'Now here's where it gets interesting'" helpText="Phrases you use to shift between topics." />
            </FormSection>

            <FormSection title="Humor & Storytelling">
              <FormField label="Humor Style" helpText="Select all that apply.">
                <MultiOptionGrid value={voice.humorStyle} onChange={(v) => updateVoice({ humorStyle: v })} options={[
                  { value: "dry-wit", label: "Dry Wit" },
                  { value: "sarcastic", label: "Sarcastic" },
                  { value: "self-deprecating", label: "Self-Deprecating" },
                  { value: "observational", label: "Observational" },
                  { value: "puns", label: "Puns" },
                  { value: "deadpan", label: "Deadpan" },
                  { value: "enthusiastic", label: "Enthusiastic" },
                  { value: "none", label: "Rarely Use Humor" },
                ]} />
              </FormField>
              <FormField label="Humor Frequency">
                <OptionGrid value={voice.humorFrequency} onChange={(v) => updateVoice({ humorFrequency: v as VoiceProfile["humorFrequency"] })} options={[
                  { value: "never", label: "Never" },
                  { value: "rare", label: "Rare" },
                  { value: "occasional", label: "Occasional" },
                  { value: "frequent", label: "Frequent" },
                  { value: "constant", label: "Constant" },
                ]} columns={5 as 4} />
              </FormField>
              <FormField label="Laugh Style" helpText="Describe how you laugh — this helps with authentic audio synthesis.">
                <TextInput value={voice.laughStyle} onChange={(v) => updateVoice({ laughStyle: v })} placeholder="e.g. Quick exhale through nose, big full laugh, subtle chuckle" />
              </FormField>
              <FormField label="Storytelling Approach">
                <OptionGrid value={voice.storytellingApproach} onChange={(v) => updateVoice({ storytellingApproach: v as VoiceProfile["storytellingApproach"] })} options={[
                  { value: "anecdotal", label: "Anecdotal", desc: "Personal stories" },
                  { value: "data-driven", label: "Data-Driven", desc: "Facts & numbers" },
                  { value: "metaphor-heavy", label: "Metaphor-Heavy", desc: "Analogies & imagery" },
                  { value: "direct", label: "Direct", desc: "Straight to the point" },
                  { value: "suspense-building", label: "Suspense-Building", desc: "Creates tension" },
                ]} />
              </FormField>
            </FormSection>
          </motion.div>
        );

      case 2:
        return (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <FormSection title="Physical Appearance">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FormField label="Skin Tone"><TextInput value={visual.skinTone} onChange={(v) => updateVisual({ skinTone: v })} placeholder="e.g. Light olive, Deep brown" /></FormField>
                <FormField label="Hair Color"><TextInput value={visual.hairColor} onChange={(v) => updateVisual({ hairColor: v })} placeholder="e.g. Black, Auburn, Blonde" /></FormField>
                <FormField label="Eye Color"><TextInput value={visual.eyeColor} onChange={(v) => updateVisual({ eyeColor: v })} placeholder="e.g. Dark brown, Hazel" /></FormField>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Hair Style"><TextInput value={visual.hairStyle} onChange={(v) => updateVisual({ hairStyle: v })} placeholder="e.g. Shoulder-length wavy, Buzz cut" /></FormField>
                <FormField label="Facial Hair"><TextInput value={visual.facialHair} onChange={(v) => updateVisual({ facialHair: v })} placeholder="e.g. Clean-shaven, Full beard, N/A" /></FormField>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Build Type">
                  <OptionGrid value={visual.buildType} onChange={(v) => updateVisual({ buildType: v as VisualIdentity["buildType"] })} options={[
                    { value: "slim", label: "Slim" },
                    { value: "athletic", label: "Athletic" },
                    { value: "average", label: "Average" },
                    { value: "muscular", label: "Muscular" },
                    { value: "curvy", label: "Curvy" },
                    { value: "stocky", label: "Stocky" },
                  ]} />
                </FormField>
                <FormField label="Approximate Height"><TextInput value={visual.heightApprox} onChange={(v) => updateVisual({ heightApprox: v })} placeholder="e.g. 5 ft 7 in / 168cm" /></FormField>
              </div>
              <TagInput value={visual.distinguishingFeatures} onChange={(v) => updateVisual({ distinguishingFeatures: v })} label="Distinguishing Features" placeholder="e.g. Dimples, Gap tooth, Scar on chin" helpText="Unique visual features that help the AI model render you accurately." />
            </FormSection>

            <FormSection title="Wardrobe & Styling">
              <TagInput value={visual.typicalWardrobe} onChange={(v) => updateVisual({ typicalWardrobe: v })} label="Typical On-Camera Wardrobe" placeholder="e.g. Black crew-neck t-shirt" helpText="The clothing items you wear most often on camera." />
              <TagInput value={visual.wardrobeColorPalette} onChange={(v) => updateVisual({ wardrobeColorPalette: v })} label="Wardrobe Color Palette" placeholder="e.g. black, navy, earth tones" suggestions={["black", "white", "navy", "gray", "earth tones", "pastels", "neon", "jewel tones", "neutrals"]} />
              <TagInput value={visual.accessorySignatures} onChange={(v) => updateVisual({ accessorySignatures: v })} label="Signature Accessories" placeholder="e.g. Always wears baseball cap, Silver chain necklace" helpText="Accessories your audience would recognize." />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Makeup Style">
                  <SelectInput value={visual.makeupStyle} onChange={(v) => updateVisual({ makeupStyle: v as VisualIdentity["makeupStyle"] })} options={[
                    { value: "none", label: "None" },
                    { value: "minimal", label: "Minimal" },
                    { value: "natural-glam", label: "Natural Glam" },
                    { value: "full-glam", label: "Full Glam" },
                    { value: "editorial", label: "Editorial" },
                    { value: "varies", label: "Varies" },
                  ]} />
                </FormField>
                <FormField label="Makeup Notes"><TextInput value={visual.makeupNotes} onChange={(v) => updateVisual({ makeupNotes: v })} placeholder="e.g. Light foundation, natural lip color" /></FormField>
              </div>
            </FormSection>

            <FormSection title="Environment & Set">
              <FormField label="Typical Background Setting" helpText="Describe your usual filming environment in detail.">
                <TextArea value={visual.typicalBackgroundSetting} onChange={(v) => updateVisual({ typicalBackgroundSetting: v })} placeholder="e.g. Clean desk setup with dual monitors, acoustic panels on wall, warm LED strip lighting behind desk" />
              </FormField>
              <TagInput value={visual.backgroundColors} onChange={(v) => updateVisual({ backgroundColors: v })} label="Background Colors" placeholder="e.g. dark gray, warm amber accents" />
              <FormField label="Lighting Preference">
                <OptionGrid value={visual.lightingPreference} onChange={(v) => updateVisual({ lightingPreference: v as VisualIdentity["lightingPreference"] })} options={[
                  { value: "natural-daylight", label: "Natural Daylight", desc: "Window light" },
                  { value: "warm-studio", label: "Warm Studio", desc: "Tungsten/LED warm" },
                  { value: "ring-light", label: "Ring Light", desc: "Even face light" },
                  { value: "moody-low-key", label: "Moody Low-Key", desc: "Dark, dramatic" },
                  { value: "bright-flat", label: "Bright Flat", desc: "Even, no shadows" },
                  { value: "dramatic-shadows", label: "Dramatic Shadows", desc: "High contrast" },
                ]} />
              </FormField>
              <FormField label="Lighting Notes"><TextArea value={visual.lightingNotes} onChange={(v) => updateVisual({ lightingNotes: v })} placeholder="e.g. Key light at 45 degrees camera-left, subtle fill from monitor glow" rows={2} /></FormField>
            </FormSection>

            <FormSection title="Camera Setup">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Preferred Camera Angle">
                  <OptionGrid value={visual.preferredCameraAngle} onChange={(v) => updateVisual({ preferredCameraAngle: v as VisualIdentity["preferredCameraAngle"] })} options={[
                    { value: "straight-on", label: "Straight-On" },
                    { value: "slight-above", label: "Slight Above" },
                    { value: "slight-below", label: "Slight Below" },
                    { value: "side-profile", label: "Side Profile" },
                    { value: "dynamic-varied", label: "Dynamic" },
                  ]} columns={2} />
                </FormField>
                <FormField label="Typical Framing">
                  <OptionGrid value={visual.typicalFraming} onChange={(v) => updateVisual({ typicalFraming: v as VisualIdentity["typicalFraming"] })} options={[
                    { value: "tight-headshot", label: "Tight Headshot" },
                    { value: "head-and-shoulders", label: "Head & Shoulders" },
                    { value: "waist-up", label: "Waist Up" },
                    { value: "full-body", label: "Full Body" },
                    { value: "varies", label: "Varies" },
                  ]} columns={2} />
                </FormField>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Camera Distance">
                  <OptionGrid value={visual.cameraDistance} onChange={(v) => updateVisual({ cameraDistance: v as VisualIdentity["cameraDistance"] })} options={[
                    { value: "close-up", label: "Close-Up" },
                    { value: "medium", label: "Medium" },
                    { value: "wide", label: "Wide" },
                    { value: "mixed", label: "Mixed" },
                  ]} columns={4} />
                </FormField>
                <FormField label="Lens Style">
                  <OptionGrid value={visual.lensStyle} onChange={(v) => updateVisual({ lensStyle: v as VisualIdentity["lensStyle"] })} options={[
                    { value: "shallow-dof", label: "Shallow DOF" },
                    { value: "deep-focus", label: "Deep Focus" },
                    { value: "cinematic", label: "Cinematic" },
                    { value: "vlog-style", label: "Vlog-Style" },
                  ]} columns={4} />
                </FormField>
              </div>
            </FormSection>
          </motion.div>
        );

      case 3:
        return (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <FormSection title="Gestures & Hand Movement">
              <FormField label="Gesture Frequency" helpText="How much you move your hands when speaking.">
                <OptionGrid value={mannerisms.gestureFrequency} onChange={(v) => updateMannerisms({ gestureFrequency: v as PhysicalMannerisms["gestureFrequency"] })} options={[
                  { value: "minimal", label: "Minimal", desc: "Hands mostly still" },
                  { value: "moderate", label: "Moderate", desc: "Natural movement" },
                  { value: "expressive", label: "Expressive", desc: "Frequent gestures" },
                  { value: "very-animated", label: "Very Animated", desc: "Constantly moving" },
                ]} columns={4} />
              </FormField>
              <FormField label="Dominant Hand">
                <OptionGrid value={mannerisms.dominantHand} onChange={(v) => updateMannerisms({ dominantHand: v as PhysicalMannerisms["dominantHand"] })} options={[
                  { value: "left", label: "Left" },
                  { value: "right", label: "Right" },
                  { value: "ambidextrous", label: "Ambidextrous" },
                ]} />
              </FormField>
              <TagInput value={mannerisms.signatureGestures} onChange={(v) => updateMannerisms({ signatureGestures: v })} label="Signature Gestures" placeholder="e.g. Points at camera, Counts on fingers" suggestions={["Points at camera", "Counts on fingers", "Air quotes", "Hands in prayer position", "Thumbs up", "Claps hands together", "Waves hand dismissively", "Finger snap"]} helpText="Specific hand gestures you use regularly." />
              <FormField label="Hand Resting Position" helpText="Where your hands default to when not gesturing.">
                <TextInput value={mannerisms.handRestingPosition} onChange={(v) => updateMannerisms({ handRestingPosition: v })} placeholder="e.g. Folded on desk, One hand on chin, Holding product" />
              </FormField>
            </FormSection>

            <FormSection title="Facial Expressions">
              <FormField label="Default Resting Expression">
                <OptionGrid value={mannerisms.defaultExpression} onChange={(v) => updateMannerisms({ defaultExpression: v as PhysicalMannerisms["defaultExpression"] })} options={[
                  { value: "neutral", label: "Neutral" },
                  { value: "slight-smile", label: "Slight Smile" },
                  { value: "serious", label: "Serious" },
                  { value: "warm-inviting", label: "Warm & Inviting" },
                  { value: "intense", label: "Intense" },
                ]} />
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Eyebrow Expressiveness">
                  <OptionGrid value={mannerisms.eyebrowExpressiveness} onChange={(v) => updateMannerisms({ eyebrowExpressiveness: v as PhysicalMannerisms["eyebrowExpressiveness"] })} options={[
                    { value: "subtle", label: "Subtle" },
                    { value: "moderate", label: "Moderate" },
                    { value: "very-expressive", label: "Very Expressive" },
                  ]} />
                </FormField>
                <FormField label="Smile Type">
                  <OptionGrid value={mannerisms.smileType} onChange={(v) => updateMannerisms({ smileType: v as PhysicalMannerisms["smileType"] })} options={[
                    { value: "closed-mouth", label: "Closed-Mouth" },
                    { value: "wide-toothy", label: "Wide & Toothy" },
                    { value: "half-smile", label: "Half Smile" },
                    { value: "asymmetric-smirk", label: "Asymmetric Smirk" },
                  ]} columns={2} />
                </FormField>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Smile Frequency">
                  <OptionGrid value={mannerisms.smileFrequency} onChange={(v) => updateMannerisms({ smileFrequency: v as PhysicalMannerisms["smileFrequency"] })} options={[
                    { value: "rare", label: "Rare" },
                    { value: "occasional", label: "Occasional" },
                    { value: "frequent", label: "Frequent" },
                    { value: "constant", label: "Constant" },
                  ]} columns={4} />
                </FormField>
                <FormField label="Eye Contact Pattern">
                  <SelectInput value={mannerisms.eyeContactPattern} onChange={(v) => updateMannerisms({ eyeContactPattern: v as PhysicalMannerisms["eyeContactPattern"] })} options={[
                    { value: "direct-sustained", label: "Direct & Sustained" },
                    { value: "glances-away-periodically", label: "Glances Away Periodically" },
                    { value: "looks-at-product-then-camera", label: "Product → Camera" },
                    { value: "reads-notes-occasionally", label: "Reads Notes Occasionally" },
                  ]} />
                </FormField>
              </div>
            </FormSection>

            <FormSection title="Body Movement & Posture">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Head Movement">
                  <OptionGrid value={mannerisms.headMovementStyle} onChange={(v) => updateMannerisms({ headMovementStyle: v as PhysicalMannerisms["headMovementStyle"] })} options={[
                    { value: "still", label: "Still" },
                    { value: "gentle-nods", label: "Gentle Nods" },
                    { value: "tilts-for-emphasis", label: "Tilts for Emphasis" },
                    { value: "dynamic", label: "Dynamic" },
                  ]} columns={2} />
                </FormField>
                <FormField label="Body Sway">
                  <OptionGrid value={mannerisms.bodySwayPattern} onChange={(v) => updateMannerisms({ bodySwayPattern: v as PhysicalMannerisms["bodySwayPattern"] })} options={[
                    { value: "still", label: "Still" },
                    { value: "slight-lean", label: "Slight Lean" },
                    { value: "animated-rocking", label: "Animated" },
                    { value: "leans-into-camera", label: "Leans In" },
                  ]} columns={2} />
                </FormField>
              </div>
              <FormField label="Posture">
                <OptionGrid value={mannerisms.posture} onChange={(v) => updateMannerisms({ posture: v as PhysicalMannerisms["posture"] })} options={[
                  { value: "upright-formal", label: "Upright & Formal", desc: "Straight-backed" },
                  { value: "relaxed-casual", label: "Relaxed & Casual", desc: "Comfortable" },
                  { value: "leaning-forward-engaged", label: "Leaning Forward", desc: "Engaged, eager" },
                  { value: "reclined", label: "Reclined", desc: "Laid-back" },
                ]} columns={4} />
              </FormField>
            </FormSection>

            <FormSection title="Product & Prop Interaction">
              <FormField label="Product Holding Style" helpText="How you typically hold and present products on camera.">
                <TextArea value={mannerisms.productHoldingStyle} onChange={(v) => updateMannerisms({ productHoldingStyle: v })} placeholder="e.g. Holds at chest level with both hands, turns to show ports and details, places on desk for size comparison" />
              </FormField>
              <TagInput value={mannerisms.propUsage} onChange={(v) => updateMannerisms({ propUsage: v })} label="Common Props" placeholder="e.g. Whiteboard, Phone for comparisons" helpText="Objects you frequently use in your content." />
            </FormSection>
          </motion.div>
        );

      case 4:
        return (
          <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <FormSection title="Energy & Pacing">
              <FormField label="Energy Level">
                <OptionGrid value={personality.energyLevel} onChange={(v) => updatePersonality({ energyLevel: v as ContentPersonality["energyLevel"] })} options={[
                  { value: "low-calm", label: "Low & Calm", desc: "Relaxed, ASMR-like" },
                  { value: "moderate-steady", label: "Moderate & Steady", desc: "Professional" },
                  { value: "high-enthusiastic", label: "High & Enthusiastic", desc: "Energetic, upbeat" },
                  { value: "varies-by-topic", label: "Varies by Topic", desc: "Adapts to content" },
                ]} columns={4} />
              </FormField>
              <FormField label="Energy Arc Through Video">
                <OptionGrid value={personality.openingEnergyVsClosing} onChange={(v) => updatePersonality({ openingEnergyVsClosing: v as ContentPersonality["openingEnergyVsClosing"] })} options={[
                  { value: "consistent", label: "Consistent", desc: "Same throughout" },
                  { value: "builds-throughout", label: "Builds Up", desc: "Starts low, ends high" },
                  { value: "starts-high-settles", label: "Starts High", desc: "Hook then settle" },
                  { value: "peaks-in-middle", label: "Peaks in Middle", desc: "Calm → Peak → Calm" },
                ]} columns={4} />
              </FormField>
            </FormSection>

            <FormSection title="Audience Interaction">
              <FormField label="How You Address Your Audience">
                <OptionGrid value={personality.audienceAddressStyle} onChange={(v) => updatePersonality({ audienceAddressStyle: v as ContentPersonality["audienceAddressStyle"] })} options={[
                  { value: "direct-you", label: "Direct 'You'", desc: "Speaking to one person" },
                  { value: "inclusive-we", label: "Inclusive 'We'", desc: "Part of a community" },
                  { value: "third-person", label: "Third Person", desc: "Reporting style" },
                  { value: "mixed", label: "Mixed", desc: "Varies naturally" },
                ]} columns={4} />
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Call-to-Action Style">
                  <SelectInput value={personality.callToActionStyle} onChange={(v) => updatePersonality({ callToActionStyle: v as ContentPersonality["callToActionStyle"] })} options={[
                    { value: "soft-suggestion", label: "Soft Suggestion" },
                    { value: "direct-ask", label: "Direct Ask" },
                    { value: "urgency-driven", label: "Urgency-Driven" },
                    { value: "value-proposition", label: "Value Proposition" },
                    { value: "casual-mention", label: "Casual Mention" },
                  ]} />
                </FormField>
                <FormField label="CTA Placement">
                  <SelectInput value={personality.ctaPlacement} onChange={(v) => updatePersonality({ ctaPlacement: v as ContentPersonality["ctaPlacement"] })} options={[
                    { value: "end-only", label: "End Only" },
                    { value: "beginning-and-end", label: "Beginning & End" },
                    { value: "throughout", label: "Throughout" },
                    { value: "subtle-throughout", label: "Subtle Throughout" },
                  ]} />
                </FormField>
              </div>
              <TagInput value={personality.viewerEngagementTactics} onChange={(v) => updatePersonality({ viewerEngagementTactics: v })} label="Viewer Engagement Tactics" placeholder="e.g. Asks rhetorical questions" suggestions={["Asks rhetorical questions", "Polls audience", "Responds to comments in next video", "Challenges viewers", "References community inside jokes"]} />
            </FormSection>

            <FormSection title="Content Structure">
              <FormField label="Typical Video Structure" helpText="Describe the general flow of your content.">
                <TextArea value={personality.typicalVideoStructure} onChange={(v) => updatePersonality({ typicalVideoStructure: v })} placeholder="e.g. Hook → Context → 3 Key Points → Summary → CTA" rows={2} />
              </FormField>
              <FormField label="Hook Style" helpText="How you grab attention in the first 5 seconds.">
                <TextArea value={personality.hookStyle} onChange={(v) => updatePersonality({ hookStyle: v })} placeholder="e.g. Opens with a bold one-line take, then says 'let me explain why'" rows={2} />
              </FormField>
              <FormField label="Average Content Length">
                <OptionGrid value={personality.averageContentLength} onChange={(v) => updatePersonality({ averageContentLength: v as ContentPersonality["averageContentLength"] })} options={[
                  { value: "15-30s", label: "15–30 sec" },
                  { value: "30-60s", label: "30–60 sec" },
                  { value: "1-3min", label: "1–3 min" },
                  { value: "3-10min", label: "3–10 min" },
                  { value: "10min+", label: "10+ min" },
                ]} columns={5 as 4} />
              </FormField>
            </FormSection>

            <FormSection title="Brand Integration Style">
              <FormField label="Product Introduction Style" helpText="How you naturally introduce sponsored products.">
                <TextArea value={personality.productIntroStyle} onChange={(v) => updatePersonality({ productIntroStyle: v })} placeholder="e.g. Casual mention mid-content, then detailed review toward the end" />
              </FormField>
              <FormField label="Sponsorship Disclosure Style" helpText="How you handle ad disclosures.">
                <TextArea value={personality.sponsorshipDisclosureStyle} onChange={(v) => updatePersonality({ sponsorshipDisclosureStyle: v })} placeholder="e.g. Clear 'This video is sponsored by X' upfront, then natural integration" />
              </FormField>
              <TagInput value={personality.authenticitySignals} onChange={(v) => updatePersonality({ authenticitySignals: v })} label="Authenticity Signals" placeholder="e.g. Shows both pros and cons" suggestions={["Shows both pros and cons", "Compares to competitors", "Mentions personal use", "Shows receipts/proof", "Admits limitations"]} helpText="Things you do to maintain trust with your audience." />
            </FormSection>

            <FormSection title="Verbal Identity">
              <TagInput value={personality.catchphrases} onChange={(v) => updatePersonality({ catchphrases: v })} label="Catchphrases" placeholder="e.g. Let's get into it" helpText="Phrases your audience associates with you." />
              <TagInput value={personality.verbalTics} onChange={(v) => updatePersonality({ verbalTics: v })} label="Verbal Tics" placeholder="e.g. Clicks tongue before speaking" helpText="Unconscious speech habits — the AI model uses these for authenticity." />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Vocabulary Level">
                  <SelectInput value={personality.vocabularyLevel} onChange={(v) => updatePersonality({ vocabularyLevel: v as ContentPersonality["vocabularyLevel"] })} options={[
                    { value: "casual-slang", label: "Casual / Slang" },
                    { value: "conversational", label: "Conversational" },
                    { value: "semi-formal", label: "Semi-Formal" },
                    { value: "technical-jargon", label: "Technical / Jargon" },
                    { value: "academic", label: "Academic" },
                  ]} />
                </FormField>
                <FormField label="Profanity Level">
                  <SelectInput value={personality.profanityLevel} onChange={(v) => updatePersonality({ profanityLevel: v as ContentPersonality["profanityLevel"] })} options={[
                    { value: "none", label: "None" },
                    { value: "mild-minced", label: "Mild / Minced Oaths" },
                    { value: "occasional", label: "Occasional" },
                    { value: "frequent", label: "Frequent" },
                  ]} />
                </FormField>
              </div>
            </FormSection>

            <FormSection title="Topic Boundaries">
              <TagInput value={personality.comfortableTopics} onChange={(v) => updatePersonality({ comfortableTopics: v })} label="Comfortable Topics" placeholder="e.g. Consumer electronics" helpText="Topics you're happy to discuss in brand content." />
              <TagInput value={personality.offLimitTopics} onChange={(v) => updatePersonality({ offLimitTopics: v })} label="Off-Limit Topics" placeholder="e.g. Cryptocurrency, Political commentary" helpText="Topics you will never include in licensed content. This is strictly enforced." />
            </FormSection>
          </motion.div>
        );

      case 5:
        return (
          <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <FormSection title="Accepted & Rejected Categories">
              <TagInput value={guidelines.acceptedProductCategories} onChange={(v) => updateGuidelines({ acceptedProductCategories: v })} label="Accepted Product Categories" placeholder="e.g. Technology, Audio" suggestions={["Technology", "Audio", "Software", "Fitness", "Supplements", "Skincare", "Fashion", "Food & Beverage", "Finance", "Education", "Home & Garden", "Travel", "Automotive", "Pet Products"]} helpText="Product categories you're willing to endorse." />
              <TagInput value={guidelines.rejectedProductCategories} onChange={(v) => updateGuidelines({ rejectedProductCategories: v })} label="Rejected Product Categories" placeholder="e.g. Crypto, Gambling" suggestions={["Cryptocurrency", "Gambling", "Tobacco", "Alcohol", "Firearms", "Fast Fashion", "MLM", "Adult Content", "Payday Loans", "Weight Loss Pills"]} helpText="Product categories you will never endorse. Brands will not be able to request these." />
              <TagInput value={guidelines.competitorBlacklist} onChange={(v) => updateGuidelines({ competitorBlacklist: v })} label="Competitor Blacklist" placeholder="e.g. Brand names to avoid" helpText="Specific brands you won't promote or appear alongside." />
            </FormSection>

            <FormSection title="Messaging Constraints">
              <TagInput value={guidelines.requiredDisclosures} onChange={(v) => updateGuidelines({ requiredDisclosures: v })} label="Required Disclosures" placeholder="e.g. #ad, FTC compliance" suggestions={["#ad", "#sponsored", "#partner", "FTC-compliant sponsorship disclosure", "Paid partnership disclosure"]} />
              <FormField label="Tone Boundaries" helpText="Define what kind of messaging tone is unacceptable.">
                <TextArea value={guidelines.toneBoundaries} onChange={(v) => updateGuidelines({ toneBoundaries: v })} placeholder="e.g. No aggressive sales language, no clickbait claims, no 'limited time only' urgency tactics" />
              </FormField>
              <TagInput value={guidelines.messagingMustAvoid} onChange={(v) => updateGuidelines({ messagingMustAvoid: v })} label="Messaging Must-Avoid" placeholder="e.g. Guaranteed results" suggestions={["Best ever made", "Guaranteed results", "You need this", "Limited time", "Kills the competition", "Miracle cure", "Get rich quick", "No risk"]} helpText="Specific phrases or claims that must never appear in scripts using your likeness." />
            </FormSection>

            <FormSection title="Licensing Terms">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Max Concurrent Licenses" helpText="How many brands can use your likeness at once.">
                  <NumberInput value={guidelines.maxConcurrentLicenses} onChange={(v) => updateGuidelines({ maxConcurrentLicenses: v })} min={1} max={20} suffix="licenses" />
                </FormField>
                <FormField label="Exclusivity Period" helpText="Days after a campaign before a competitor in the same category can license.">
                  <NumberInput value={guidelines.exclusivityPeriodDays} onChange={(v) => updateGuidelines({ exclusivityPeriodDays: v })} min={0} max={365} suffix="days" />
                </FormField>
              </div>
              <FormField label="Allowed Usage Channels" helpText="Where brands can distribute content using your likeness.">
                <MultiOptionGrid value={guidelines.allowedUsageChannels} onChange={(v) => updateGuidelines({ allowedUsageChannels: v })} options={[
                  { value: "social-media", label: "Social Media" },
                  { value: "display-ads", label: "Display Ads" },
                  { value: "ctv", label: "Connected TV" },
                  { value: "email", label: "Email Marketing" },
                  { value: "landing-pages", label: "Landing Pages" },
                  { value: "ott", label: "OTT/Streaming" },
                ]} />
              </FormField>
              <TagInput value={guidelines.geographicRestrictions} onChange={(v) => updateGuidelines({ geographicRestrictions: v })} label="Geographic Restrictions" placeholder="e.g. US, Canada, UK" suggestions={["US", "Canada", "UK", "Australia", "EU", "APAC", "Global — No Restrictions"]} helpText="Markets where your likeness can be used." />
              <FormField label="License Duration Options" helpText="Select which durations you offer.">
                <MultiOptionGrid value={guidelines.licenseDurationOptions.map(String)} onChange={(v) => updateGuidelines({ licenseDurationOptions: v.map(Number) })} options={[
                  { value: "30", label: "30 Days" },
                  { value: "60", label: "60 Days" },
                  { value: "90", label: "90 Days" },
                  { value: "180", label: "180 Days" },
                  { value: "365", label: "1 Year" },
                ]} />
              </FormField>
            </FormSection>

            <FormSection title="Pricing">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Base License Fee" helpText="Your standard per-ad licensing fee.">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-zinc-500">$</span>
                    <NumberInput value={guidelines.baseLicenseFee} onChange={(v) => updateGuidelines({ baseLicenseFee: v })} min={500} max={100000} step={500} />
                  </div>
                </FormField>
                <FormField label="Extended Script Multiplier" helpText="Fee multiplier for scripts over 100 words.">
                  <NumberInput value={guidelines.extendedScriptMultiplier} onChange={(v) => updateGuidelines({ extendedScriptMultiplier: v })} min={1} max={5} step={0.1} suffix="×" />
                </FormField>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Exclusivity Premium" helpText="Multiplier when a brand requests category exclusivity.">
                  <NumberInput value={guidelines.exclusivityPremium} onChange={(v) => updateGuidelines({ exclusivityPremium: v })} min={1} max={5} step={0.1} suffix="×" />
                </FormField>
                <FormField label="Rush Fee Multiplier" helpText="Surcharge for expedited turnaround (under 48 hours).">
                  <NumberInput value={guidelines.rushFeeMultiplier} onChange={(v) => updateGuidelines({ rushFeeMultiplier: v })} min={1} max={3} step={0.05} suffix="×" />
                </FormField>
              </div>
            </FormSection>
          </motion.div>
        );

      case 6:
        return (
          <motion.div key="s6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <FormSection title="Sample Video Content">
              <p className="text-xs text-zinc-500 mb-3">Provide links to your existing content so the AI model can study your delivery, mannerisms, and visual presentation. More samples = higher fidelity output.</p>
              <TagInput value={sampleVideoUrls} onChange={setSampleVideoUrls} label="Video URLs" placeholder="Paste a YouTube or social media link and press Enter" helpText="Link to 3–5 of your best representative videos." />
            </FormSection>

            <FormSection title="Voice Samples">
              <p className="text-xs text-zinc-500 mb-3">Audio-only samples help refine voice synthesis. If you have podcast appearances, voiceover work, or clean audio clips, add them here.</p>
              <TagInput value={sampleAudioUrls} onChange={setSampleAudioUrls} label="Audio URLs" placeholder="Paste an audio link and press Enter" helpText="Clean audio without background music is ideal." />
            </FormSection>

            <FormSection title="Reference Images">
              <p className="text-xs text-zinc-500 mb-3">High-quality photos from multiple angles help the visual model capture your likeness accurately.</p>
              <div className="grid grid-cols-3 gap-3">
                {["Headshot (front-facing)", "45° Angle", "Profile View"].map((label) => (
                  <div key={label} className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-800 bg-zinc-900/30 p-6 text-center transition-colors hover:border-zinc-700">
                    <Upload className="mb-2 h-6 w-6 text-zinc-600" />
                    <p className="text-xs text-zinc-500">{label}</p>
                    <p className="mt-1 text-[10px] text-zinc-700">Click to upload</p>
                  </div>
                ))}
              </div>
            </FormSection>

            <FormSection title="Additional Notes">
              <FormField label="Reference Notes" helpText="Anything else the AI model should know about your likeness, delivery, or style.">
                <TextArea value={referenceNotes} onChange={setReferenceNotes} placeholder="e.g. I tend to look more serious in photos than on video — my on-camera presence is much warmer. I also switch between sitting and standing mid-video for energy." rows={4} />
              </FormField>
            </FormSection>
          </motion.div>
        );

      case 7:
        return (
          <motion.div key="s7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
            <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-5 text-center">
              <h3 className="text-base font-semibold text-zinc-200">Profile Review</h3>
              <p className="mt-1 text-sm text-zinc-500">Review your likeness profile before submitting. You can edit any section after submission.</p>
            </div>

            {[
              { title: "Basic Identity", items: [["Name", name], ["Handle", handle], ["Niche", niche], ["Platforms", selectedPlatforms.join(", ")], ["Following", followerCount]] },
              { title: "Voice & Speech", items: [["Pitch", voice.pitchRange], ["Pace", voice.speakingPace], ["WPM", String(voice.averageWPM)], ["Cadence", voice.cadencePattern], ["Accent", voice.accentRegion || "—"], ["Greeting", voice.greetingStyle || "—"], ["Humor", voice.humorStyle.join(", ") || "—"]] },
              { title: "Visual Identity", items: [["Hair", `${visual.hairColor} — ${visual.hairStyle}`], ["Build", visual.buildType], ["Height", visual.heightApprox || "—"], ["Wardrobe", visual.typicalWardrobe.join(", ") || "—"], ["Lighting", visual.lightingPreference], ["Camera", `${visual.preferredCameraAngle}, ${visual.typicalFraming}`]] },
              { title: "Mannerisms", items: [["Gestures", mannerisms.gestureFrequency], ["Expression", mannerisms.defaultExpression], ["Smile", `${mannerisms.smileType}, ${mannerisms.smileFrequency}`], ["Posture", mannerisms.posture], ["Eye Contact", mannerisms.eyeContactPattern]] },
              { title: "Content Personality", items: [["Energy", personality.energyLevel], ["Address Style", personality.audienceAddressStyle], ["CTA Style", personality.callToActionStyle], ["Vocabulary", personality.vocabularyLevel], ["Catchphrases", personality.catchphrases.join(", ") || "—"]] },
              { title: "Brand Guidelines", items: [["Base Fee", `$${guidelines.baseLicenseFee.toLocaleString()}`], ["Max Licenses", String(guidelines.maxConcurrentLicenses)], ["Exclusivity", `${guidelines.exclusivityPeriodDays} days`], ["Channels", guidelines.allowedUsageChannels.join(", ") || "—"]] },
              { title: "References", items: [["Videos", `${sampleVideoUrls.length} linked`], ["Audio", `${sampleAudioUrls.length} linked`]] },
            ].map((section) => (
              <div key={section.title} className="mb-4 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-zinc-300">{section.title}</h4>
                  <button onClick={() => setStep(["Basic Identity", "Voice & Speech", "Visual Identity", "Mannerisms", "Content Personality", "Brand Guidelines", "References"].indexOf(section.title))} className="text-[11px] text-accent hover:text-accent-hover transition-colors">Edit</button>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  {section.items.map(([label, value]) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-zinc-500">{label}</span>
                      <span className="text-zinc-300 text-right max-w-[60%] truncate">{value || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-semibold tracking-tight">Set Up Your Likeness Profile</h1>
        <p className="mt-1 text-sm text-zinc-500">
          The more detail you provide, the higher the fidelity of your AI-generated content. Every field helps the model replicate your unique presence.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex items-center gap-1 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => i <= step && setStep(i)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors ${
              i === step
                ? "bg-zinc-800 text-zinc-100"
                : i < step
                ? "text-zinc-400 hover:text-zinc-300"
                : "text-zinc-600 cursor-default"
            }`}
          >
            {i < step ? (
              <Check className="h-3 w-3 text-emerald-400" />
            ) : (
              <s.icon className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">{s.label}</span>
            <span className="sm:hidden">{i + 1}</span>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-6 h-1 w-full rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Form Content */}
      <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-6">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

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
            className="flex items-center gap-1.5 rounded-lg bg-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-700"
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            <Sparkles className="h-4 w-4" />
            Submit & Activate Profile
          </button>
        )}
      </div>
    </div>
  );
}
