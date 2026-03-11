export interface GeneratedAsset {
  id: string;
  campaignId: string;
  creatorId: string;
  creatorName: string;
  campaignName: string;
  brandName: string;
  format: string;
  resolution: string;
  durationSeconds: number;
  fileSizeMB: number;
  variantLabel: string;
  stylePreset: string;
  licenseStartDate: string;
  licenseEndDate: string;
  licensedChannels: string[];
  licenseStatus: "active" | "expired" | "revoked";
  createdAt: string;
}

export interface CampaignExpanded {
  id: string;
  creatorId: string;
  brandName: string;
  campaignName: string;
  productUrl: string;
  targetAudience: string;
  script: string;
  status: "draft" | "pending" | "approved" | "rejected" | "generating" | "completed";
  estimatedCost: number;
  createdAt: string;
  videoFormat: "vertical-9x16" | "horizontal-16x9" | "square-1x1";
  stylePreset: "natural" | "cinematic" | "studio" | "casual" | "high-energy" | "minimal";
  variants: number;
  voicePaceOverride: number | null;
  voiceEmotionOverride: "neutral" | "enthusiastic" | "calm" | "urgent" | null;
  backgroundOverride: string | null;
  wardrobeOverride: string | null;
  lightingOverride: string | null;
  assets: GeneratedAsset[];
  totalSpend: number;
  paymentStatus: "unpaid" | "processing" | "paid" | "refunded";
}

export interface SpendEntry {
  month: string;
  spend: number;
  campaigns: number;
}
