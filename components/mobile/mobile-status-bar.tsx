"use client"

import { useEffect, useState } from "react"
import { Signal, Wifi, BatteryFull } from "lucide-react"

export function MobileStatusBar({ dark = false }: { dark?: boolean }) {
  const [time, setTime] = useState("9:41")

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className={`flex items-center justify-between px-6 pt-2.5 pb-1 text-xs font-semibold ${
        dark ? "text-white" : "text-foreground"
      }`}
    >
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Signal className="h-3.5 w-3.5" />
        <Wifi className="h-3.5 w-3.5" />
        <BatteryFull className="h-4 w-4" />
      </div>
    </div>
  )
}
