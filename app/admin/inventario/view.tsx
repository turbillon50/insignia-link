"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Radio, Cctv, HardDrive, Cable, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/admin/stat-card"
import type { Client, Equipment } from "@/lib/mock-data"

const statusMeta: Record<string, { label: string; class: string }> = {
  disponible: { label: "Disponible", class: "bg-success/10 text-success" },
  asignado: { label: "Asignado", class: "bg-primary/10 text-primary" },
  mantenimiento: { label: "Mantenimiento", class: "bg-chart-3/15 text-chart-3" },
  baja: { label: "Baja", class: "bg-destructive/10 text-destructive" },
}
const cats = ["Radios", "Cámaras", "DVR/NVR", "Accesorios"]

export function InventarioView({ equipment, clients }: { equipment: Equipment[]; clients: Client[] }) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: "", category: "Radios", serial: "", stock: 1, status: "disponible" })

  const clientMap = useMemo(() => Object.fromEntries(clients.map((c) => [c.id, c])), [clients])
  const summary = useMemo(() => {
    const s = { radios: 0, cameras: 0, dvr: 0, accessories: 0 }
    for (const e of equipment) {
      if (e.category === "Radios") s.radios += e.stock
      else if (e.category === "Cámaras") s.cameras += e.stock
      else if (e.category === "DVR/NVR") s.dvr += e.stock
      else s.accessories += e.stock
    }
    return s
  }, [equipment])

  const list = equipment.filter(
    (e) => e.name.toLowerCase().includes(q.toLowerCase()) || (e.serial ?? "").toLowerCase().includes(q.toLowerCase()),
  )

  async function save() {
    if (!form.name) return
    setSaving(true)
    const res = await fetch("/api/equipment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, stock: Number(form.stock) }),
    })
    setSaving(false)
    if (res.ok) {
      setOpen(false)
      setForm({ name: "", category: "Radios", serial: "", stock: 1, status: "disponible" })
      router.refresh()
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Inventario</h1>
          <p className="text-sm text-muted-foreground">Control de equipo, stock y asignaciones</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" /> Nuevo movimiento
        </Button>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Radios" value={summary.radios} icon={Radio} />
        <StatCard label="Cámaras" value={summary.cameras} icon={Cctv} />
        <StatCard label="DVR/NVR" value={summary.dvr} icon={HardDrive} />
        <StatCard label="Accesorios" value={summary.accessories} icon={Cable} />
      </section>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar equipo o número de serie" className="pl-9" />
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Equipo</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Serie</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Asignado a</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {list.map((e) => {
                const meta = statusMeta[e.status] ?? statusMeta.disponible
                return (
                  <tr key={e.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.category}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.serial}</td>
                    <td className="px-4 py-3 tabular-nums">{e.stock}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.clientId ? clientMap[e.clientId]?.name : "—"}</td>
                    <td className="px-4 py-3">
                      <Badge className={meta.class}>{meta.label}</Badge>
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
              <h2 className="text-lg font-bold">Nuevo equipo</h2>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3">
              <Input placeholder="Nombre del equipo *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {cats.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <Input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
              </div>
              <Input placeholder="Número de serie" value={form.serial} onChange={(e) => setForm({ ...form, serial: e.target.value })} />
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="disponible">Disponible</option>
                <option value="asignado">Asignado</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="baja">Baja</option>
              </select>
              <Button className="w-full" onClick={save} disabled={saving || !form.name}>
                {saving ? "Guardando…" : "Registrar equipo"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
