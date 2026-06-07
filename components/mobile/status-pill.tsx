import { cn } from "@/lib/utils"

type Tone = "alta" | "media" | "baja" | "abierto" | "proceso" | "resuelto" | "completado" | "disponible" | "pendiente"

const toneMap: Record<string, { label?: string; className: string; dot: string }> = {
  alta: { label: "Alta", className: "bg-danger/10 text-danger", dot: "bg-danger" },
  media: { label: "Media", className: "bg-warning/10 text-warning", dot: "bg-warning" },
  baja: { label: "Baja", className: "bg-success/10 text-success", dot: "bg-success" },
  abierto: { label: "Abierto", className: "bg-primary/10 text-primary", dot: "bg-primary" },
  proceso: { label: "En proceso", className: "bg-warning/10 text-warning", dot: "bg-warning" },
  resuelto: { label: "Resuelto", className: "bg-success/10 text-success", dot: "bg-success" },
  completado: { label: "Completado", className: "bg-success/10 text-success", dot: "bg-success" },
  disponible: { label: "Disponible", className: "bg-success/10 text-success", dot: "bg-success" },
  pendiente: { label: "Pendiente", className: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
}

export function StatusPill({
  tone,
  label,
  showDot = false,
  className,
}: {
  tone: Tone | string
  label?: string
  showDot?: boolean
  className?: string
}) {
  const config = toneMap[tone] ?? { className: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" }
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className,
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />}
      {label ?? config.label ?? tone}
    </span>
  )
}
