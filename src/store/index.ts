import { create } from "zustand";
import {
  CreatorProfile,
  VoiceProfile,
  VisualIdentity,
  PhysicalMannerisms,
  ContentPersonality,
  BrandGuidelines,
  DEFAULT_VOICE,
  DEFAULT_VISUAL,
  DEFAULT_MANNERISMS,
  DEFAULT_PERSONALITY,
  DEFAULT_BRAND_GUIDELINES,
} from "./slices/creator-profile";
import { CampaignExpanded, GeneratedAsset, SpendEntry } from "./slices/campaigns";
import { Notification, INITIAL_NOTIFICATIONS } from "./slices/notifications";

export type { CreatorProfile, VoiceProfile, VisualIdentity, PhysicalMannerisms, ContentPersonality, BrandGuidelines, CampaignExpanded, GeneratedAsset, SpendEntry, Notification };
export { DEFAULT_VOICE, DEFAULT_VISUAL, DEFAULT_MANNERISMS, DEFAULT_PERSONALITY, DEFAULT_BRAND_GUIDELINES };

// Backwards compat - simpler Creator type used in marketplace
export interface Creator {
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
}

export interface EarningsEntry {
  month: string;
  revenue: number;
}

export interface ActiveLicense {
  id: string;
  brandName: string;
  campaignName: string;
  creatorId: string;
  startDate: string;
  endDate: string;
  channels: string[];
  status: "active" | "expiring-soon" | "expired";
  revenue: number;
}

// ─── Seed Data ─────────────────────────────────────────────────────

export const CREATORS: Creator[] = [
  {
    id: "1",
    name: "Maya Chen",
    handle: "@mayareviews",
    niche: "Tech & Gadgets",
    avatar: "MC",
    bio: "Former hardware engineer turned full-time tech reviewer. Known for in-depth teardowns and honest benchmark comparisons across consumer electronics.",
    followers: "1.2M",
    engagement: "4.8%",
    licenseFee: 5000,
    platforms: ["YouTube", "Instagram", "TikTok"],
  },
  {
    id: "2",
    name: "Jordan Ellis",
    handle: "@jordanfitslife",
    niche: "Fitness & Wellness",
    avatar: "JE",
    bio: "NASM-certified personal trainer and nutrition coach. Built a community around sustainable fitness routines for busy professionals.",
    followers: "840K",
    engagement: "6.1%",
    licenseFee: 3500,
    platforms: ["YouTube", "Instagram"],
  },
  {
    id: "3",
    name: "Priya Nair",
    handle: "@priyaglows",
    niche: "Beauty & Skincare",
    avatar: "PN",
    bio: "Licensed esthetician with a focus on evidence-based skincare. Known for debunking beauty myths and recommending products backed by clinical data.",
    followers: "2.1M",
    engagement: "5.3%",
    licenseFee: 7500,
    platforms: ["YouTube", "Instagram", "TikTok"],
  },
  {
    id: "4",
    name: "Carlos Rivera",
    handle: "@carlosinthekitchen",
    niche: "Food & Cooking",
    avatar: "CR",
    bio: "Culinary school graduate who makes restaurant-quality recipes accessible. Specializes in quick weeknight meals with a Latin American twist.",
    followers: "680K",
    engagement: "7.2%",
    licenseFee: 3000,
    platforms: ["YouTube", "TikTok"],
  },
  {
    id: "5",
    name: "Aisha Okonkwo",
    handle: "@aisha.finance",
    niche: "Personal Finance",
    avatar: "AO",
    bio: "CFA charterholder making wealth-building strategies digestible. Covers index investing, tax optimization, and financial independence for millennials.",
    followers: "950K",
    engagement: "5.7%",
    licenseFee: 6000,
    platforms: ["YouTube", "Instagram", "Twitter"],
  },
];

