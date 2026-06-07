"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { priorityMeta, ticketStatusMeta } from "@/lib/mock-data"
import type { Client, Technician, Ticket } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const filters = [
  { id: "todos", label: "Todos" },
  { id: "abierto", label: "Abiertos" },
  { id: "en-proceso", label: "En proceso" },
  { id: "resuelto", label: "Resueltos" },
]
const statuses = ["abierto", "en-proceso", "resuelto", "completado"]
const categories = ["CCTV", "Radio", "DVR/NVR", "Acceso", "Red"]

export function TicketsView({
  tickets,
  clients,
  technicians,
}: {
  tickets: Ticket[]
  clients: Client[]
  technicians: Technician[]
}) {
  const router = useRouter()
  const [filter, setFilter] = useState("todos")
  const [q, setQ] = useState("")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [busy, setBusy] = useState<string | null>(null)
  const [form, setForm] = useState({ title: "", clientId: "", priority: "media", category: "CCTV", description: "" })

  const clientMap = useMemo(() => Object.fromEntries(clients.map((c) => [c.id, c])), [clients])
  const techMap = useMemo(() => Object.fromEntries(technicians.map((t) => [t.id, t])), [technicians])

  const list = tickets.filter((t) => {
    const matchFilter = filter === "todos" || t.status === filter
    const matchQ = t.title.toLowerCase().includes(q.toLowerCase()) || t.id.toLowerCase().includes(q.toLowerCase())
    return matchFilter && matchQ
  })

  async function patch(id: string, body: Record<string, any>) {
    setBusy(id)
    await fetch("/api/tickets", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...body }),
    })
    setBusy(null)
    router.refresh()
  }

  async function create() {
    if (!form.title) return
    setSaving(true)
    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      setOpen(false)
      setForm({ title: "", clientId: "", priority: "media", category: "CCTV", description: "" })
      router.refresh()
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Tickets</h1>
          <p className="text-sm text-muted-foreground">{tickets.length} tickets registrados</p>
        </div>
        <Button onClick={() => setOpen(true)}>
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
                const client = t.clientId ? clientMap[t.clientId] : null
                const pMeta = priorityMeta[t.priority] ?? { label: t.priority, class: "" }
                const sMeta = ticketStatusMeta[t.status] ?? { label: t.status, class: "" }
                return (
                  <tr key={t.id} className={cn("border-b border-border/60 last:border-0 hover:bg-muted/30", busy === t.id && "opacity-50")}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{t.title}</p>
                      <p className="text-xs text-muted-foreground">#{t.id} · {t.createdAt}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{client?.name ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-muted px-2 py-0.5 text-xs">{t.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={pMeta.class}>{pMeta.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={t.status}
                        onChange={(e) => patch(t.id, { status: e.target.value })}
                        className={cn("rounded-md border border-input bg-background px-2 py-1 text-xs font-medium", sMeta.class)}
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{ticketStatusMeta[s as keyof typeof ticketStatusMeta]?.label ?? s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={t.assignedTo ?? ""}
                        onChange={(e) => patch(t.id, { assignedTo: e.target.value })}
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                      >
                        <option value="">Sin asignar</option>
                        {technicians.map((tech) => (
                          <option key={tech.id} value={tech.id}>{tech.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4" onClick={() => setOpen(false)}>
          <Card className="w-full max-w-md rounded-b-none p-5 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Nuevo ticket</h2>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <Input placeholder="Título del ticket *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })}>
                <option value="">Selecciona cliente</option>
                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <textarea
                placeholder="Descripción"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <Button className="w-full" onClick={create} disabled={saving || !form.title}>
                {saving ? "Creando…" : "Crear ticket"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
