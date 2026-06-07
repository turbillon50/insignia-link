// =====================================================================
// Insignia Link — Patrón "liga-llave" (acceso a paneles por rol).
// La liga ES la llave: una URL secreta /<TOKEN> instala una cookie de
// acceso de 1 año que abre el panel sin contraseña (paralelo a Clerk).
//
// Tokens (NUNCA en el repo — solo en env de Vercel y en el brain):
//   ADMIN_LINK_TOKEN   -> rol "admin"   (acceso total /admin)
//   TECH_LINK_TOKEN    -> rol "tecnico" (/tecnico)
//   CLIENT_LINK_TOKEN  -> rol "cliente" (/app)
// =====================================================================

export const ACCESS_COOKIE = "insignia_key"
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 365 // 1 año

export type AccessRole = "admin" | "tecnico" | "cliente"

export function tokenRole(token: string | undefined | null): AccessRole | null {
  if (!token) return null
  if (process.env.ADMIN_LINK_TOKEN && token === process.env.ADMIN_LINK_TOKEN) return "admin"
  if (process.env.TECH_LINK_TOKEN && token === process.env.TECH_LINK_TOKEN) return "tecnico"
  if (process.env.CLIENT_LINK_TOKEN && token === process.env.CLIENT_LINK_TOKEN) return "cliente"
  return null
}