const MAYA_PROFILE: CreatorProfile = {
  ...CREATORS[0],
  voice: {
    pitchRange: "mid",
    toneQuality: ["warm", "smooth"],
    speakingPace: "moderate",
    averageWPM: 155,
    cadencePattern: "conversational",
    volumeDynamics: "naturally-varied",
    accentRegion: "Pacific Northwest US",
    accentIntensity: "subtle",
    fillerWords: ["so", "basically", "right"],
    fillerFrequency: "minimal",
    signatureExpressions: ["Here's the thing though", "Let's talk about that", "And this is where it gets interesting"],
    greetingStyle: "Hey everyone, welcome back. Let's get into it.",
    signOffPhrases: ["That's my take — let me know yours in the comments", "Links to everything are down below"],
    transitionPhrases: ["Now here's where it gets interesting", "But let's talk about the elephant in the room", "Shifting gears"],
    emphasisPatterns: "Drops voice slightly lower on key specs, pauses before delivering verdict",
    pronunciationNotes: "Pronounces 'data' as 'day-ta', enunciates technical model numbers clearly",
    humorStyle: ["dry-wit", "observational"],
    humorFrequency: "occasional",
    laughStyle: "Quick exhale through nose, occasional full chuckle when something genuinely surprises her",
    storytellingApproach: "data-driven",
  },
  visual: {
    skinTone: "Light olive",
    hairColor: "Black",
    hairStyle: "Shoulder-length straight, sometimes tucked behind ears",
    facialHair: "N/A",
    eyeColor: "Dark brown",
    distinguishingFeatures: ["Small mole near left eyebrow", "Thin silver necklace always visible"],
    buildType: "slim",
    heightApprox: "5'6\" / 168cm",
    typicalWardrobe: ["Black crew-neck t-shirt", "Dark denim jacket", "Minimalist watch"],
    wardrobeColorPalette: ["black", "charcoal", "navy", "white"],
    accessorySignatures: ["Thin silver chain necklace", "Apple Watch Ultra"],
    makeupStyle: "minimal",
    makeupNotes: "Light foundation, no heavy eye makeup, natural lip color",
    typicalBackgroundSetting: "Clean desk setup with dual monitors, acoustic panels on wall, warm LED strip lighting",
    backgroundColors: ["dark gray", "warm amber accents"],
    lightingPreference: "warm-studio",
    lightingNotes: "Key light at 45 degrees camera-left, subtle fill from monitor glow",
    preferredCameraAngle: "straight-on",
    typicalFraming: "head-and-shoulders",
    cameraDistance: "medium",
    lensStyle: "shallow-dof",
  },
  mannerisms: {
    gestureFrequency: "moderate",
    dominantHand: "right",
    signatureGestures: ["Holds product at eye level and rotates slowly", "Points index finger at camera when making a key claim", "Counts on fingers for lists"],
    handRestingPosition: "One hand on desk, other holding product or gesturing",
    defaultExpression: "slight-smile",
    eyebrowExpressiveness: "moderate",
    smileType: "half-smile",
    smileFrequency: "occasional",
    eyeContactPattern: "looks-at-product-then-camera",
    headMovementStyle: "gentle-nods",
    bodySwayPattern: "still",
    posture: "leaning-forward-engaged",
    productHoldingStyle: "Holds at chest level with both hands, turns to show ports and details, places on desk for size comparison",
    propUsage: ["Uses phone as size reference", "Occasionally pulls up benchmarks on monitor behind her"],
  },
  personality: {
    energyLevel: "moderate-steady",
    openingEnergyVsClosing: "builds-throughout",
    audienceAddressStyle: "direct-you",
    callToActionStyle: "value-proposition",
    ctaPlacement: "end-only",
    viewerEngagementTactics: ["Asks 'what do you think?' at end", "References previous video poll results", "Responds to top comment in next video"],
    typicalVideoStructure: "Quick verdict teaser → Unboxing → Design walkthrough → Benchmarks → Real-world testing → Final verdict → CTA",
    hookStyle: "Opens with a bold one-line take, then says 'let me explain why'",
    averageContentLength: "10min+",
    productIntroStyle: "Casual mention that it was sent for review, then immediately into hands-on experience",
    sponsorshipDisclosureStyle: "Clear 'This video is sponsored by X' upfront, then natural integration mid-content",
    authenticitySignals: ["Shows both pros and cons", "Compares to competitor products she owns", "Mentions if she'd buy it with her own money"],
    catchphrases: ["Let's get into it", "Here's my take", "The real question is"],
    verbalTics: ["Slight inhale before delivering a verdict"],
    vocabularyLevel: "technical-jargon",
    profanityLevel: "none",
    comfortableTopics: ["Consumer electronics", "Software tools", "Productivity setups", "Audio gear", "Laptops", "Smartphones"],
    offLimitTopics: ["Cryptocurrency", "Political commentary", "Gambling apps", "Fast fashion"],
  },
  brandGuidelines: {
    acceptedProductCategories: ["Technology", "Audio", "Software", "Productivity", "Gaming peripherals"],
    rejectedProductCategories: ["Crypto", "Gambling", "Tobacco", "Alcohol", "Fast fashion", "MLM"],
    competitorBlacklist: [],
    requiredDisclosures: ["#ad", "FTC-compliant sponsorship disclosure"],
    toneBoundaries: "No aggressive sales language, no clickbait claims, no 'limited time only' urgency tactics",
    messagingMustAvoid: ["Best ever made", "Guaranteed results", "You need this", "Kills the competition"],
    maxConcurrentLicenses: 3,
    exclusivityPeriodDays: 30,
    approvalRequired: true,
    allowedUsageChannels: ["social-media", "display-ads", "landing-pages"],
    geographicRestrictions: ["US", "Canada", "UK", "Australia"],
    licenseDurationOptions: [30, 60, 90],
    baseLicenseFee: 5000,
    extendedScriptMultiplier: 1.5,
    exclusivityPremium: 2.0,
    rushFeeMultiplier: 1.25,
  },
  sampleVideoUrls: ["https://youtube.com/watch?v=example1", "https://youtube.com/watch?v=example2"],
  sampleAudioUrls: ["https://example.com/maya-voice-sample.mp3"],
  referenceImageUrls: ["https://example.com/maya-headshot.jpg", "https://example.com/maya-studio.jpg"],
  onboardingComplete: true,
  profileCompleteness: 94,
  isVerified: true,
};

