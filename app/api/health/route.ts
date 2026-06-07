// =====================================================================
// Insignia Link — Health check. GET /api/health -> conteos reales de Neon.
// =====================================================================
import { NextResponse } from "next/server"
import { sql, hasDb } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  if (!hasDb) {
    return NextResponse.json({ ok: false, db: false, error: "DATABASE_URL no configurada" }, { status: 503 })
  }
  const tables = ["clients", "technicians", "tickets", "equipment", "service_visits", "opportunities", "quote_lines", "quotes", "notifications"]
  const counts: Record<string, number> = {}
  try {
    for (const t of tables) {
      const r = (await sql.query(`SELECT count(*)::int AS n FROM insignia.${t}`)) as any
      counts[t] = (r.rows ?? r)[0]?.n ?? 0
    }
    return NextResponse.json({ ok: true, db: true, service: "insignia-link", counts, ts: new Date().toISOString() })
  } catch (err: any) {
    return NextResponse.json({ ok: false, db: true, error: String(err?.message || err), counts }, { status: 500 })
  }
}
