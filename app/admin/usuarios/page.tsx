"use client"

import { useState } from "react"
import { UserPlus, Search, Shield, MoreHorizontal, Mail } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { technicians } from "@/lib/mock-data"

type UserRow = {
  id: string
  name: string
  email: string
  role: string
  roleType: "admin" | "supervisor" | "tecnico" | "vendedor" | "cliente"
  initials: string
  avatarColor: string
  status: "activo" | "inactivo"
  lastActive: string
}

const baseUsers: UserRow[] = [
  { id: "U-00", name: "Abraham RC", email: "abraham@insignialink.com", role: "Administrador", roleType: "admin", initials: "AR", avatarColor: "var(--chart-1)", status: "activo", lastActive: "Ahora" },
  { id: "U-09", name: "Laura Méndez", email: "laura@insignialink.com", role: "Supervisor de operaciones", roleType: "supervisor", initials: "LM", avatarColor: "var(--chart-4)", status: "activo", lastActive: "Hace 1 h" },
  { id: "U-10", name: "Diana Soto", email: "diana@insignialink.com", role: "Ejecutiva comercial", roleType: "vendedor", initials: "DS", avatarColor: "var(--chart-2)", status: "activo", lastActive: "Hace 3 h" },
  { id: "U-11", name: "Hotel Xcaret México", email: "contacto@xcaret.com", role: "Cliente — Cuenta activa", roleType: "cliente", initials: "HX", avatarColor: "var(--chart-5)", status: "activo", lastActive: "Ayer" },
]

const techUsers: UserRow[] = technicians.map((t) => ({
  id: t.id,
  name: t.name,
  email: `${t.name.toLowerCase().replace(/[^a-z]/g, ".")}@insignialink.com`,
  role: t.role,
  roleType: "tecnico",
  initials: t.initials,
  avatarColor: t.avatarColor,
  status: t.status === "descanso" ? "inactivo" : "activo",
  lastActive: t.status === "en-campo" ? "En campo" : "Hace 30 min",
}))

const allUsers = [...baseUsers, ...techUsers]

const roleTypeMeta: Record<UserRow["roleType"], { label: string; class: string }> = {
  admin: { label: "Administrador", class: "bg-primary/10 text-primary border-primary/20" },
  supervisor: { label: "Supervisor", class: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  tecnico: { label: "Técnico", class: "bg-sky-500/10 text-sky-600 border-sky-500/20" },
  vendedor: { label: "Vendedor", class: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  cliente: { label: "Cliente", class: "bg-muted text-muted-foreground border-border" },
}

const roleSummary = [
  { type: "admin" as const, count: 1, perms: "Acceso total" },
  { type: "supervisor" as const, count: 1, perms: "Operación y reportes" },
  { type: "tecnico" as const, count: techUsers.length, perms: "App de campo" },
  { type: "vendedor" as const, count: 1, perms: "CRM y cotizador" },
  { type: "cliente" as const, count: 1, perms: "Portal cliente" },
]

const tabs = ["Usuarios", "Roles y permisos"] as const

export default function UsuariosPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Usuarios")
  const [query, setQuery] = useState("")

  const filtered = allUsers.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Gestión de usuarios</h1>
          <p className="text-sm text-muted-foreground">Administra cuentas, roles y permisos de la plataforma</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Nuevo usuario
        </Button>
      </div>

      <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors sm:flex-none",
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Usuarios" ? (
        <Card className="overflow-hidden">
          <div className="border-b border-border p-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar usuario o correo"
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Usuario</th>
                  <th className="px-4 py-3 font-medium">Rol</th>
                  <th className="hidden px-4 py-3 font-medium md:table-cell">Estado</th>
                  <th className="hidden px-4 py-3 font-medium lg:table-cell">Última actividad</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                          style={{ backgroundColor: u.avatarColor }}
                        >
                          {u.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{u.name}</p>
                          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" /> {u.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={cn("font-medium", roleTypeMeta[u.roleType].class)}>
                        {roleTypeMeta[u.roleType].label}
                      </Badge>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell">
                      <span className="flex items-center gap-1.5">
                        <span className={cn("h-2 w-2 rounded-full", u.status === "activo" ? "bg-emerald-500" : "bg-muted-foreground/40")} />
                        <span className="capitalize text-muted-foreground">{u.status}</span>
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{u.lastActive}</td>
                    <td className="px-4 py-3 text-right">
                      <Button size="icon" variant="ghost" aria-label="Más opciones">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roleSummary.map((r) => (
            <Card key={r.type} className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={cn("font-medium", roleTypeMeta[r.type].class)}>
                  {roleTypeMeta[r.type].label}
                </Badge>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{r.count}</p>
                <p className="text-xs text-muted-foreground">{r.count === 1 ? "usuario" : "usuarios"}</p>
              </div>
              <p className="text-sm text-muted-foreground">{r.perms}</p>
              <Button size="sm" variant="outline" className="mt-auto">
                Editar permisos
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