const JORDAN_PROFILE: CreatorProfile = {
  ...CREATORS[1],
  voice: {
    pitchRange: "mid-low",
    toneQuality: ["warm", "deep"],
    speakingPace: "moderate",
    averageWPM: 140,
    cadencePattern: "steady",
    volumeDynamics: "builds-up",
    accentRegion: "Atlanta, Georgia",
    accentIntensity: "moderate",
    fillerWords: ["you know", "like"],
    fillerFrequency: "occasional",
    signatureExpressions: ["Let's get after it", "Trust the process", "Your body will thank you"],
    greetingStyle: "What's going on everyone, Jordan here. Let's get after it today.",
    signOffPhrases: ["Stay consistent, stay patient", "I'll see you in the next one"],
    transitionPhrases: ["Now check this out", "Here's the key thing", "And the best part is"],
    emphasisPatterns: "Raises volume and slows pace when delivering motivational points, gets quieter for personal anecdotes",
    pronunciationNotes: "Slight Southern drawl on vowels, drops 'g' from '-ing' endings casually",
    humorStyle: ["self-deprecating", "observational"],
    humorFrequency: "frequent",
    laughStyle: "Big, full laugh — throws head back slightly",
    storytellingApproach: "anecdotal",
  },
  visual: {
    skinTone: "Deep brown",
    hairColor: "Black",
    hairStyle: "Fade with short top",
    facialHair: "Clean-shaven",
    eyeColor: "Dark brown",
    distinguishingFeatures: ["Visible tattoo on right forearm — geometric pattern", "Athletic build clearly visible"],
    buildType: "athletic",
    heightApprox: "6'1\" / 185cm",
    typicalWardrobe: ["Fitted athletic tank top", "Training joggers", "Cross-training shoes"],
    wardrobeColorPalette: ["black", "gray", "earth tones", "occasional neon accent"],
    accessorySignatures: ["Fitness tracker on left wrist", "Wireless earbuds around neck between takes"],
    makeupStyle: "none",
    makeupNotes: "",
    typicalBackgroundSetting: "Home gym with rack, dumbbells visible, concrete floor, motivational print on wall",
    backgroundColors: ["industrial gray", "black equipment"],
    lightingPreference: "natural-daylight",
    lightingNotes: "Large garage door provides natural side light, supplemented with overhead LEDs",
    preferredCameraAngle: "slight-below",
    typicalFraming: "waist-up",
    cameraDistance: "medium",
    lensStyle: "deep-focus",
  },
  mannerisms: {
    gestureFrequency: "expressive",
    dominantHand: "right",
    signatureGestures: ["Claps hands together before starting a point", "Flexes to demonstrate muscle group", "Points at camera with both index fingers"],
    handRestingPosition: "Hands on hips or arms crossed",
    defaultExpression: "warm-inviting",
    eyebrowExpressiveness: "very-expressive",
    smileType: "wide-toothy",
    smileFrequency: "frequent",
    eyeContactPattern: "direct-sustained",
    headMovementStyle: "dynamic",
    bodySwayPattern: "animated-rocking",
    posture: "upright-formal",
    productHoldingStyle: "Holds supplements at chest level, shakes container for emphasis, pours serving on camera",
    propUsage: ["Dumbbells for exercise demos", "Whiteboard for meal plan breakdowns", "Food scale"],
  },
  personality: {
    energyLevel: "high-enthusiastic",
    openingEnergyVsClosing: "starts-high-settles",
    audienceAddressStyle: "inclusive-we",
    callToActionStyle: "direct-ask",
    ctaPlacement: "beginning-and-end",
    viewerEngagementTactics: ["Asks viewers to share their PRs", "Weekly challenge callouts", "Responds to transformation DMs"],
    typicalVideoStructure: "Motivational hook → Today's topic → Demonstration → Nutrition tie-in → Recap → CTA",
    hookStyle: "Starts with a relatable struggle ('We've all been there...') then pivots to the solution",
    averageContentLength: "3-10min",
    productIntroStyle: "Weaves into his routine naturally — 'This is what I take before every session'",
    sponsorshipDisclosureStyle: "Quick upfront 'partnered with' mention, then uses product throughout as part of routine",
    authenticitySignals: ["Shows his own supplement cabinet", "References his training log data", "Mentions when he doesn't like something about a product"],
    catchphrases: ["Let's get after it", "No excuses, just results", "Trust the process"],
    verbalTics: ["Claps hands between sentences when excited"],
    vocabularyLevel: "conversational",
    profanityLevel: "mild-minced",
    comfortableTopics: ["Strength training", "Nutrition", "Supplements", "Recovery", "Mental health in fitness", "Body positivity"],
    offLimitTopics: ["Steroids/PEDs", "Extreme dieting", "Body shaming", "Unverified health claims"],
  },
  brandGuidelines: {
    acceptedProductCategories: ["Fitness equipment", "Supplements", "Athletic wear", "Wellness apps", "Healthy food brands"],
    rejectedProductCategories: ["Alcohol", "Tobacco", "Weight loss pills", "Gambling", "PED-adjacent products"],
    competitorBlacklist: [],
    requiredDisclosures: ["#ad", "#sponsored"],
    toneBoundaries: "Must be motivational, not shaming. No 'before/after' body shame tactics.",
    messagingMustAvoid: ["Lose weight fast", "Get shredded in 7 days", "Guaranteed six-pack"],
    maxConcurrentLicenses: 4,
    exclusivityPeriodDays: 14,
    approvalRequired: true,
    allowedUsageChannels: ["social-media", "display-ads"],
    geographicRestrictions: ["US"],
    licenseDurationOptions: [30, 60, 90],
    baseLicenseFee: 3500,
    extendedScriptMultiplier: 1.5,
    exclusivityPremium: 1.75,
    rushFeeMultiplier: 1.3,
  },
  sampleVideoUrls: ["https://youtube.com/watch?v=jordan1"],
  sampleAudioUrls: [],
  referenceImageUrls: ["https://example.com/jordan-gym.jpg"],
  onboardingComplete: true,
  profileCompleteness: 88,
  isVerified: true,
};

