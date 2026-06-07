import { NextResponse } from "next/server"
import { sql, hasDb } from "@/lib/db"
import { sendEmail, ticketEmail } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function GET() {
  if (!hasDb) return NextResponse.json({ ok: false, items: [] })
  const r = (await sql.query(`SELECT * FROM insignia.tickets ORDER BY ts DESC, id DESC`)) as any
  return NextResponse.json({ ok: true, items: r.rows ?? r })
}

export async function POST(req: Request) {
  if (!hasDb) return NextResponse.json({ ok: false, error: "DB no configurada" }, { status: 500 })
  try {
    const b = await req.json()
    if (!b.title) return NextResponse.json({ ok: false, error: "Título requerido" }, { status: 400 })
    const id = `TK-${Date.now().toString().slice(-4)}`
    await sql.query(
      `INSERT INTO insignia.tickets (id,title,client_id,priority,status,category,created_at,assigned_to,description)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
      [
        id, b.title, b.clientId || null, b.priority || "media", b.status || "abierto",
        b.category || "Soporte", "Hoy", b.assignedTo || null, b.description || "",
      ],
    )
    // notifica al cliente por correo si existe
    if (b.clientId) {
      const c = (await sql.query(`SELECT name,email,contact FROM insignia.clients WHERE id=$1`, [b.clientId])) as any
      const cli = (c.rows ?? c)[0]
      if (cli?.email) {
        sendEmail({
          to: cli.email,
          subject: `Ticket ${id} — ${b.title}`,
          html: ticketEmail({ id, title: b.title, priority: b.priority || "media", status: "abierto" }, cli.contact || cli.name),
        }).catch(() => {})
      }
    }
    return NextResponse.json({ ok: true, id })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 })
  }
}

// Asignar técnico y/o cambiar estado.
export async function PATCH(req: Request) {
  if (!hasDb) return NextResponse.json({ ok: false, error: "DB no configurada" }, { status: 500 })
  try {
    const b = await req.json()
    if (!b.id) return NextResponse.json({ ok: false, error: "id requerido" }, { status: 400 })
    if (b.assignedTo !== undefined) {
      await sql.query(`UPDATE insignia.tickets SET assigned_to=$1 WHERE id=$2`, [b.assignedTo || null, b.id])
    }
    if (b.status !== undefined) {
      await sql.query(`UPDATE insignia.tickets SET status=$1 WHERE id=$2`, [b.status, b.id])
    }
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 })
  }
}
