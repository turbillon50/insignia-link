"use client"

import type { ReactNode } from "react"
import { MobileStatusBar } from "./mobile-status-bar"

export function StandaloneMobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-muted/40 md:flex md:items-center md:justify-center md:py-8">
      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-background shadow-2xl md:min-h-[860px] md:rounded-[2.25rem] md:border md:border-border md:ring-1 md:ring-black/5">
        <MobileStatusBar />
        <div className="flex flex-1 flex-col overflow-y-auto pb-[env(safe-area-inset-bottom)]">{children}</div>
      </div>
    </div>
  )
}
