"use client"

import { useEffect, useState } from "react"
import { InsigniaMark } from "@/components/brand/insignia-logo"
import { cn } from "@/lib/utils"

export function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("insignia-splash-seen")) {
      setVisible(false)
      return
    }
    const fadeTimer = setTimeout(() => setFading(true), 1900)
    const hideTimer = setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem("insignia-splash-seen", "1")
    }, 2400)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0e1626] transition-opacity duration-500",
        fading ? "opacity-0" : "opacity-100",
      )}
    >
      <div className="relative flex items-center justify-center">
        {/* expanding sonar rings */}
        <span className="absolute h-24 w-24 animate-ping rounded-full bg-primary/20 [animation-duration:1.8s]" />
        <span className="absolute h-40 w-40 animate-ping rounded-full bg-primary/10 [animation-duration:2.2s]" />
        <div className="animate-in-up">
          <InsigniaMark className="h-20 w-20 text-primary drop-shadow-[0_0_24px_rgba(59,130,246,0.6)]" />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center animate-in-up [animation-delay:200ms]">
        <span className="font-heading text-2xl font-extrabold tracking-tight text-white">
          INSIGNIA
        </span>
        <span className="text-xs font-bold tracking-[0.4em] text-primary">
          LINK
        </span>
      </div>
      <p className="mt-6 text-sm text-white/50 animate-in-up [animation-delay:400ms]">
        Conectamos tu mundo
      </p>
      <div className="absolute bottom-16 h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-full origin-left animate-[load_2s_ease-in-out] bg-primary" />
      </div>
      <style jsx>{`
        @keyframes load {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  )
}
