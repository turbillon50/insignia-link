import { Ticket, CheckCircle2, Clock, Star } from "lucide-react"
import { Card } from "@/components/ui/card"
import { StatCard } from "@/components/admin/stat-card"
import { PriorityDonut, TicketsLineChart } from "@/components/admin/charts"
import { analyticsKpis, ticketsPerDay, priorityBreakdown, technicians } from "@/lib/mock-data"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-pretty text-2xl font-bold">Analytics y reportes</h1>
        <p className="text-sm text-muted-foreground">Indicadores clave · 1 - 7 Jun 2024</p>
      </div>
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Tickets totales" value={analyticsKpis.totalTickets} trend={analyticsKpis.totalTicketsTrend} icon={Ticket} />
          <StatCard label="Resueltos" value={analyticsKpis.resolved} trend={analyticsKpis.resolvedTrend} icon={CheckCircle2} />
          <StatCard label="Tiempo promedio" value={analyticsKpis.avgTime} trend={analyticsKpis.avgTimeTrend} invertTrend icon={Clock} />
          <StatCard label="Satisfacción" value={`${analyticsKpis.satisfaction} / 5`} trend={analyticsKpis.satisfactionTrend} icon={Star} />
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <h2 className="mb-2 text-sm font-semibold">Tickets por día</h2>
            <p className="mb-4 text-xs text-muted-foreground">Recibidos vs. resueltos · últimos 7 días</p>
            <TicketsLineChart data={ticketsPerDay} />
            <div className="mt-4 flex items-center gap-5 text-xs">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--chart-1)" }} /> Recibidos
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--chart-2)" }} /> Resueltos
              </span>
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-sm font-semibold">Tickets por prioridad</h2>
            <PriorityDonut data={priorityBreakdown} />
            <ul className="mt-4 space-y-2">
              {priorityBreakdown.map((p) => (
                <li key={p.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </span>
                  <span className="text-muted-foreground">{p.value} ({p.percent}%)</span>
                </li>
              ))}
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
                        <span className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: t.avatarColor }}>
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
