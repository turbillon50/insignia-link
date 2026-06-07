"use client"

import { CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { tickets, getClient } from "@/lib/mock-data"

const history = tickets.filter((t) => t.status === "resuelto" || t.status === "completado")

export default function HistorialPage() {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
      <header className="pt-1">
        <h1 className="text-lg font-semibold">Historial</h1>
        <p className="text-sm text-muted-foreground">Servicios completados este mes</p>
      </header>

      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Servicios", value: 39 },
          { label: "Completados", value: 36 },
          { label: "Eficiencia", value: "92%" },
        ].map((s) => (
          <Card key={s.label} className="flex flex-col items-center gap-0.5 border-border/70 p-3">
            <span className="text-xl font-bold text-primary">{s.value}</span>
            <span className="text-[0.65rem] text-muted-foreground">{s.label}</span>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {history.map((t) => {
          const client = getClient(t.clientId)
          return (
            <Card key={t.id} className="flex items-center gap-3 border-border/70 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/15">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="text-xs text-muted-foreground">
                  {client?.name} · {t.createdAt}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">#{t.id}</span>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
