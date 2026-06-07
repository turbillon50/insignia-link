"use client"

import { Clock, MapPin, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { StatusPill } from "@/components/mobile/status-pill"
import { serviceVisits, getClient, getTicket, priorityMeta } from "@/lib/mock-data"

const statusTone: Record<string, string> = {
  "en-progreso": "proceso",
  pendiente: "pendiente",
  completado: "completado",
  "en-ruta": "proceso",
}

export default function TecnicoServiciosPage() {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
      <header className="pt-1">
        <h1 className="text-lg font-semibold">Servicios asignados</h1>
        <p className="text-sm text-muted-foreground">{serviceVisits.length} servicios en tu ruta</p>
      </header>

      <div className="flex flex-col gap-2.5">
        {serviceVisits.map((v) => {
          const client = getClient(v.clientId)
          const ticket = getTicket(v.ticketId)
          return (
            <Card key={v.id} className="border-border/70 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {v.order}
                  </span>
                  <span className="text-xs font-semibold text-primary">#{ticket?.id}</span>
                </div>
                <StatusPill tone={statusTone[v.status]} />
              </div>
              <p className="mt-2 text-sm font-semibold">{ticket?.title}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> {client?.name}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {v.window}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-primary">
                  Ver detalle <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
