"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { tickets, getClient, getTechnician, priorityMeta, ticketStatusMeta } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const filters = [
  { id: "todos", label: "Todos" },
  { id: "abierto", label: "Abiertos" },
  { id: "en-proceso", label: "En proceso" },
  { id: "resuelto", label: "Resueltos" },
]

export default function AdminTicketsPage() {
  const [filter, setFilter] = useState("todos")
  const [q, setQ] = useState("")
  const list = tickets.filter((t) => {
    const matchFilter = filter === "todos" || t.status === filter
    const matchQ = t.title.toLowerCase().includes(q.toLowerCase()) || t.id.toLowerCase().includes(q.toLowerCase())
    return matchFilter && matchQ
  })

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Tickets</h1>
          <p className="text-sm text-muted-foreground">{tickets.length} tickets registrados</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Nuevo ticket
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1.5 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  filter === f.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar ticket" className="pl-9" />
          </div>
        </div>

        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Ticket</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Categoría</th>
                  <th className="px-4 py-3 font-medium">Prioridad</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium">Asignado</th>
                </tr>
              </thead>
              <tbody>
                {list.map((t) => {
                  const client = getClient(t.clientId)
                  const tech = t.assignedTo ? getTechnician(t.assignedTo) : null
                  return (
                    <tr key={t.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <p className="font-medium">{t.title}</p>
                        <p className="text-xs text-muted-foreground">#{t.id} · {t.createdAt}</p>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{client?.name}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs">{t.category}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={priorityMeta[t.priority].class}>{priorityMeta[t.priority].label}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={ticketStatusMeta[t.status].class}>{ticketStatusMeta[t.status].label}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {tech ? (
                          <span className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ background: tech.avatarColor }}>
                              {tech.initials}
                            </span>
                            <span className="text-xs">{tech.name}</span>
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">Sin asignar</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
    </div>
  )
}
