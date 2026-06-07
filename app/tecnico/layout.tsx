"use client"

import type { ReactNode } from "react"
import { Route, Wrench, ScanLine, History, User } from "lucide-react"
import { MobileShell } from "@/components/mobile/mobile-shell"
import type { TabItem } from "@/components/mobile/mobile-tab-bar"

const tabs: TabItem[] = [
  { href: "/tecnico", label: "Ruta", icon: Route },
  { href: "/tecnico/servicios", label: "Servicios", icon: Wrench },
  { href: "/tecnico/escanear", label: "Escanear", icon: ScanLine },
  { href: "/tecnico/historial", label: "Historial", icon: History },
  { href: "/tecnico/perfil", label: "Perfil", icon: User },
]

export default function TecnicoLayout({ children }: { children: ReactNode }) {
  return <MobileShell tabs={tabs}>{children}</MobileShell>
}