export const CREATOR_PROFILES: CreatorProfile[] = [MAYA_PROFILE, JORDAN_PROFILE];

const INITIAL_CAMPAIGNS: CampaignExpanded[] = [
  {
    id: "demo-1",
    creatorId: "1",
    brandName: "Hyperion Audio",
    campaignName: "Nova Pro Headphones Launch",
    productUrl: "https://hyperionaudio.com/nova-pro",
    targetAudience: "Tech enthusiasts aged 25–40 who prioritize audio quality for remote work and music production",
    script: `Hey everyone, I've been testing the Hyperion Nova Pro headphones for the past two weeks and I need to talk about them. The spatial audio engine genuinely changes how you experience music — it's not a gimmick. I ran them through my standard battery of lossless tracks and the soundstage is remarkably wide for a closed-back design. Active noise cancellation is on par with the top tier, and battery life held up at 38 hours in my testing. If you're serious about audio, these deserve your attention. Link below.`,
    status: "pending",
    estimatedCost: 5000,
    createdAt: "2026-03-08T14:30:00Z",
    videoFormat: "horizontal-16x9",
    stylePreset: "natural",
    variants: 1,
    voicePaceOverride: null,
    voiceEmotionOverride: null,
    backgroundOverride: null,
    wardrobeOverride: null,
    lightingOverride: null,
    assets: [],
    totalSpend: 5000,
    paymentStatus: "processing",
  },
  {
    id: "demo-2",
    creatorId: "3",
    brandName: "Lumina Skincare",
    campaignName: "Retinol Night Serum — Spring Push",
    productUrl: "https://luminaskin.co/retinol-serum",
    targetAudience: "Women aged 28–45 interested in clinical skincare, active on Instagram and TikTok",
    script: `Okay so I've been using the Lumina Retinol Night Serum for six weeks now, and I want to give you my honest breakdown. The formulation uses encapsulated retinol at 0.5% concentration, which is a smart choice — it minimizes irritation while still delivering results. I noticed visible improvement in texture around week three, and the fine lines around my eyes have softened considerably. It layers well under moisturizer without pilling, which if you know retinol products, that's rare. I'd recommend starting twice a week and building up. Link in my bio.`,
    status: "completed",
    estimatedCost: 7500,
    createdAt: "2026-02-20T10:00:00Z",
    videoFormat: "vertical-9x16",
    stylePreset: "natural",
    variants: 2,
    voicePaceOverride: null,
    voiceEmotionOverride: null,
    backgroundOverride: null,
    wardrobeOverride: null,
    lightingOverride: null,
    assets: [
      {
        id: "asset-1",
        campaignId: "demo-2",
        creatorId: "3",
        creatorName: "Priya Nair",
        campaignName: "Retinol Night Serum — Spring Push",
        brandName: "Lumina Skincare",
        format: "MP4 (H.264)",
        resolution: "1080 × 1920",
        durationSeconds: 45,
        fileSizeMB: 32.4,
        variantLabel: "A",
        stylePreset: "natural",
        licenseStartDate: "2026-02-22",
        licenseEndDate: "2026-05-22",
        licensedChannels: ["Instagram Reels", "TikTok", "Meta Ads"],
        licenseStatus: "active",
        createdAt: "2026-02-22T08:00:00Z",
      },
      {
        id: "asset-2",
        campaignId: "demo-2",
        creatorId: "3",
        creatorName: "Priya Nair",
        campaignName: "Retinol Night Serum — Spring Push",
        brandName: "Lumina Skincare",
        format: "MP4 (H.264)",
        resolution: "1080 × 1920",
        durationSeconds: 38,
        fileSizeMB: 28.1,
        variantLabel: "B",
        stylePreset: "casual",
        licenseStartDate: "2026-02-22",
        licenseEndDate: "2026-05-22",
        licensedChannels: ["Instagram Reels", "TikTok", "Meta Ads"],
        licenseStatus: "active",
        createdAt: "2026-02-22T08:00:00Z",
      },
    ],
    totalSpend: 7500,
    paymentStatus: "paid",
  },
  {
    id: "demo-3",
    creatorId: "2",
    brandName: "FitForge Supplements",
    campaignName: "Pre-Workout Launch — Ignite Formula",
    productUrl: "https://fitforge.com/ignite",
    targetAudience: "Male fitness enthusiasts aged 20–35, active gym-goers interested in strength and performance",
    script: `What's going on everyone, Jordan here. So FitForge sent me their new Ignite pre-workout and I've been running it for three weeks straight. First thing — the mixability is clean, no grit, no clumps. Flavor-wise the watermelon is legit. But here's what matters: 200mg caffeine, 6g citrulline, 3.2g beta-alanine. I hit a deadlift PR last week at 495, and my recovery between sets felt noticeably shorter. If you're looking for a pre-workout that actually delivers without the crash, check out Ignite. Link in my bio, code JORDAN for 15% off.`,
    status: "completed",
    estimatedCost: 3500,
    createdAt: "2026-01-15T09:00:00Z",
    videoFormat: "vertical-9x16",
    stylePreset: "high-energy",
    variants: 1,
    voicePaceOverride: 160,
    voiceEmotionOverride: "enthusiastic",
    backgroundOverride: null,
    wardrobeOverride: null,
    lightingOverride: null,
    assets: [
      {
        id: "asset-3",
        campaignId: "demo-3",
        creatorId: "2",
        creatorName: "Jordan Ellis",
        campaignName: "Pre-Workout Launch — Ignite Formula",
        brandName: "FitForge Supplements",
        format: "MP4 (H.264)",
        resolution: "1080 × 1920",
        durationSeconds: 42,
        fileSizeMB: 35.2,
        variantLabel: "A",
        stylePreset: "high-energy",
        licenseStartDate: "2026-01-18",
        licenseEndDate: "2026-04-18",
        licensedChannels: ["Instagram Reels", "TikTok"],
        licenseStatus: "active",
        createdAt: "2026-01-18T12:00:00Z",
      },
    ],
    totalSpend: 3500,
    paymentStatus: "paid",
  },
  {
    id: "demo-4",
    creatorId: "5",
    brandName: "Vaulted Finance",
    campaignName: "Roth IRA Awareness — Q1",
    productUrl: "https://vaultedfinance.com/roth-ira",
    targetAudience: "Young professionals aged 22–35 interested in retirement planning and tax-advantaged investing",
    script: `Let's talk about something most people put off until it's too late — your Roth IRA. Vaulted Finance just launched a feature that lets you open and fund a Roth in under five minutes, and they auto-invest into diversified index funds based on your risk tolerance. No minimums, no account fees. I've been using Vaulted for my own portfolio rebalancing, and the interface is genuinely the cleanest I've seen in the fintech space. If you're under 35 and not maxing out your Roth, you're leaving tax-free growth on the table. I'll link everything below.`,
    status: "approved",
    estimatedCost: 6000,
    createdAt: "2026-03-01T08:00:00Z",
    videoFormat: "horizontal-16x9",
    stylePreset: "studio",
    variants: 2,
    voicePaceOverride: null,
    voiceEmotionOverride: "calm",
    backgroundOverride: null,
    wardrobeOverride: null,
    lightingOverride: null,
    assets: [],
    totalSpend: 6000,
    paymentStatus: "processing",
  },
];

