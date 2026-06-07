"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Phone, Mail, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import type { Client } from "@/lib/mock-data"

const accountMeta: Record<string, { label: string; class: string }> = {
  activa: { label: "Activa", class: "bg-success/10 text-success" },
  prospecto: { label: "Prospecto", class: "bg-chart-3/15 text-chart-3" },
  suspendida: { label: "Suspendida", class: "bg-destructive/10 text-destructive" },
}

export function ClientesView({ clients }: { clients: Client[] }) {
  const router = useRouter()
  const [q, setQ] = useState("")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: "", city: "", contact: "", email: "", phone: "", account: "prospecto" })

  const filtered = clients.filter(
    (c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.city.toLowerCase().includes(q.toLowerCase()),
  )

  async function save() {
    if (!form.name) return
    setSaving(true)
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (res.ok) {
      setOpen(false)
      setForm({ name: "", city: "", contact: "", email: "", phone: "", account: "prospecto" })
      router.refresh()
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Clientes</h1>
          <p className="text-sm text-muted-foreground">{clients.length} cuentas registradas</p>
        </div>
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" /> Nuevo cliente
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar cliente o ciudad" className="pl-9" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => {
          const meta = accountMeta[c.account] ?? accountMeta.prospecto
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4" onClick={() => setOpen(false)}>
          <Card className="w-full max-w-md rounded-b-none p-5 sm:rounded-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Nuevo cliente</h2>
              <button onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <Input placeholder="Nombre de la empresa *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input placeholder="Ciudad" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              <Input placeholder="Contacto" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
              <Input placeholder="Correo" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <Input placeholder="Teléfono" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={form.account}
                onChange={(e) => setForm({ ...form, account: e.target.value })}
              >
                <option value="prospecto">Prospecto</option>
                <option value="activa">Activa</option>
                <option value="suspendida">Suspendida</option>
              </select>
              <Button className="w-full" onClick={save} disabled={saving || !form.name}>
                {saving ? "Guardando…" : "Crear cliente"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
