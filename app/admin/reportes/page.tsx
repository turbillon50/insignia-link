"use client"

import { useState } from "react"
import { FileText, Download, Calendar, TrendingUp, FileBarChart, FileSpreadsheet } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GrowthAreaChart } from "@/components/admin/charts"
import { monthlyGrowth, formatCurrency } from "@/lib/mock-data"

const reportTemplates = [
  { id: "rep-1", name: "Reporte ejecutivo mensual", desc: "KPIs, ingresos y satisfacción del periodo", icon: FileBarChart, period: "Mensual", format: "PDF" },
  { id: "rep-2", name: "Tickets y SLA", desc: "Tiempos de respuesta y resolución por prioridad", icon: FileText, period: "Semanal", format: "PDF" },
  { id: "rep-3", name: "Inventario y movimientos", desc: "Stock, asignaciones y bajas de equipo", icon: FileSpreadsheet, period: "Mensual", format: "XLSX" },
  { id: "rep-4", name: "Desempeño de técnicos", desc: "Servicios, eficiencia y cumplimiento de ruta", icon: TrendingUp, period: "Mensual", format: "PDF" },
  { id: "rep-5", name: "Pipeline comercial", desc: "Oportunidades, conversión y proyección", icon: FileBarChart, period: "Quincenal", format: "XLSX" },
  { id: "rep-6", name: "Contratos y renovaciones", desc: "Vigencias, vencimientos y oportunidades", icon: FileText, period: "Mensual", format: "PDF" },
]

const generatedReports = [
  { id: "gen-1", name: "Reporte ejecutivo - Junio 2024", date: "1 jul 2024", size: "2.4 MB", format: "PDF" },
  { id: "gen-2", name: "Tickets y SLA - Semana 26", date: "30 jun 2024", size: "1.1 MB", format: "PDF" },
  { id: "gen-3", name: "Inventario - Junio 2024", date: "1 jul 2024", size: "845 KB", format: "XLSX" },
  { id: "gen-4", name: "Desempeño técnicos - Junio 2024", date: "1 jul 2024", size: "1.8 MB", format: "PDF" },
  { id: "gen-5", name: "Pipeline comercial - Q2", date: "28 jun 2024", size: "920 KB", format: "XLSX" },
]

export default function ReportesPage() {
  const [range, setRange] = useState("Este mes")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">Centro de reportes</h1>
          <p className="text-sm text-muted-foreground">Genera y descarga reportes operativos y ejecutivos</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-transparent text-sm outline-none"
              aria-label="Rango de fechas"
            >
              <option>Hoy</option>
              <option>Esta semana</option>
              <option>Este mes</option>
              <option>Este trimestre</option>
              <option>Este año</option>
            </select>
          </div>
        </div>
      </div>

      <Card className="overflow-hidden p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Ingresos del periodo</h2>
            <p className="text-sm text-muted-foreground">Tendencia de los últimos 7 meses</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{formatCurrency(monthlyGrowth.reduce((a, m) => a + m.ingresos, 0))}</p>
            <p className="text-xs text-emerald-500">+18% vs. periodo anterior</p>
          </div>
        </div>
        <GrowthAreaChart data={monthlyGrowth} />
      </Card>

      <div>
        <h2 className="mb-3 font-semibold">Plantillas de reportes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTemplates.map((r) => {
            const Icon = r.icon
            return (
              <Card key={r.id} className="group flex flex-col gap-3 p-5 transition-colors hover:border-primary/50">
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge variant="secondary" className="text-xs">{r.format}</Badge>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold leading-tight">{r.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{r.period}</span>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <Download className="h-3.5 w-3.5" />
                    Generar
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-semibold">Reportes generados</h2>
          <span className="text-sm text-muted-foreground">{generatedReports.length} archivos</span>
        </div>
        <ul className="divide-y divide-border">
          {generatedReports.map((g) => (
            <li key={g.id} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-muted/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.date} · {g.size} · {g.format}</p>
              </div>
              <Button size="icon" variant="ghost" aria-label={`Descargar ${g.name}`}>
                <Download className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