const INITIAL_EARNINGS: EarningsEntry[] = [
  { month: "Oct", revenue: 3000 },
  { month: "Nov", revenue: 5500 },
  { month: "Dec", revenue: 8200 },
  { month: "Jan", revenue: 11000 },
  { month: "Feb", revenue: 14500 },
  { month: "Mar", revenue: 18200 },
];

const INITIAL_LICENSES: ActiveLicense[] = [
  {
    id: "lic-1",
    brandName: "Lumina Skincare",
    campaignName: "Retinol Night Serum — Spring Push",
    creatorId: "3",
    startDate: "2026-02-22",
    endDate: "2026-05-22",
    channels: ["Instagram Reels", "TikTok", "Meta Ads"],
    status: "active",
    revenue: 7500,
  },
  {
    id: "lic-2",
    brandName: "FitForge Supplements",
    campaignName: "Pre-Workout Launch — Ignite Formula",
    creatorId: "2",
    startDate: "2026-01-18",
    endDate: "2026-04-18",
    channels: ["Instagram Reels", "TikTok"],
    status: "expiring-soon",
    revenue: 3500,
  },
  {
    id: "lic-3",
    brandName: "Vaulted Finance",
    campaignName: "Roth IRA Awareness — Q1",
    creatorId: "5",
    startDate: "2026-03-01",
    endDate: "2026-06-01",
    channels: ["YouTube", "Display Ads"],
    status: "active",
    revenue: 6000,
  },
];

