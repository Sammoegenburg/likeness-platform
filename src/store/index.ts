import { create } from "zustand";

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

export interface Campaign {
  id: string;
  creatorId: string;
  brandName: string;
  campaignName: string;
  productUrl: string;
  targetAudience: string;
  script: string;
  status: "pending" | "approved" | "rejected" | "generating" | "completed";
  estimatedCost: number;
  createdAt: string;
}

export interface EarningsEntry {
  month: string;
  revenue: number;
}

interface AppState {
  creators: Creator[];
  campaigns: Campaign[];
  earnings: EarningsEntry[];
  addCampaign: (campaign: Campaign) => void;
  updateCampaignStatus: (id: string, status: Campaign["status"]) => void;
}

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

const INITIAL_CAMPAIGNS: Campaign[] = [
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

export const useStore = create<AppState>((set) => ({
  creators: CREATORS,
  campaigns: INITIAL_CAMPAIGNS,
  earnings: INITIAL_EARNINGS,
  addCampaign: (campaign) =>
    set((state) => ({ campaigns: [...state.campaigns, campaign] })),
  updateCampaignStatus: (id, status) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    })),
}));
