"use client"

import { useState } from "react"
import { Ticket, Wrench, FileText, Settings2, BellOff } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { notifications as seed } from "@/lib/mock-data"

const iconMap = {
  ticket: Ticket,
  servicio: Wrench,
  cotizacion: FileText,
  sistema: Settings2,
}

export default function NotificacionesPage() {
  const [items, setItems] = useState(seed)
  const unread = items.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
      <header className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-lg font-semibold">Notificaciones</h1>
          <p className="text-sm text-muted-foreground">{unread} sin leer</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setItems((p) => p.map((n) => ({ ...n, read: true })))}>
          Marcar todas
        </Button>
      </header>

      <div className="flex flex-col gap-2.5">
        {items.map((n) => {
          const Icon = iconMap[n.type]
          return (
            <Card
              key={n.id}
              onClick={() => setItems((p) => p.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
              className={`flex cursor-pointer gap-3 border-border/70 p-4 transition-colors ${
                n.read ? "" : "bg-primary/[0.04]"
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </div>
                <p className="text-xs text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-[0.7rem] text-muted-foreground/70">{n.time}</p>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-xs text-muted-foreground">
        <BellOff className="h-4 w-4" /> No hay más notificaciones
      </div>
    </div>
  )
}
