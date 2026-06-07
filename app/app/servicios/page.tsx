"use client"

import { Radio, Cctv, HardDrive, MapPin, CheckCircle2, Clock, Wrench } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { StatusPill } from "@/components/mobile/status-pill"
import { clients } from "@/lib/mock-data"

const client = clients[0]

const services = [
  { label: "Radiocomunicación", icon: Radio, units: client.radios, health: 96 },
  { label: "Videovigilancia CCTV", icon: Cctv, units: client.cameras, health: 88 },
  { label: "Grabación DVR/NVR", icon: HardDrive, units: client.dvr, health: 92 },
  { label: "Sitios monitoreados", icon: MapPin, units: client.sites, health: 100 },
]

const timeline = [
  { title: "Mantenimiento preventivo CCTV", date: "12 Jul 2024", status: "pendiente" as const, icon: Clock },
  { title: "Revisión de radios — recepción", date: "28 Jun 2024", status: "completado" as const, icon: CheckCircle2 },
  { title: "Actualización firmware DVR", date: "10 Jun 2024", status: "completado" as const, icon: CheckCircle2 },
  { title: "Instalación 4 cámaras nuevas", date: "22 May 2024", status: "completado" as const, icon: CheckCircle2 },
]

export default function ServiciosPage() {
  return (
    <div className="flex flex-col gap-5 px-4 pb-6 pt-2">
      <header className="pt-1">
        <h1 className="text-lg font-semibold">Mis servicios</h1>
        <p className="text-sm text-muted-foreground">{client.name}</p>
      </header>

      <section className="flex flex-col gap-2.5">
        {services.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="border-border/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.units} unidades activas</p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-success">{s.health}%</span>
              </div>
              <Progress value={s.health} className="mt-3 h-1.5" />
            </Card>
          )
        })}
      </section>

      <section>
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <Wrench className="h-4 w-4" /> Historial de mantenimiento
        </h2>
        <div className="relative flex flex-col gap-1 pl-2">
          {timeline.map((item, i) => {
            const Icon = item.icon
            const done = item.status === "completado"
            return (
              <div key={i} className="relative flex gap-3 pb-5 last:pb-0">
                {i < timeline.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-full w-px bg-border" />
                )}
                <span
                  className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    done ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="flex-1 pt-0.5">
                  <p className="text-sm font-medium">{item.title}</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                    <StatusPill tone={item.status} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
