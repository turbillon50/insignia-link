import { NextResponse } from "next/server"
import { sql, hasDb } from "@/lib/db"
import { sendEmail, welcomeEmail } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function GET() {
  if (!hasDb) return NextResponse.json({ ok: false, items: [] })
  const r = (await sql.query(`SELECT * FROM insignia.clients ORDER BY name`)) as any
  return NextResponse.json({ ok: true, items: r.rows ?? r })
}

export async function POST(req: Request) {
  if (!hasDb) return NextResponse.json({ ok: false, error: "DB no configurada" }, { status: 500 })
  try {
    const b = await req.json()
    if (!b.name) return NextResponse.json({ ok: false, error: "Nombre requerido" }, { status: 400 })
    const id = `CL-${Date.now().toString().slice(-6)}`
    await sql.query(
      `INSERT INTO insignia.clients (id,name,legal_name,city,state,lat,lng,contact,email,phone,account,radios,cameras,dvr,sites,since)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [
        id, b.name, b.legalName || b.name, b.city || "", b.state || "Quintana Roo",
        b.lat || 21.16, b.lng || -86.85, b.contact || "", b.email || "", b.phone || "",
        b.account || "prospecto", b.radios || 0, b.cameras || 0, b.dvr || 0, b.sites || 1,
        new Date().toISOString().slice(0, 10),
      ],
    )
    if (b.email) {
      sendEmail({ to: b.email, subject: "Bienvenido a Insignia Link", html: welcomeEmail(b.contact || b.name) }).catch(() => {})
    }
    return NextResponse.json({ ok: true, id })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 })
  }
}
