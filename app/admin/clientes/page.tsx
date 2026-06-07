"use client"

import { useState } from "react"
import { Search, Plus, Phone, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { clients } from "@/lib/mock-data"

const accountMeta: Record<string, { label: string; class: string }> = {
  activa: { label: "Activa", class: "bg-success/10 text-success" },
  prospecto: { label: "Prospecto", class: "bg-chart-3/15 text-chart-3" },
  suspendida: { label: "Suspendida", class: "bg-destructive/10 text-destructive" },
}

export default function ClientesPage() {
  const [q, setQ] = useState("")
  const filtered = clients.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.city.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-muted-foreground">{clients.length} cuentas registradas</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Nuevo cliente
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar cliente o ciudad" className="pl-9" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => {
          const meta = accountMeta[c.account]
          return (
            <Card key={c.id} className="p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.city}, {c.state}</p>
                </div>
                <Badge className={meta.class}>{meta.label}</Badge>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2 text-center">
                {[["Radios", c.radios], ["Cámaras", c.cameras], ["DVR", c.dvr], ["Sitios", c.sites]].map(([l, v]) => (
                  <div key={l as string} className="rounded-lg bg-muted/50 py-2">
                    <p className="text-sm font-bold tabular-nums">{v}</p>
                    <p className="text-[10px] text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> {c.phone}</p>
                <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> {c.email}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
