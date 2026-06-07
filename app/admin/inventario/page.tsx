"use client"

import { useState } from "react"
import { Plus, Search, Radio, Cctv, HardDrive, Cable } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/admin/stat-card"
import { equipment, inventorySummary, getClient } from "@/lib/mock-data"

const statusMeta: Record<string, { label: string; class: string }> = {
  disponible: { label: "Disponible", class: "bg-success/10 text-success" },
  asignado: { label: "Asignado", class: "bg-primary/10 text-primary" },
  mantenimiento: { label: "Mantenimiento", class: "bg-chart-3/15 text-chart-3" },
  baja: { label: "Baja", class: "bg-destructive/10 text-destructive" },
}

export default function AdminInventarioPage() {
  const [q, setQ] = useState("")
  const list = equipment.filter((e) => e.name.toLowerCase().includes(q.toLowerCase()) || e.serial.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Inventario</h1>
          <p className="text-sm text-muted-foreground">Control de equipo, stock y asignaciones</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Nuevo movimiento
        </Button>
      </div>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Radios" value={inventorySummary.radios} icon={Radio} />
          <StatCard label="Cámaras" value={inventorySummary.cameras} icon={Cctv} />
          <StatCard label="DVR/NVR" value={inventorySummary.dvr} icon={HardDrive} />
          <StatCard label="Accesorios" value={inventorySummary.accessories} icon={Cable} />
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
                {list.map((e) => (
                  <tr key={e.id} className="border-b border-border/60 last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.category}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.serial}</td>
                    <td className="px-4 py-3 tabular-nums">{e.stock}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.clientId ? getClient(e.clientId)?.name : "—"}</td>
                    <td className="px-4 py-3">
                      <Badge className={statusMeta[e.status].class}>{statusMeta[e.status].label}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
    </div>
  )
}
