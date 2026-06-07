"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TabItem {
  href: string
  label: string
  icon: LucideIcon
}

export function MobileTabBar({ tabs }: { tabs: TabItem[] }) {
  const pathname = usePathname()

  return (
    <nav className="sticky bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-xl">
      <div className="flex items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href ||
            (tab.href !== "/app" &&
              tab.href !== "/tecnico" &&
              pathname.startsWith(tab.href))
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-[0.65rem] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                  active && "bg-primary/15",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
