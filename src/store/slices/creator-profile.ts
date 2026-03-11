export interface VoiceProfile {
  pitchRange: "low" | "mid-low" | "mid" | "mid-high" | "high";
  toneQuality: string[];
  speakingPace: "very-slow" | "slow" | "moderate" | "fast" | "very-fast";
  averageWPM: number;
  cadencePattern: "steady" | "rhythmic" | "staccato" | "flowing" | "conversational" | "dramatic-pauses";
  volumeDynamics: "consistent" | "builds-up" | "soft-to-loud" | "naturally-varied";
  accentRegion: string;
  accentIntensity: "subtle" | "moderate" | "strong";
  fillerWords: string[];
  fillerFrequency: "none" | "minimal" | "occasional" | "frequent";
  signatureExpressions: string[];
  greetingStyle: string;
  signOffPhrases: string[];
  transitionPhrases: string[];
  emphasisPatterns: string;
  pronunciationNotes: string;
  humorStyle: string[];
  humorFrequency: "never" | "rare" | "occasional" | "frequent" | "constant";
  laughStyle: string;
  storytellingApproach: "anecdotal" | "data-driven" | "metaphor-heavy" | "direct" | "suspense-building";
}

export interface VisualIdentity {
  skinTone: string;
  hairColor: string;
  hairStyle: string;
  facialHair: string;
  eyeColor: string;
  distinguishingFeatures: string[];
  buildType: "slim" | "athletic" | "average" | "muscular" | "curvy" | "stocky";
  heightApprox: string;
  typicalWardrobe: string[];
  wardrobeColorPalette: string[];
  accessorySignatures: string[];
  makeupStyle: "none" | "minimal" | "natural-glam" | "full-glam" | "editorial" | "varies";
  makeupNotes: string;
  typicalBackgroundSetting: string;
  backgroundColors: string[];
  lightingPreference: "natural-daylight" | "warm-studio" | "ring-light" | "moody-low-key" | "bright-flat" | "dramatic-shadows";
  lightingNotes: string;
  preferredCameraAngle: "straight-on" | "slight-above" | "slight-below" | "side-profile" | "dynamic-varied";
  typicalFraming: "tight-headshot" | "head-and-shoulders" | "waist-up" | "full-body" | "varies";
  cameraDistance: "close-up" | "medium" | "wide" | "mixed";
  lensStyle: "shallow-dof" | "deep-focus" | "cinematic" | "vlog-style";
}

export interface PhysicalMannerisms {
  gestureFrequency: "minimal" | "moderate" | "expressive" | "very-animated";
  dominantHand: "left" | "right" | "ambidextrous";
  signatureGestures: string[];
  handRestingPosition: string;
  defaultExpression: "neutral" | "slight-smile" | "serious" | "warm-inviting" | "intense";
  eyebrowExpressiveness: "subtle" | "moderate" | "very-expressive";
  smileType: "closed-mouth" | "wide-toothy" | "half-smile" | "asymmetric-smirk";
  smileFrequency: "rare" | "occasional" | "frequent" | "constant";
  eyeContactPattern: "direct-sustained" | "glances-away-periodically" | "looks-at-product-then-camera" | "reads-notes-occasionally";
  headMovementStyle: "still" | "gentle-nods" | "tilts-for-emphasis" | "dynamic";
  bodySwayPattern: "still" | "slight-lean" | "animated-rocking" | "leans-into-camera";
  posture: "upright-formal" | "relaxed-casual" | "leaning-forward-engaged" | "reclined";
  productHoldingStyle: string;
  propUsage: string[];
}

export interface ContentPersonality {
  energyLevel: "low-calm" | "moderate-steady" | "high-enthusiastic" | "varies-by-topic";
  openingEnergyVsClosing: "consistent" | "builds-throughout" | "starts-high-settles" | "peaks-in-middle";
  audienceAddressStyle: "direct-you" | "inclusive-we" | "third-person" | "mixed";
  callToActionStyle: "soft-suggestion" | "direct-ask" | "urgency-driven" | "value-proposition" | "casual-mention";
  ctaPlacement: "end-only" | "beginning-and-end" | "throughout" | "subtle-throughout";
  viewerEngagementTactics: string[];
  typicalVideoStructure: string;
  hookStyle: string;
  averageContentLength: "15-30s" | "30-60s" | "1-3min" | "3-10min" | "10min+";
  productIntroStyle: string;
  sponsorshipDisclosureStyle: string;
  authenticitySignals: string[];
  catchphrases: string[];
  verbalTics: string[];
  vocabularyLevel: "casual-slang" | "conversational" | "semi-formal" | "technical-jargon" | "academic";
  profanityLevel: "none" | "mild-minced" | "occasional" | "frequent";
  comfortableTopics: string[];
  offLimitTopics: string[];
}

