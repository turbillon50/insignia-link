"use client"

import { useState } from "react"
import { Bell, Ticket, Truck, FileCheck2, Settings2, Check, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { notifications as initialNotifications, type Notification } from "@/lib/mock-data"

const typeMeta: Record<Notification["type"], { label: string; icon: typeof Bell; class: string }> = {
  ticket: { label: "Ticket", icon: Ticket, class: "bg-rose-500/10 text-rose-500" },
  servicio: { label: "Servicio", icon: Truck, class: "bg-primary/10 text-primary" },
  cotizacion: { label: "Cotización", icon: FileCheck2, class: "bg-emerald-500/10 text-emerald-500" },
  sistema: { label: "Sistema", icon: Settings2, class: "bg-amber-500/10 text-amber-500" },
}

const filters = ["Todas", "No leídas", "Ticket", "Servicio", "Cotización", "Sistema"] as const

export default function AdminNotificacionesPage() {
  const [items, setItems] = useState(initialNotifications)
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todas")

  const filtered = items.filter((n) => {
    if (filter === "Todas") return true
    if (filter === "No leídas") return !n.read
    return typeMeta[n.type].label === filter
  })

  const unread = items.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Centro de notificaciones</h1>
          <p className="text-sm text-muted-foreground">
            {unread > 0 ? `${unread} notificaciones sin leer` : "Todo al día"}
          </p>
        </div>
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
        >
          <Check className="h-4 w-4" />
          Marcar todas como leídas
        </Button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="h-4 w-4 shrink-0 text-muted-foreground" />
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Bell className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No hay notificaciones en esta vista</p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((n) => {
              const meta = typeMeta[n.type]
              const Icon = meta.icon
              return (
                <li
                  key={n.id}
                  className={cn(
                    "flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted/40",
                    !n.read && "bg-primary/[0.03]",
                  )}
                >
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", meta.class)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium leading-tight">{n.title}</p>
                      {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="No leída" />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Badge variant="secondary" className="text-[11px]">{meta.label}</Badge>
                      <span className="text-xs text-muted-foreground">{n.time}</span>
                    </div>
                  </div>
                  {!n.read && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="shrink-0 text-xs"
                      onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
                    >
                      Marcar leída
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </Card>
    </div>
  )
}
