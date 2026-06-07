"use client"

import Link from "next/link"
import { Phone, Moon, Bell, MapPin, Award, LogOut } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import { technicians } from "@/lib/mock-data"

const tech = technicians[0] // Juan Pérez

export default function TecnicoPerfilPage() {
  return (
    <div className="flex flex-col gap-5 px-4 pb-6 pt-2">
      <header className="pt-1">
        <h1 className="text-lg font-semibold">Mi perfil</h1>
      </header>

      <Card className="flex flex-col items-center gap-2 border-border/70 p-6 text-center">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white"
          style={{ background: tech.avatarColor }}
        >
          {tech.initials}
        </div>
        <div>
          <p className="text-base font-semibold">{tech.name}</p>
          <p className="text-sm text-muted-foreground">{tech.role}</p>
        </div>
        <span className="mt-1 flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
          <MapPin className="h-3.5 w-3.5" /> En campo
        </span>
      </Card>

      <Card className="border-border/70 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <Award className="h-4 w-4 text-primary" /> Eficiencia
          </span>
          <span className="text-sm font-bold text-primary">{tech.efficiency}%</span>
        </div>
        <Progress value={tech.efficiency} className="h-2" />
        <div className="mt-3 grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-lg font-bold">{tech.services}</p>
            <p className="text-xs text-muted-foreground">Servicios</p>
          </div>
          <div>
            <p className="text-lg font-bold">{tech.completed}</p>
            <p className="text-xs text-muted-foreground">Completados</p>
          </div>
        </div>
      </Card>

      <Card className="divide-y divide-border border-border/70">
        <div className="flex items-center justify-between p-4">
          <span className="flex items-center gap-3 text-sm font-medium">
            <Phone className="h-5 w-5 text-muted-foreground" /> {tech.phone}
          </span>
        </div>
        <div className="flex items-center justify-between p-4">
          <span className="flex items-center gap-3 text-sm font-medium">
            <Moon className="h-5 w-5 text-muted-foreground" /> Tema
          </span>
          <ThemeToggle />
        </div>
        <div className="flex items-center justify-between p-4">
          <span className="flex items-center gap-3 text-sm font-medium">
            <Bell className="h-5 w-5 text-muted-foreground" /> Notificaciones
          </span>
          <Switch defaultChecked />
        </div>
      </Card>

      <Button render={<Link href="/" />} variant="outline" className="w-full text-muted-foreground">
        <LogOut className="h-4 w-4" /> Cerrar sesión
      </Button>
    </div>
  )
}
