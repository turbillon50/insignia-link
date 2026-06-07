import { NextResponse } from "next/server"
import { tokenRole } from "@/lib/access"

export const dynamic = "force-dynamic"

// Manifest propio de la liga instalable. start_url = /<TOKEN> para que al
// abrir la PWA se re-instale la cookie y se entre directo al panel.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params
  const role = tokenRole(token)
  if (!role) return NextResponse.json({ error: "not found" }, { status: 404 })

  const labels: Record<string, string> = {
    admin: "Insignia Admin",
    tecnico: "Insignia Técnico",
    cliente: "Insignia Cliente",
  }
  const name = labels[role]
  const manifest = {
    name,
    short_name: name,
    description: "Acceso instalable a Insignia Link.",
    start_url: `/${token}`,
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0e1626",
    theme_color: "#0e1626",
    lang: "es-MX",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "no-store",
    },
  })
}
