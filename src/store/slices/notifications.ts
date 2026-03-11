export interface Notification {
  id: string;
  type: "campaign-request" | "campaign-approved" | "campaign-rejected" | "asset-ready" | "payment-received" | "license-expiring" | "profile-update";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl: string | null;
}

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "campaign-request",
    title: "New licensing request",
    message: "Hyperion Audio wants to license your likeness for the Nova Pro Headphones Launch campaign.",
    read: false,
    createdAt: "2026-03-08T14:30:00Z",
    actionUrl: "/creator/review/demo-1",
  },
  {
    id: "n2",
    type: "payment-received",
    title: "Payment received",
    message: "You received $7,500 from Lumina Skincare for the Retinol Night Serum campaign.",
    read: false,
    createdAt: "2026-03-06T09:15:00Z",
    actionUrl: "/creator/earnings",
  },
  {
    id: "n3",
    type: "license-expiring",
    title: "License expiring soon",
    message: "Your license with FitForge for the Pre-Workout Launch campaign expires in 7 days.",
    read: true,
    createdAt: "2026-03-05T11:00:00Z",
    actionUrl: "/creator/licenses",
  },
  {
    id: "n4",
    type: "asset-ready",
    title: "Asset generation complete",
    message: "Your AI-generated ad for Evergreen Supplements is ready for review.",
    read: true,
    createdAt: "2026-03-03T16:45:00Z",
    actionUrl: "/generate/demo-2",
  },
  {
    id: "n5",
    type: "campaign-approved",
    title: "Campaign approved",
    message: "You approved the Hyperion Audio campaign. Video generation is underway.",
    read: true,
    createdAt: "2026-03-01T10:20:00Z",
    actionUrl: null,
  },
];
