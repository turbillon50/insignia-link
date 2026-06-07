"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Minus, Plus, X, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StandaloneMobileFrame } from "@/components/mobile/standalone-mobile-frame"
import { quoteLines as seed, IVA_RATE, formatCurrency } from "@/lib/mock-data"

const steps = ["Equipos", "Servicios", "Resumen"]

export default function CotizadorPage() {
  const [step] = useState(0)
  const [lines, setLines] = useState(seed.map((l) => ({ ...l })))
  const [clientName, setClientName] = useState("")
  const [saving, setSaving] = useState(false)
  const [folio, setFolio] = useState<string | null>(null)

  async function generar() {
    if (lines.length === 0) return
    setSaving(true)
    const res = await fetch("/api/quotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientName, lines }),
    })
    const data = await res.json().catch(() => ({}))
    setSaving(false)
    if (data?.ok) setFolio(data.id)
  }

  const updateQty = (id: string, delta: number) =>
    setLines((p) => p.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l)))
  const removeLine = (id: string) => setLines((p) => p.filter((l) => l.id !== id))

  const subtotal = lines.reduce((s, l) => s + l.qty * l.unitPrice, 0)
  const iva = subtotal * IVA_RATE
  const total = subtotal + iva

  return (
    <StandaloneMobileFrame>
      <div className="flex flex-col gap-4 px-4 pb-6 pt-2">
        <header className="flex items-center gap-3">
          <Button render={<Link href="/" />} variant="ghost" size="icon" className="rounded-full" aria-label="Volver">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Nueva cotización</h1>
        </header>

        {/* Stepper */}
        <div className="flex items-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-xs font-medium ${i === step ? "text-foreground" : "text-muted-foreground"}`}>
                {s}
              </span>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>

        {/* Line items */}
        <div className="flex flex-col gap-2.5">
          {lines.map((l) => (
            <Card key={l.id} className="border-border/70 p-3.5">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <p className="text-sm font-semibold">{l.name}</p>
                  <p className="text-[0.7rem] text-muted-foreground">{l.detail}</p>
                </div>
                <button onClick={() => removeLine(l.id)} aria-label="Eliminar" className="text-muted-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon-sm" onClick={() => updateQty(l.id, -1)} aria-label="Menos">
                    <Minus className="h-3.5 w-3.5" />
                  </Button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums">{l.qty}</span>
                  <Button variant="outline" size="icon-sm" onClick={() => updateQty(l.id, 1)} aria-label="Más">
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <span className="text-sm font-bold text-primary tabular-nums">
                  {formatCurrency(l.qty * l.unitPrice)}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Totals */}
        <Card className="border-border/70 p-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium tabular-nums">{formatCurrency(subtotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-muted-foreground">IVA (16%)</span>
            <span className="font-medium tabular-nums">{formatCurrency(iva)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3">
            <span className="text-base font-semibold">Total</span>
            <span className="text-lg font-bold text-primary tabular-nums">{formatCurrency(total)}</span>
          </div>
        </Card>

        <input
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="Cliente (opcional)"
          className="h-11 w-full rounded-lg border border-input bg-background px-3 text-sm"
        />

        {folio ? (
          <Card className="border-success/40 bg-success/10 p-4 text-center">
            <p className="text-sm font-semibold text-success">Cotización {folio} generada</p>
            <p className="mt-1 text-xs text-muted-foreground">Total {formatCurrency(total)} · guardada en el sistema</p>
            <Button variant="outline" className="mt-3 w-full" onClick={() => setFolio(null)}>
              Nueva cotización
            </Button>
          </Card>
        ) : (
          <Button size="lg" className="h-12 w-full text-base" onClick={generar} disabled={saving}>
            <FileText className="h-5 w-5" /> {saving ? "Generando…" : "Generar cotización"}
          </Button>
        )}
      </div>
    </StandaloneMobileFrame>
  )
}
