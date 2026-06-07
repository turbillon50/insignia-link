"use client"

import { useState } from "react"
import { Building2, Bell, Plug, ShieldCheck, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { InsigniaLogo } from "@/components/brand/insignia-logo"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "empresa", label: "Empresa", icon: Building2 },
  { id: "usuarios", label: "Usuarios", icon: Users },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "integraciones", label: "Integraciones", icon: Plug },
  { id: "seguridad", label: "Seguridad", icon: ShieldCheck },
]

const integrations = [
  { name: "Clerk", desc: "Autenticación y gestión de usuarios", stage: "Etapa 2" },
  { name: "Neon", desc: "Base de datos PostgreSQL serverless", stage: "Etapa 2" },
  { name: "Resend", desc: "Envío de correos transaccionales", stage: "Etapa 2" },
  { name: "Stripe", desc: "Pagos con tarjeta y suscripciones", stage: "Etapa 2" },
  { name: "Mercado Pago", desc: "Pagos locales en México y LATAM", stage: "Etapa 2" },
  { name: "Push Notifications", desc: "Notificaciones móviles en tiempo real", stage: "Etapa 2" },
]

export default function ConfiguracionPage() {
  const [tab, setTab] = useState("empresa")
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-pretty text-2xl font-bold">Configuración</h1>
        <p className="text-sm text-muted-foreground">Ajustes de la empresa, notificaciones y seguridad</p>
      </div>
      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-border">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors",
                tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === "empresa" && (
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-base font-semibold">Información de la empresa</h2>
              <InsigniaLogo className="h-8" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre comercial" value="Insignia Link" />
              <Field label="Razón social" value="Insignia Radiocomunicación S.A. de C.V." />
              <Field label="RFC" value="INR18031SAB7" />
              <Field label="Teléfono" value="+52 998 717 5692" />
              <Field label="Email" value="contacto@insignialink.com" />
              <Field label="Dirección" value="Cancún, Quintana Roo, México" />
            </div>
            <div className="mt-6 flex justify-end">
              <Button>Guardar cambios</Button>
            </div>
          </Card>
        )}

        {tab === "integraciones" && (
          <div className="grid gap-4 sm:grid-cols-2">
            {integrations.map((i) => (
              <Card key={i.name} className="flex items-start justify-between p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{i.name}</h3>
                    <Badge variant="secondary" className="text-[10px]">{i.stage}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{i.desc}</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Conectar
                </Button>
              </Card>
            ))}
            <p className="col-span-full text-xs text-muted-foreground">
              {"Integraciones preparadas a nivel de frontend. La conexión real se habilita en la Etapa 2."}
            </p>
          </div>
        )}

        {tab === "notificaciones" && (
          <Card className="divide-y divide-border p-2">
            {[
              ["Tickets de alta prioridad", "Recibe alertas inmediatas de incidencias críticas", true],
              ["Servicios en ruta", "Avisos cuando un técnico inicia o completa un servicio", true],
              ["Cotizaciones", "Notificaciones de aprobación o rechazo", false],
              ["Reportes semanales", "Resumen ejecutivo cada lunes por correo", true],
            ].map(([title, desc, on]) => (
              <div key={title as string} className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <Switch defaultChecked={on as boolean} />
              </div>
            ))}
          </Card>
        )}

        {tab === "usuarios" && (
          <Card className="p-6 text-sm text-muted-foreground">
            La gestión completa de usuarios y roles está disponible en la sección
            <span className="font-medium text-foreground"> Usuarios</span> del menú lateral.
          </Card>
        )}

        {tab === "seguridad" && (
          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Autenticación de dos factores</p>
                <p className="text-xs text-muted-foreground">Capa adicional de seguridad para el acceso (Etapa 2)</p>
              </div>
              <Switch disabled />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Cierre de sesión automático</p>
                <p className="text-xs text-muted-foreground">Tras 30 minutos de inactividad</p>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input defaultValue={value} />
    </div>
  )
}
