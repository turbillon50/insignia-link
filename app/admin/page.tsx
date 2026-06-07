import Link from "next/link"
import { Ticket, Users, FileSignature, DollarSign, Plus, Cctv, Wrench, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/admin/stat-card"
import { PriorityDonut } from "@/components/admin/charts"
import { formatCurrency } from "@/lib/mock-data"
import { getDashboardKpis, getTechnicians, getTickets, getNotifications } from "@/lib/data"

export const dynamic = "force-dynamic"

const activityIcon = {
  ticket: Ticket,
  servicio: Cctv,
  cotizacion: FileText,
  sistema: Wrench,
} as const

export default async function AdminDashboard() {
  const [kpis, technicians, tickets, notifs] = await Promise.all([
    getDashboardKpis(),
    getTechnicians(),
    getTickets(),
    getNotifications(),
  ])

  // Prioridad real a partir de los tickets en Neon.
  const total = tickets.length || 1
  const counts = { Alta: 0, Media: 0, Baja: 0 } as Record<string, number>
  for (const t of tickets) {
    if (t.priority === "alta") counts.Alta++
    else if (t.priority === "media") counts.Media++
    else counts.Baja++
  }
  const colors: Record<string, string> = { Alta: "var(--chart-4)", Media: "var(--chart-3)", Baja: "var(--chart-2)" }
  const priorityBreakdown = (["Alta", "Media", "Baja"] as const).map((name) => ({
    name,
    value: counts[name],
    percent: Math.round((counts[name] / total) * 100),
    color: colors[name],
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Dashboard ejecutivo</h1>
          <p className="text-sm text-muted-foreground">Resumen general de la operación · Hoy</p>
        </div>
        <Button render={<Link href="/admin/tickets" />}>
          <Plus className="h-4 w-4" /> Nuevo ticket
        </Button>
      </div>

      {/* KPIs reales */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Tickets abiertos" value={kpis.openTickets + kpis.inProgressTickets} icon={Ticket} />
        <StatCard label="Técnicos activos" value={kpis.technicians} icon={Users} />
        <StatCard label="Clientes activos" value={kpis.activeClients} icon={FileSignature} />
        <StatCard label="Pipeline" value={formatCurrency(kpis.pipelineValue)} icon={DollarSign} />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-1">
          <h2 className="text-sm font-semibold">Tickets por prioridad</h2>
          <PriorityDonut data={priorityBreakdown} />
          <ul className="mt-4 space-y-2">
            {priorityBreakdown.map((p) => (
              <li key={p.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                  {p.name}
                </span>
                <span className="text-muted-foreground">
                  {p.value} ({p.percent}%)
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Actividad reciente</h2>
            <Link href="/admin/tickets" className="text-xs font-medium text-primary">
              Ver todas
            </Link>
          </div>
          <ul className="space-y-1">
            {notifs.slice(0, 6).map((a) => {
              const Icon = (activityIcon as any)[a.type] ?? Ticket
              return (
                <li key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.body}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </li>
              )
            })}
          </ul>
        </Card>
      </div>

      <Card className="p-5">
        <h2 className="mb-4 text-sm font-semibold">Técnicos más activos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="pb-2 font-medium">Técnico</th>
                <th className="pb-2 font-medium">Servicios</th>
                <th className="pb-2 font-medium">Completados</th>
                <th className="pb-2 text-right font-medium">Eficiencia</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((t) => (
                <tr key={t.id} className="border-b border-border/60 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ background: t.avatarColor }}
                      >
                        {t.initials}
                      </span>
                      <div>
                        <p className="font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 tabular-nums">{t.services}</td>
                  <td className="py-3 tabular-nums">{t.completed}</td>
                  <td className="py-3 text-right">
                    <span className="font-semibold text-success">{t.efficiency}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
