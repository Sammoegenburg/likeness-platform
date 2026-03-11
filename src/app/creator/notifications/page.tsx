"use client";

import { useStore } from "@/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bell, CheckCheck, Megaphone, DollarSign, Video, AlertTriangle, UserCircle } from "lucide-react";

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "campaign-request": Megaphone,
  "campaign-approved": Megaphone,
  "campaign-rejected": Megaphone,
  "asset-ready": Video,
  "payment-received": DollarSign,
  "license-expiring": AlertTriangle,
  "profile-update": UserCircle,
};

export default function NotificationsPage() {
  const notifications = useStore((s) => s.notifications);
  const markRead = useStore((s) => s.markNotificationRead);
  const markAllRead = useStore((s) => s.markAllNotificationsRead);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-zinc-500">{unread} unread notification{unread !== 1 ? "s" : ""}.</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map((notif, i) => {
          const Icon = TYPE_ICONS[notif.type] || Bell;
          const content = (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => !notif.read && markRead(notif.id)}
              className={`flex items-start gap-4 rounded-xl border p-4 transition-colors cursor-pointer ${
                notif.read
                  ? "border-zinc-800/40 bg-zinc-900/20"
                  : "border-zinc-800/60 bg-zinc-900/50 hover:bg-zinc-900/70"
              }`}
            >
              <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${notif.read ? "bg-zinc-800/50" : "bg-accent/10"}`}>
                <Icon className={`h-4 w-4 ${notif.read ? "text-zinc-500" : "text-accent"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm font-medium ${notif.read ? "text-zinc-400" : "text-zinc-200"}`}>{notif.title}</h3>
                  {!notif.read && <div className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />}
                </div>
                <p className="mt-0.5 text-xs text-zinc-500 line-clamp-2">{notif.message}</p>
                <p className="mt-1.5 text-[11px] text-zinc-600">
                  {new Date(notif.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          );

          return notif.actionUrl ? (
            <Link key={notif.id} href={notif.actionUrl}>{content}</Link>
          ) : (
            <div key={notif.id}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
