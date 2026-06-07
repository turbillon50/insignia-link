import Link from "next/link"
import { Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { opportunities, crmStages, formatCurrency } from "@/lib/mock-data"

const stageAccent: Record<string, string> = {
  nuevo: "var(--muted-foreground)",
  cotizacion: "var(--chart-1)",
  negociacion: "var(--chart-3)",
  ganado: "var(--chart-2)",
}

export default function CrmPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-bold">CRM Comercial</h1>
          <p className="text-sm text-muted-foreground">Pipeline de oportunidades por etapa</p>
        </div>
        <Button render={<Link href="#" />}>
          <Plus className="h-4 w-4" /> Nueva oportunidad
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {crmStages.map((col) => {
            const items = opportunities.filter((o) => o.stage === col.stage)
            const total = items.reduce((s, o) => s + o.amount, 0)
            return (
              <div key={col.stage} className="flex flex-col">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: stageAccent[col.stage] }} />
                    <h2 className="text-sm font-semibold">{col.label}</h2>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{items.length}</span>
                  </div>
                </div>
                <p className="mb-3 text-xs font-medium text-muted-foreground">{formatCurrency(total)}</p>
                <div className="flex flex-col gap-3">
                  {items.map((o) => (
                    <Card key={o.id} className="cursor-pointer p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                      <p className="text-sm font-semibold">{o.name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{o.summary}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">{formatCurrency(o.amount)}</span>
                        <span className="text-xs text-muted-foreground">{o.date}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}