export interface BrandGuidelines {
  acceptedProductCategories: string[];
  rejectedProductCategories: string[];
  competitorBlacklist: string[];
  requiredDisclosures: string[];
  toneBoundaries: string;
  messagingMustAvoid: string[];
  maxConcurrentLicenses: number;
  exclusivityPeriodDays: number;
  approvalRequired: boolean;
  allowedUsageChannels: string[];
  geographicRestrictions: string[];
  licenseDurationOptions: number[];
  baseLicenseFee: number;
  extendedScriptMultiplier: number;
  exclusivityPremium: number;
  rushFeeMultiplier: number;
}

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  niche: string;
  avatar: string;
  bio: string;
  followers: string;
  engagement: string;
  licenseFee: number;
  platforms: string[];
  voice: VoiceProfile;
  visual: VisualIdentity;
  mannerisms: PhysicalMannerisms;
  personality: ContentPersonality;
  brandGuidelines: BrandGuidelines;
  sampleVideoUrls: string[];
  sampleAudioUrls: string[];
  referenceImageUrls: string[];
  onboardingComplete: boolean;
  profileCompleteness: number;
  isVerified: boolean;
}

export const DEFAULT_VOICE: VoiceProfile = {
  pitchRange: "mid",
  toneQuality: [],
  speakingPace: "moderate",
  averageWPM: 150,
  cadencePattern: "conversational",
  volumeDynamics: "naturally-varied",
  accentRegion: "",
  accentIntensity: "subtle",
  fillerWords: [],
  fillerFrequency: "minimal",
  signatureExpressions: [],
  greetingStyle: "",
  signOffPhrases: [],
  transitionPhrases: [],
  emphasisPatterns: "",
  pronunciationNotes: "",
  humorStyle: [],
  humorFrequency: "occasional",
  laughStyle: "",
  storytellingApproach: "direct",
};

export const DEFAULT_VISUAL: VisualIdentity = {
  skinTone: "",
  hairColor: "",
  hairStyle: "",
  facialHair: "",
  eyeColor: "",
  distinguishingFeatures: [],
  buildType: "average",
  heightApprox: "",
  typicalWardrobe: [],
  wardrobeColorPalette: [],
  accessorySignatures: [],
  makeupStyle: "none",
  makeupNotes: "",
  typicalBackgroundSetting: "",
  backgroundColors: [],
  lightingPreference: "natural-daylight",
  lightingNotes: "",
  preferredCameraAngle: "straight-on",
  typicalFraming: "head-and-shoulders",
  cameraDistance: "medium",
  lensStyle: "vlog-style",
};

export const DEFAULT_MANNERISMS: PhysicalMannerisms = {
  gestureFrequency: "moderate",
  dominantHand: "right",
  signatureGestures: [],
  handRestingPosition: "",
  defaultExpression: "slight-smile",
  eyebrowExpressiveness: "moderate",
  smileType: "closed-mouth",
  smileFrequency: "frequent",
  eyeContactPattern: "direct-sustained",
  headMovementStyle: "gentle-nods",
  bodySwayPattern: "still",
  posture: "relaxed-casual",
  productHoldingStyle: "",
  propUsage: [],
};

export const DEFAULT_PERSONALITY: ContentPersonality = {
  energyLevel: "moderate-steady",
  openingEnergyVsClosing: "consistent",
  audienceAddressStyle: "direct-you",
  callToActionStyle: "soft-suggestion",
  ctaPlacement: "end-only",
  viewerEngagementTactics: [],
  typicalVideoStructure: "",
  hookStyle: "",
  averageContentLength: "1-3min",
  productIntroStyle: "",
  sponsorshipDisclosureStyle: "",
  authenticitySignals: [],
  catchphrases: [],
  verbalTics: [],
  vocabularyLevel: "conversational",
  profanityLevel: "none",
  comfortableTopics: [],
  offLimitTopics: [],
};

export const DEFAULT_BRAND_GUIDELINES: BrandGuidelines = {
  acceptedProductCategories: [],
  rejectedProductCategories: [],
  competitorBlacklist: [],
  requiredDisclosures: [],
  toneBoundaries: "",
  messagingMustAvoid: [],
  maxConcurrentLicenses: 3,
  exclusivityPeriodDays: 30,
  approvalRequired: true,
  allowedUsageChannels: [],
  geographicRestrictions: [],
  licenseDurationOptions: [30, 60, 90],
  baseLicenseFee: 5000,
  extendedScriptMultiplier: 1.5,
  exclusivityPremium: 2.0,
  rushFeeMultiplier: 1.25,
};
