"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Search, Plus, Radio, Cctv, HardDrive, Cable } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StandaloneMobileFrame } from "@/components/mobile/standalone-mobile-frame"
import { StatusPill } from "@/components/mobile/status-pill"
import { equipment, inventorySummary } from "@/lib/mock-data"

const categories = [
  { label: "Radios", value: inventorySummary.radios, icon: Radio },
  { label: "Cámaras", value: inventorySummary.cameras, icon: Cctv },
  { label: "DVR/NVR", value: inventorySummary.dvr, icon: HardDrive },
  { label: "Accesorios", value: inventorySummary.accessories, icon: Cable },
]

const categoryIcon: Record<string, typeof Radio> = {
  Radios: Radio,
  Cámaras: Cctv,
  "DVR/NVR": HardDrive,
  Accesorios: Cable,
}

export default function InventarioPage() {
  const [query, setQuery] = useState("")
  const filtered = equipment.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <StandaloneMobileFrame>
      <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
        <header className="flex items-center gap-3">
          <Button render={<Link href="/" />} variant="ghost" size="icon" className="rounded-full" aria-label="Volver">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Inventario</h1>
        </header>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar equipo"
            className="pl-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {categories.map((c) => {
            const Icon = c.icon
            return (
              <Card key={c.label} className="flex items-center gap-3 border-border/70 p-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold tabular-nums">{c.value}</p>
                  <p className="text-[0.65rem] text-muted-foreground">{c.label}</p>
                </div>
              </Card>
            )
          })}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-muted-foreground">Equipos recientes</p>
          <div className="flex flex-col gap-2">
            {filtered.map((e) => {
              const Icon = categoryIcon[e.category]
              return (
                <Card key={e.id} className="flex items-center gap-3 border-border/70 p-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{e.name}</p>
                    <p className="text-[0.7rem] text-muted-foreground">Serie: {e.serial}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold tabular-nums">{e.stock}</span>
                    <StatusPill tone={e.status === "disponible" ? "disponible" : "pendiente"} label={e.status} />
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <Button size="lg" className="h-12 w-full text-base">
          <Plus className="h-5 w-5" /> Nuevo movimiento
        </Button>
      </div>
    </StandaloneMobileFrame>
  )
}
