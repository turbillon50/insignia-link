import Link from "next/link"
import { InsigniaLogo } from "@/components/brand/insignia-logo"
import { Mail, Phone, MapPin } from "lucide-react"

const cols = [
  {
    title: "Plataforma",
    links: [
      { label: "Panel administrativo", href: "/admin" },
      { label: "Portal cliente", href: "/app" },
      { label: "Técnico en campo", href: "/tecnico" },
      { label: "Cotizador", href: "/cotizador" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Radiocomunicación", href: "#servicios" },
      { label: "Videovigilancia CCTV", href: "#servicios" },
      { label: "Soporte técnico", href: "#servicios" },
      { label: "Mantenimiento", href: "#servicios" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "#" },
      { label: "Casos de éxito", href: "#testimonios" },
      { label: "Cobertura", href: "#estadisticas" },
      { label: "Contacto", href: "#" },
    ],
  },
]

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <InsigniaLogo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Plataforma integral para radiocomunicación, CCTV y soporte técnico.
              Conectamos tu mundo. Protegemos lo que te importa.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> +52 998 717 5692
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" /> +52 221 889 1890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> contacto@insignialink.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Cancún, Quintana Roo, México
              </li>
            </ul>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-heading text-sm font-semibold">{c.title}</h4>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Insignia Radiocomunicación S.A. de C.V. — RFC INR18031SAB7</p>
          <div className="flex gap-6">
            <Link href="#" className="transition-colors hover:text-foreground">
              Aviso de privacidad
            </Link>
            <Link href="#" className="transition-colors hover:text-foreground">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
