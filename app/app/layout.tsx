"use client"

import type { ReactNode } from "react"
import { Home, Wrench, Ticket, Bell, User } from "lucide-react"
import { MobileShell } from "@/components/mobile/mobile-shell"
import type { TabItem } from "@/components/mobile/mobile-tab-bar"

const tabs: TabItem[] = [
  { href: "/app", label: "Inicio", icon: Home },
  { href: "/app/servicios", label: "Servicios", icon: Wrench },
  { href: "/app/tickets", label: "Tickets", icon: Ticket },
  { href: "/app/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/app/perfil", label: "Perfil", icon: User },
]

export default function AppLayout({ children }: { children: ReactNode }) {
  return <MobileShell tabs={tabs}>{children}</MobileShell>
}
