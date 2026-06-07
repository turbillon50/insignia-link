import { NextResponse } from "next/server"
import { sql, hasDb } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  if (!hasDb) return NextResponse.json({ ok: false, items: [] })
  const r = (await sql.query(`SELECT * FROM insignia.equipment ORDER BY category, name`)) as any
  return NextResponse.json({ ok: true, items: r.rows ?? r })
}

export async function POST(req: Request) {
  if (!hasDb) return NextResponse.json({ ok: false, error: "DB no configurada" }, { status: 500 })
  try {
    const b = await req.json()
    if (!b.name) return NextResponse.json({ ok: false, error: "Nombre requerido" }, { status: 400 })
    const id = `EQ-${Date.now().toString().slice(-5)}`
    await sql.query(
      `INSERT INTO insignia.equipment (id,name,category,serial,status,stock,client_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [id, b.name, b.category || "Accesorios", b.serial || "", b.status || "disponible", b.stock || 0, b.clientId || null],
    )
    return NextResponse.json({ ok: true, id })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  if (!hasDb) return NextResponse.json({ ok: false, error: "DB no configurada" }, { status: 500 })
  try {
    const b = await req.json()
    if (!b.id) return NextResponse.json({ ok: false, error: "id requerido" }, { status: 400 })
    if (b.stock !== undefined) await sql.query(`UPDATE insignia.equipment SET stock=$1 WHERE id=$2`, [b.stock, b.id])
    if (b.status !== undefined) await sql.query(`UPDATE insignia.equipment SET status=$1 WHERE id=$2`, [b.status, b.id])
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 })
  }
}
