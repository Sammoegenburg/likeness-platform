import { Hexagon } from "lucide-react";
import Link from "next/link";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="border-b border-zinc-800/60 bg-zinc-950/80">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Hexagon className="h-5 w-5 text-accent" strokeWidth={2.5} />
            <span className="text-sm font-semibold tracking-tight">Echelon</span>
          </Link>
          <span className="text-xs text-zinc-500">Creator Onboarding</span>
        </div>
      </div>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}