const INITIAL_SPEND: SpendEntry[] = [
  { month: "Oct", spend: 5000, campaigns: 1 },
  { month: "Nov", spend: 8500, campaigns: 2 },
  { month: "Dec", spend: 12000, campaigns: 3 },
  { month: "Jan", spend: 15500, campaigns: 3 },
  { month: "Feb", spend: 22000, campaigns: 4 },
  { month: "Mar", spend: 18000, campaigns: 3 },
];

// ─── Store ─────────────────────────────────────────────────────────

interface AppState {
  // Data
  creators: Creator[];
  creatorProfiles: CreatorProfile[];
  campaigns: CampaignExpanded[];
  earnings: EarningsEntry[];
  notifications: Notification[];
  licenses: ActiveLicense[];
  brandSpend: SpendEntry[];

  // Onboarding state
  onboardingData: Partial<CreatorProfile>;
  onboardingStep: number;

  // Actions — campaigns
  addCampaign: (campaign: CampaignExpanded) => void;
  updateCampaignStatus: (id: string, status: CampaignExpanded["status"]) => void;

  // Actions — notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Notification) => void;

  // Actions — onboarding
  setOnboardingStep: (step: number) => void;
  updateOnboardingData: (data: Partial<CreatorProfile>) => void;
  completeOnboarding: () => void;

