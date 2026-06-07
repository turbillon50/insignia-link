"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Maximize2, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { clients } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

// Mexico bounding box for projecting lat/lng onto the map image.
const BOUNDS = { minLat: 14.5, maxLat: 32.7, minLng: -117.5, maxLng: -86.7 }
function project(lat: number, lng: number) {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * 100
  const y = ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * 100
  return { x, y }
}

export default function MapaPage() {
  const [selected, setSelected] = useState(clients[0].id)
  const active = clients.find((c) => c.id === selected)!

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-pretty text-2xl font-bold">Mapa de instalaciones</h1>
        <p className="text-sm text-muted-foreground">Ubicación de clientes y sitios activos</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          {/* Sidebar list */}
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar ubicación o cliente" className="pl-9" />
            </div>
            <div className="flex flex-col gap-2">
              {clients.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelected(c.id)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-colors",
                    selected === c.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <span className="h-2 w-2 rounded-full" style={{ background: c.account === "activa" ? "var(--chart-2)" : "var(--chart-3)" }} />
                  </div>
                  <p className="text-xs text-muted-foreground">{c.city}, {c.state}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Map */}
          <Card className="relative overflow-hidden p-0">
            <div className="relative aspect-[4/3] w-full bg-[#0a1530]">
              <Image src="/images/map-mexico-dark.png" alt="Mapa de México" fill priority className="object-cover opacity-90" />
              {clients.map((c) => {
                const { x, y } = project(c.lat, c.lng)
                const isActive = c.id === selected
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c.id)}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    aria-label={c.name}
                  >
                    <span className="relative flex">
                      {isActive && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                      )}
                      <MapPin
                        className={cn("relative drop-shadow", isActive ? "h-7 w-7 text-primary" : "h-5 w-5 text-chart-3")}
                        fill="currentColor"
                      />
                    </span>
                  </button>
                )
              })}
              <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-background/80 backdrop-blur" aria-label="Pantalla completa">
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Detail card */}
              <Card className="absolute bottom-3 left-3 w-64 p-4 shadow-xl">
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-muted-foreground">{active.city}, {active.state}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-muted/60 py-2">
                    <p className="text-base font-bold tabular-nums">{active.radios}</p>
                    <p className="text-[10px] text-muted-foreground">Radios</p>
                  </div>
                  <div className="rounded-lg bg-muted/60 py-2">
                    <p className="text-base font-bold tabular-nums">{active.cameras}</p>
                    <p className="text-[10px] text-muted-foreground">Cámaras</p>
                  </div>
                  <div className="rounded-lg bg-muted/60 py-2">
                    <p className="text-base font-bold tabular-nums">{active.dvr}</p>
                    <p className="text-[10px] text-muted-foreground">DVR</p>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
    </div>
  )
}
