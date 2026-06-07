import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { tokenRole } from "@/lib/access"
import { AccessInstall } from "./install"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>
}): Promise<Metadata> {
  const { token } = await params
  if (!tokenRole(token)) return {}
  return {
    title: "Acceso · Insignia Link",
    robots: { index: false, follow: false },
    manifest: `/km/${token}`,
  }
}

// Página de la liga-llave. La cookie ya la instaló el middleware; aquí
// resolvemos el destino del panel por rol. Token inválido -> 404.
export default async function TokenPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params
  const role = tokenRole(token)
  if (!role) notFound()
  return <AccessInstall role={role} />
}
