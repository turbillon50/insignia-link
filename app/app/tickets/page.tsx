"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusPill } from "@/components/mobile/status-pill"
import { tickets, getClient, priorityMeta, ticketStatusMeta } from "@/lib/mock-data"

const filters = [
  { key: "todos", label: "Todos" },
  { key: "abierto", label: "Abiertos" },
  { key: "en-proceso", label: "En proceso" },
  { key: "resueltos", label: "Resueltos" },
] as const

export default function TicketsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("todos")

  const filtered = tickets.filter((t) => {
    if (filter === "todos") return true
    if (filter === "resueltos") return t.status === "resuelto" || t.status === "completado"
    return t.status === filter
  })

  const counts = {
    todos: tickets.length,
    abierto: tickets.filter((t) => t.status === "abierto").length,
    "en-proceso": tickets.filter((t) => t.status === "en-proceso").length,
    resueltos: tickets.filter((t) => t.status === "resuelto" || t.status === "completado").length,
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
      <header className="flex items-center gap-3">
        <Button render={<Link href="/app" />} variant="ghost" size="icon" className="rounded-full" aria-label="Volver">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Tickets</h1>
      </header>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === f.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {f.label}
            <span className={filter === f.key ? "opacity-80" : "opacity-60"}>{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {/* Ticket cards */}
      <div className="flex flex-col gap-2.5">
        {filtered.map((t) => {
          const client = getClient(t.clientId)
          return (
            <Card key={t.id} className="border-border/70 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">#{t.id}</span>
                  <StatusPill tone={t.priority} label={priorityMeta[t.priority].label} />
                </div>
                <span className="text-[0.7rem] text-muted-foreground">{t.createdAt}</span>
              </div>
              <p className="mt-1.5 text-sm font-semibold">{t.title}</p>
              <p className="text-xs text-muted-foreground">{client?.name}</p>
              <div className="mt-3 flex items-center justify-between">
                <StatusPill
                  tone={t.status === "en-proceso" ? "proceso" : t.status}
                  label={ticketStatusMeta[t.status].label}
                  showDot
                />
                <span className="text-[0.7rem] text-muted-foreground">{t.category}</span>
              </div>
            </Card>
          )
        })}
      </div>

      <Button render={<Link href="/app/tickets/nuevo" />} size="lg" className="h-12 w-full text-base">
        <Plus className="h-5 w-5" /> Nuevo ticket
      </Button>
    </div>
  )
}
