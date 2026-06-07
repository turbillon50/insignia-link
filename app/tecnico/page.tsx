"use client"

import { useState } from "react"
import { Play, X, Calendar, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RouteMap } from "@/components/mobile/route-map"
import { StatusPill } from "@/components/mobile/status-pill"
import { serviceVisits, routeSummary, getClient, getTicket, priorityMeta } from "@/lib/mock-data"

const markers = [
  { id: "m1", top: "62%", left: "16%", label: "1", active: true },
  { id: "m2", top: "38%", left: "40%", label: "2" },
  { id: "m3", top: "50%", left: "61%", label: "3" },
  { id: "m4", top: "30%", left: "80%", label: "4" },
]

const current = serviceVisits[0]
const next = serviceVisits[1]

export default function TecnicoRutaPage() {
  const [started, setStarted] = useState(false)
  const currentClient = getClient(current.clientId)
  const currentTicket = getTicket(current.ticketId)
  const nextClient = getClient(next.clientId)

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
      <header className="pt-1">
        <h1 className="text-lg font-semibold">Mi ruta de hoy</h1>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" /> Viernes, 7 Jun 2024
        </p>
      </header>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="flex flex-col items-center gap-0.5 border-border/70 p-3">
          <span className="text-2xl font-bold text-primary">{routeSummary.services}</span>
          <span className="text-[0.65rem] text-muted-foreground">Servicios</span>
        </Card>
        <Card className="flex flex-col items-center gap-0.5 border-border/70 p-3">
          <span className="text-2xl font-bold text-success">{routeSummary.completed}</span>
          <span className="text-[0.65rem] text-muted-foreground">Completados</span>
        </Card>
        <Card className="flex flex-col items-center gap-0.5 border-border/70 p-3">
          <span className="text-2xl font-bold text-warning">{routeSummary.pending}</span>
          <span className="text-[0.65rem] text-muted-foreground">Pendientes</span>
        </Card>
      </div>

      <RouteMap markers={markers} />

      {/* Current service */}
      <Card className="border-primary/30 bg-primary/[0.04] p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary">Servicio actual</span>
          <StatusPill tone={currentTicket!.priority} label={priorityMeta[currentTicket!.priority].label} />
        </div>
        <p className="mt-1.5 text-base font-semibold">{currentClient?.name}</p>
        <p className="text-sm text-muted-foreground">{currentTicket?.title}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {current.window}
        </p>
        <Button
          className="mt-4 h-11 w-full"
          variant={started ? "outline" : "default"}
          onClick={() => setStarted((s) => !s)}
        >
          {started ? (
            <>Servicio en progreso…</>
          ) : (
            <>
              <Play className="h-4 w-4" /> Iniciar servicio
            </>
          )}
        </Button>
      </Card>

      {/* Next service */}
      <div>
        <p className="mb-2 text-sm font-medium text-muted-foreground">Siguiente servicio</p>
        <Card className="flex items-center justify-between border-border/70 p-4">
          <div>
            <p className="text-sm font-semibold">{nextClient?.name}</p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" /> {next.window}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full" aria-label="Descartar">
            <X className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  )
}
