"use client"

import Link from "next/link"
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Moon,
  Bell,
  ShieldCheck,
  FileText,
  LifeBuoy,
  LogOut,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { clients } from "@/lib/mock-data"

const client = clients[0]

const menu = [
  { label: "Datos de la cuenta", icon: Building2 },
  { label: "Seguridad y acceso", icon: ShieldCheck },
  { label: "Documentos y contratos", icon: FileText },
  { label: "Centro de ayuda", icon: LifeBuoy },
]

export default function PerfilPage() {
  return (
    <div className="flex flex-col gap-5 px-4 pb-6 pt-2">
      <header className="pt-1">
        <h1 className="text-lg font-semibold">Perfil</h1>
      </header>

      {/* Account card */}
      <Card className="flex flex-col items-center gap-2 border-border/70 p-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-xl font-bold text-primary">
          HX
        </div>
        <div>
          <p className="text-base font-semibold">{client.contact}</p>
          <p className="text-sm text-muted-foreground">{client.name}</p>
        </div>
        <div className="mt-2 flex w-full flex-col gap-2 text-left text-sm">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" /> {client.email}
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-4 w-4" /> {client.phone}
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" /> {client.city}, {client.state}
          </span>
        </div>
      </Card>

      {/* Preferences */}
      <Card className="divide-y divide-border border-border/70">
        <div className="flex items-center justify-between p-4">
          <span className="flex items-center gap-3 text-sm font-medium">
            <Moon className="h-5 w-5 text-muted-foreground" /> Tema
          </span>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between p-4">
          <span className="flex items-center gap-3 text-sm font-medium">
            <Bell className="h-5 w-5 text-muted-foreground" /> Notificaciones push
          </span>
          <Switch defaultChecked />
        </div>
      </Card>

      {/* Menu */}
      <Card className="divide-y divide-border border-border/70">
        {menu.map((m) => {
          const Icon = m.icon
          return (
            <button key={m.label} className="flex w-full items-center justify-between p-4 text-left">
              <span className="flex items-center gap-3 text-sm font-medium">
                <Icon className="h-5 w-5 text-muted-foreground" /> {m.label}
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          )
        })}
      </Card>

      <Button render={<Link href="/" />} variant="outline" className="w-full text-muted-foreground">
        <LogOut className="h-4 w-4" /> Cerrar sesión
      </Button>
      <p className="text-center text-xs text-muted-foreground">INSIGNIA LINK · v1.0 demo</p>
    </div>
  )
}
