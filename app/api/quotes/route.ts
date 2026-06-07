import { NextResponse } from "next/server"
import { sql, hasDb } from "@/lib/db"
import { sendEmail } from "@/lib/email"

export const dynamic = "force-dynamic"

export async function GET() {
  if (!hasDb) return NextResponse.json({ ok: false, items: [] })
  const r = (await sql.query(`SELECT * FROM insignia.quotes ORDER BY created_at DESC`)) as any
  return NextResponse.json({ ok: true, items: r.rows ?? r })
}

export async function POST(req: Request) {
  if (!hasDb) return NextResponse.json({ ok: false, error: "DB no configurada" }, { status: 500 })
  try {
    const b = await req.json()
    const lines = Array.isArray(b.lines) ? b.lines : []
    const subtotal = lines.reduce((s: number, l: any) => s + Number(l.qty || 0) * Number(l.unitPrice || 0), 0)
    const iva = subtotal * 0.16
    const total = subtotal + iva
    const id = `COT-${Date.now().toString().slice(-6)}`
    await sql.query(
      `INSERT INTO insignia.quotes (id,client_id,client_name,subtotal,iva,total,lines,status)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [id, b.clientId || null, b.clientName || "", subtotal, iva, total, JSON.stringify(lines), "enviada"],
    )
    if (b.email) {
      const rows = lines
        .map((l: any) => `<tr><td style="padding:6px 0">${l.name}</td><td style="padding:6px 0;text-align:right">${l.qty} × $${Number(l.unitPrice).toLocaleString("es-MX")}</td></tr>`)
        .join("")
      sendEmail({
        to: b.email,
        subject: `Cotización ${id} — Insignia Link`,
        html: `<div style="font-family:system-ui;padding:24px"><h2>Cotización ${id}</h2>
          <table style="width:100%;border-collapse:collapse">${rows}</table>
          <p style="margin-top:12px">Subtotal: $${subtotal.toLocaleString("es-MX")}<br/>IVA 16%: $${iva.toLocaleString("es-MX")}<br/><b>Total: $${total.toLocaleString("es-MX")}</b></p></div>`,
      }).catch(() => {})
    }
    return NextResponse.json({ ok: true, id, subtotal, iva, total })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 })
  }
}
