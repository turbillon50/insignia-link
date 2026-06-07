"use client"

import { useState } from "react"
import Link from "next/link"
import { Radio, Cctv, HardDrive, MapPin, ChevronRight, Plus, Bell, CalendarClock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InsigniaMark } from "@/components/brand/insignia-logo"
import { StatusPill } from "@/components/mobile/status-pill"
import { clients, tickets, ticketStatusMeta } from "@/lib/mock-data"

const client = clients[0] // Hotel Xcaret México

const summary = [
  { label: "Radios", value: client.radios, icon: Radio },
  { label: "Cámaras", value: client.cameras, icon: Cctv },
  { label: "DVR/NVR", value: client.dvr, icon: HardDrive },
  { label: "Sitios", value: client.sites, icon: MapPin },
]

const myTickets = tickets.filter((t) => t.clientId === client.id)

export default function ClientPortalHome() {
  const [tab, setTab] = useState<"resumen" | "actividad">("resumen")

  return (
    <div className="flex flex-col gap-5 px-4 pb-6 pt-2">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
            <InsigniaMark className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-tight">{client.name}</h1>
            <StatusPill tone="disponible" label="Cuenta activa" showDot />
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label="Notificaciones">
          <Bell className="h-5 w-5" />
        </Button>
      </header>

      {/* Service summary */}
      <section>
        <h2 className="mb-3 text-sm font-medium text-muted-foreground">Resumen de mi servicio</h2>
        <div className="grid grid-cols-4 gap-2">
          {summary.map((s) => {
            const Icon = s.icon
            return (
              <Card key={s.label} className="flex flex-col items-center gap-1 border-border/70 p-3">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-xl font-semibold tabular-nums">{s.value}</span>
                <span className="text-[0.65rem] text-muted-foreground">{s.label}</span>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Next maintenance */}
      <Card className="flex items-center gap-4 border-border/70 bg-gradient-to-br from-primary/8 to-transparent p-4">
        <div className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <span className="text-lg font-bold leading-none">12</span>
          <span className="text-[0.6rem] uppercase">Jul</span>
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
            <CalendarClock className="h-3.5 w-3.5" /> Próximo mantenimiento
          </p>
          <p className="text-sm font-medium">Mantenimiento preventivo</p>
          <p className="text-xs text-muted-foreground">CCTV · Sistema principal</p>
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </Card>

      {/* My tickets */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-muted-foreground">Mis tickets</h2>
          <Link href="/app/tickets" className="text-xs font-medium text-primary">
            Ver todos
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          {myTickets.map((t) => {
            const meta = ticketStatusMeta[t.status]
            return (
              <Card key={t.id} className="flex items-center justify-between border-border/70 p-3.5">
                <div>
                  <p className="text-xs text-muted-foreground">#{t.id}</p>
                  <p className="text-sm font-medium">{t.title}</p>
                </div>
                <StatusPill tone={t.status === "en-proceso" ? "proceso" : t.status} label={meta.label} />
              </Card>
            )
          })}
        </div>
      </section>

      <Button render={<Link href="/app/tickets/nuevo" />} size="lg" className="h-12 w-full text-base">
        <Plus className="h-5 w-5" /> Nuevo ticket
      </Button>
    </div>
  )
}
