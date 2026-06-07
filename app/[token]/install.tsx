"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ShieldCheck, ArrowRight, Smartphone } from "lucide-react"
import { InsigniaMark } from "@/components/brand/insignia-logo"

const dest: Record<string, { href: string; label: string }> = {
  admin: { href: "/admin", label: "Panel de Administración" },
  tecnico: { href: "/tecnico", label: "Panel de Técnico" },
  cliente: { href: "/app", label: "Portal de Cliente" },
}

export function AccessInstall({ role }: { role: "admin" | "tecnico" | "cliente" }) {
  const [standalone, setStandalone] = useState(false)
  const target = dest[role]

  useEffect(() => {
    const mq = window.matchMedia("(display-mode: standalone)")
    const ios = (window.navigator as any).standalone === true
    setStandalone(mq.matches || ios)
  }, [])

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 bg-[#0e1626] px-6 text-center text-white">
      <div className="flex items-center gap-2.5">
        <InsigniaMark className="h-9 w-9 text-blue-400" />
        <span className="font-heading text-xl font-extrabold tracking-tight">INSIGNIA <span className="text-blue-400">LINK</span></span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
          <ShieldCheck className="h-8 w-8 text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold">Acceso autorizado</h1>
        <p className="max-w-sm text-sm text-white/60">
          Tu llave de acceso quedó instalada en este dispositivo. Entra directo al {target.label.toLowerCase()}.
        </p>
      </div>

      <Link
        href={target.href}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
      >
        Entrar al {target.label} <ArrowRight className="h-4 w-4" />
      </Link>

      {!standalone && (
        <p className="flex items-center gap-2 text-xs text-white/40">
          <Smartphone className="h-3.5 w-3.5" />
          Agrega esta página a tu pantalla de inicio para acceso instantáneo.
        </p>
      )}
    </main>
  )
}
