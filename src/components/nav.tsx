"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, UserCircle, Hexagon } from "lucide-react";

const brandLinks = [
  { href: "/brand", label: "Marketplace", icon: LayoutGrid },
];

const creatorLinks = [
  { href: "/creator/dashboard", label: "Dashboard", icon: UserCircle },
];

export function Nav() {
  const pathname = usePathname();
  const isBrand = pathname.startsWith("/brand");
  const isCreator = pathname.startsWith("/creator") || pathname.startsWith("/generate");

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <Hexagon className="h-5 w-5 text-accent" strokeWidth={2.5} />
          <span className="text-sm font-semibold tracking-tight">Echelon</span>
        </Link>

        <div className="flex items-center gap-1">
          {brandLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              active={isBrand}
            />
          ))}
          {creatorLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              active={isCreator}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-400">
            DM
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
        active
          ? "text-zinc-100"
          : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-0 rounded-md bg-zinc-800/50"
          style={{ zIndex: -1 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}
