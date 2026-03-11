"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Hexagon,
  LayoutGrid,
  Users,
  Megaphone,
  Video,
  FolderOpen,
  Receipt,
  DollarSign,
  FileCheck,
  UserCircle,
  Bell,
  Settings,
} from "lucide-react";
import { useStore } from "@/store";

const brandLinks: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean }[] = [
  { href: "/brand/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/brand", label: "Marketplace", icon: Users, exact: true },
  { href: "/brand/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/brand/studio", label: "Studio", icon: Video },
  { href: "/brand/assets", label: "Assets", icon: FolderOpen },
  { href: "/brand/spend", label: "Spend", icon: Receipt },
];

const creatorLinks: { href: string; label: string; icon: React.ComponentType<{ className?: string }>; exact?: boolean }[] = [
  { href: "/creator/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/creator/earnings", label: "Earnings", icon: DollarSign },
  { href: "/creator/licenses", label: "Licenses", icon: FileCheck },
  { href: "/creator/profile", label: "Profile", icon: UserCircle },
  { href: "/creator/settings", label: "Settings", icon: Settings },
];

export function Nav() {
  const pathname = usePathname();
  const isBrandSection = pathname.startsWith("/brand");
  const isCreatorSection = pathname.startsWith("/creator") || pathname.startsWith("/generate");
  const unreadCount = useStore((s) => s.notifications.filter((n) => !n.read).length);

  const links = isBrandSection ? brandLinks : creatorLinks;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Hexagon className="h-5 w-5 text-accent" strokeWidth={2.5} />
          <span className="text-sm font-semibold tracking-tight">Echelon</span>
        </Link>

        {/* Center Nav Links */}
        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
          {links.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] whitespace-nowrap transition-colors ${
                  isActive ? "text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <link.icon className="h-3.5 w-3.5" />
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-md bg-zinc-800/50"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Role Switcher */}
          <div className="flex items-center rounded-lg border border-zinc-800/60 overflow-hidden">
            <Link
              href="/brand/dashboard"
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                isBrandSection ? "bg-zinc-800 text-zinc-200" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Brand
            </Link>
            <Link
              href="/creator/dashboard"
              className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                isCreatorSection ? "bg-zinc-800 text-zinc-200" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Creator
            </Link>
          </div>

          {/* Notifications */}
          {isCreatorSection && (
            <Link
              href="/creator/notifications"
              className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          )}

          {/* Avatar */}
          <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
            DM
          </div>
        </div>
      </div>
    </nav>
  );
}
