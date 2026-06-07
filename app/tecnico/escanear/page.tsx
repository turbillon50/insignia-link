"use client"

import { useState } from "react"
import { ScanLine, Check, Keyboard } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { equipment } from "@/lib/mock-data"

export default function EscanearPage() {
  const [scanned, setScanned] = useState(false)
  const item = equipment[0]

  return (
    <div className="flex flex-col gap-5 px-4 pb-6 pt-2">
      <header className="pt-1">
        <h1 className="text-lg font-semibold">Escanear equipo</h1>
        <p className="text-sm text-muted-foreground">Registra equipo por código QR o serie</p>
      </header>

      {/* Scanner viewport */}
      <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-[#0b1220]">
        <div className="absolute inset-8 rounded-2xl border-2 border-dashed border-primary/50" />
        <div className="absolute left-8 right-8 top-1/2 h-0.5 -translate-y-1/2 animate-pulse bg-primary shadow-[0_0_12px_var(--primary)]" />
        <ScanLine className="h-16 w-16 text-primary/40" />
        {[
          "left-6 top-6 border-l-2 border-t-2",
          "right-6 top-6 border-r-2 border-t-2",
          "left-6 bottom-6 border-l-2 border-b-2",
          "right-6 bottom-6 border-r-2 border-b-2",
        ].map((c) => (
          <span key={c} className={`absolute h-6 w-6 rounded-sm border-primary ${c}`} />
        ))}
      </div>

      {scanned ? (
        <Card className="flex items-center gap-3 border-success/30 bg-success/5 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15">
            <Check className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-sm font-semibold">{item.name}</p>
            <p className="text-xs text-muted-foreground">Serie: {item.serial} · Registrado</p>
          </div>
        </Card>
      ) : (
        <p className="text-center text-sm text-muted-foreground">Apunta la cámara al código del equipo</p>
      )}

      <div className="flex flex-col gap-2">
        <Button size="lg" className="h-12" onClick={() => setScanned(true)}>
          <ScanLine className="h-5 w-5" /> Simular escaneo
        </Button>
        <Button size="lg" variant="outline" className="h-12">
          <Keyboard className="h-5 w-5" /> Ingresar serie manual
        </Button>
      </div>
    </div>
  )
}
