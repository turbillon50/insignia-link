"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Cctv, Radio, HardDrive, ShieldCheck, Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const categories = [
  { key: "CCTV", label: "CCTV", icon: Cctv },
  { key: "Radio", label: "Radio", icon: Radio },
  { key: "DVR/NVR", label: "DVR/NVR", icon: HardDrive },
  { key: "Acceso", label: "Acceso", icon: ShieldCheck },
]

const priorities = [
  { key: "baja", label: "Baja", tone: "text-success border-success/40" },
  { key: "media", label: "Media", tone: "text-warning border-warning/40" },
  { key: "alta", label: "Alta", tone: "text-destructive border-destructive/40" },
]

export default function NuevoTicketPage() {
  const router = useRouter()
  const [category, setCategory] = useState("CCTV")
  const [priority, setPriority] = useState("media")
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
          <Check className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-xl font-semibold">Ticket enviado</h1>
        <p className="text-sm text-muted-foreground">
          Tu solicitud fue registrada. Un técnico la atenderá en breve y recibirás notificaciones del avance.
        </p>
        <Button render={<Link href="/app/tickets" />} className="mt-2 w-full">
          Ver mis tickets
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 px-4 pb-6 pt-2">
      <header className="flex items-center gap-3">
        <Button render={<Link href="/app/tickets" />} variant="ghost" size="icon" className="rounded-full" aria-label="Volver">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Nuevo ticket</h1>
      </header>

      <div className="flex flex-col gap-2">
        <Label>Categoría</Label>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((c) => {
            const Icon = c.icon
            const active = category === c.key
            return (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-[0.7rem] font-medium transition-colors ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <Icon className="h-5 w-5" />
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Asunto</Label>
        <Input id="title" placeholder="Ej. Cámara sin señal en recepción" />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="desc">Descripción</Label>
        <textarea
          id="desc"
          rows={4}
          placeholder="Describe la falla con el mayor detalle posible…"
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Prioridad</Label>
        <div className="grid grid-cols-3 gap-2">
          {priorities.map((p) => (
            <button
              key={p.key}
              onClick={() => setPriority(p.key)}
              className={`rounded-xl border py-2.5 text-sm font-medium transition-colors ${
                priority === p.key ? `${p.tone} bg-muted` : "border-border text-muted-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <Button size="lg" className="mt-2 h-12 w-full text-base" onClick={() => setSent(true)}>
        Enviar ticket
      </Button>
    </div>
  )
}
