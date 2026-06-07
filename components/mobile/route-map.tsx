"use client"

import { Maximize2, Navigation } from "lucide-react"

interface MapMarker {
  id: string
  top: string
  left: string
  label?: string
  active?: boolean
  done?: boolean
}

export function RouteMap({ markers }: { markers: MapMarker[] }) {
  return (
    <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-border bg-[#0b1220]">
      <img
        src="/images/map-mexico-dark.png"
        alt="Mapa de la ruta del día"
        className="h-full w-full object-cover opacity-70"
        crossOrigin="anonymous"
      />
      {/* route line */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <polyline
          points="60,150 150,90 230,120 300,70"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2.5"
          strokeDasharray="6 5"
          opacity="0.8"
        />
      </svg>
      {markers.map((m) => (
        <div
          key={m.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: m.top, left: m.left }}
        >
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold shadow-lg ring-2 ring-white/20 ${
              m.active
                ? "bg-primary text-primary-foreground"
                : m.done
                  ? "bg-success text-white"
                  : "bg-card text-foreground"
            }`}
          >
            {m.label}
          </div>
          {m.active && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/40" />
          )}
        </div>
      ))}
      <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-card/90 text-foreground shadow" aria-label="Expandir mapa">
        <Maximize2 className="h-4 w-4" />
      </button>
      <button className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-lg">
        <Navigation className="h-3.5 w-3.5" /> Navegar
      </button>
    </div>
  )
}