  // Actions — profiles
  updateCreatorProfile: (id: string, data: Partial<CreatorProfile>) => void;
}

export const useStore = create<AppState>((set) => ({
  creators: CREATORS,
  creatorProfiles: CREATOR_PROFILES,
  campaigns: INITIAL_CAMPAIGNS,
  earnings: INITIAL_EARNINGS,
  notifications: INITIAL_NOTIFICATIONS,
  licenses: INITIAL_LICENSES,
  brandSpend: INITIAL_SPEND,

  onboardingData: {},
  onboardingStep: 0,

  addCampaign: (campaign) =>
    set((state) => ({ campaigns: [...state.campaigns, campaign] })),

  updateCampaignStatus: (id, status) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  setOnboardingStep: (step) => set({ onboardingStep: step }),

  updateOnboardingData: (data) =>
    set((state) => ({
      onboardingData: { ...state.onboardingData, ...data },
    })),

  completeOnboarding: () =>
    set((state) => {
      const profile = state.onboardingData as CreatorProfile;
      return {
        creatorProfiles: [...state.creatorProfiles, { ...profile, onboardingComplete: true, isVerified: false, profileCompleteness: 100 }],
        onboardingData: {},
        onboardingStep: 0,
      };
    }),

  updateCreatorProfile: (id, data) =>
    set((state) => ({
      creatorProfiles: state.creatorProfiles.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),
}));
