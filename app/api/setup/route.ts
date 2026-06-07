// =====================================================================
// Insignia Link — Migración idempotente + seed.
// GET/POST /api/setup  -> crea schema `insignia`, tablas y siembra los
// datos demo (los mismos del frontend v0). Re-ejecutable sin romper.
// =====================================================================
import { NextResponse } from "next/server"
import { sql, hasDb } from "@/lib/db"
import {
  clients,
  technicians,
  tickets,
  equipment,
  serviceVisits,
  opportunities,
  quoteLines,
  recentActivity as activities,
  notifications,
} from "@/lib/mock-data"

export const dynamic = "force-dynamic"
export const maxDuration = 60

const DDL = [
  `CREATE SCHEMA IF NOT EXISTS insignia`,
  `CREATE TABLE IF NOT EXISTS insignia.clients (
     id text PRIMARY KEY,
     name text NOT NULL,
     legal_name text,
     city text,
     state text,
     lat double precision,
     lng double precision,
     contact text,
     email text,
     phone text,
     account text NOT NULL DEFAULT 'prospecto',
     radios int DEFAULT 0,
     cameras int DEFAULT 0,
     dvr int DEFAULT 0,
     sites int DEFAULT 0,
     since text,
     created_at timestamptz DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.technicians (
     id text PRIMARY KEY,
     name text NOT NULL,
     role text,
     avatar_color text,
     initials text,
     services int DEFAULT 0,
     completed int DEFAULT 0,
     efficiency int DEFAULT 0,
     status text DEFAULT 'disponible',
     phone text
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.tickets (
     id text PRIMARY KEY,
     title text NOT NULL,
     client_id text REFERENCES insignia.clients(id),
     priority text DEFAULT 'media',
     status text DEFAULT 'abierto',
     category text,
     created_at text,
     assigned_to text REFERENCES insignia.technicians(id),
     description text,
     ts timestamptz DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.equipment (
     id text PRIMARY KEY,
     name text NOT NULL,
     category text,
     serial text,
     status text DEFAULT 'disponible',
     stock int DEFAULT 0,
     client_id text REFERENCES insignia.clients(id)
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.service_visits (
     id text PRIMARY KEY,
     ticket_id text,
     client_id text REFERENCES insignia.clients(id),
     technician_id text REFERENCES insignia.technicians(id),
     window_label text,
     status text DEFAULT 'pendiente',
     ord int DEFAULT 0
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.opportunities (
     id text PRIMARY KEY,
     name text NOT NULL,
     client_id text REFERENCES insignia.clients(id),
     stage text DEFAULT 'nuevo',
     amount numeric DEFAULT 0,
     date text,
     summary text
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.quote_lines (
     id text PRIMARY KEY,
     name text NOT NULL,
     detail text,
     qty int DEFAULT 1,
     unit_price numeric DEFAULT 0,
     type text DEFAULT 'equipo'
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.quotes (
     id text PRIMARY KEY,
     client_id text REFERENCES insignia.clients(id),
     client_name text,
     subtotal numeric DEFAULT 0,
     iva numeric DEFAULT 0,
     total numeric DEFAULT 0,
     lines jsonb DEFAULT '[]'::jsonb,
     status text DEFAULT 'borrador',
     created_at timestamptz DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.activities (
     id text PRIMARY KEY,
     type text,
     title text,
     meta text,
     time text,
     ts timestamptz DEFAULT now()
   )`,
  `CREATE TABLE IF NOT EXISTS insignia.notifications (
     id text PRIMARY KEY,
     title text,
     body text,
     kind text,
     time text,
     unread boolean DEFAULT true
   )`,
]

export async function GET() {
  return run()
}
export async function POST() {
  return run()
}

async function run() {
  if (!hasDb) {
    return NextResponse.json({ ok: false, error: "DATABASE_URL no configurada" }, { status: 500 })
  }
  try {
    for (const stmt of DDL) await sql.query(stmt)

    // ---- Seed (idempotente vía ON CONFLICT) ----
    for (const c of clients) {
      await sql.query(
        `INSERT INTO insignia.clients (id,name,legal_name,city,state,lat,lng,contact,email,phone,account,radios,cameras,dvr,sites,since)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
         ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, legal_name=EXCLUDED.legal_name, city=EXCLUDED.city,
           state=EXCLUDED.state, lat=EXCLUDED.lat, lng=EXCLUDED.lng, contact=EXCLUDED.contact, email=EXCLUDED.email,
           phone=EXCLUDED.phone, account=EXCLUDED.account, radios=EXCLUDED.radios, cameras=EXCLUDED.cameras,
           dvr=EXCLUDED.dvr, sites=EXCLUDED.sites, since=EXCLUDED.since`,
        [c.id, c.name, c.legalName, c.city, c.state, c.lat, c.lng, c.contact, c.email, c.phone, c.account, c.radios, c.cameras, c.dvr, c.sites, c.since],
      )
    }
    for (const t of technicians) {
      await sql.query(
        `INSERT INTO insignia.technicians (id,name,role,avatar_color,initials,services,completed,efficiency,status,phone)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, role=EXCLUDED.role, avatar_color=EXCLUDED.avatar_color,
           initials=EXCLUDED.initials, services=EXCLUDED.services, completed=EXCLUDED.completed,
           efficiency=EXCLUDED.efficiency, status=EXCLUDED.status, phone=EXCLUDED.phone`,
        [t.id, t.name, t.role, t.avatarColor, t.initials, t.services, t.completed, t.efficiency, t.status, t.phone],
      )
    }
    for (const t of tickets) {
      await sql.query(
        `INSERT INTO insignia.tickets (id,title,client_id,priority,status,category,created_at,assigned_to,description)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, client_id=EXCLUDED.client_id, priority=EXCLUDED.priority,
           status=EXCLUDED.status, category=EXCLUDED.category, created_at=EXCLUDED.created_at,
           assigned_to=EXCLUDED.assigned_to, description=EXCLUDED.description`,
        [t.id, t.title, t.clientId, t.priority, t.status, t.category, t.createdAt, t.assignedTo, t.description],
      )
    }
    for (const e of equipment) {
      await sql.query(
        `INSERT INTO insignia.equipment (id,name,category,serial,status,stock,client_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, category=EXCLUDED.category, serial=EXCLUDED.serial,
           status=EXCLUDED.status, stock=EXCLUDED.stock, client_id=EXCLUDED.client_id`,
        [e.id, e.name, e.category, e.serial, e.status, e.stock, e.clientId],
      )
    }
    for (const s of serviceVisits) {
      await sql.query(
        `INSERT INTO insignia.service_visits (id,ticket_id,client_id,technician_id,window_label,status,ord)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (id) DO UPDATE SET ticket_id=EXCLUDED.ticket_id, client_id=EXCLUDED.client_id,
           technician_id=EXCLUDED.technician_id, window_label=EXCLUDED.window_label, status=EXCLUDED.status, ord=EXCLUDED.ord`,
        [s.id, s.ticketId, s.clientId, s.technicianId, s.window, s.status, s.order],
      )
    }
    for (const o of opportunities) {
      await sql.query(
        `INSERT INTO insignia.opportunities (id,name,client_id,stage,amount,date,summary)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, client_id=EXCLUDED.client_id, stage=EXCLUDED.stage,
           amount=EXCLUDED.amount, date=EXCLUDED.date, summary=EXCLUDED.summary`,
        [o.id, o.name, o.clientId, o.stage, o.amount, o.date, o.summary],
      )
    }
    for (const q of quoteLines) {
      await sql.query(
        `INSERT INTO insignia.quote_lines (id,name,detail,qty,unit_price,type)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name, detail=EXCLUDED.detail, qty=EXCLUDED.qty,
           unit_price=EXCLUDED.unit_price, type=EXCLUDED.type`,
        [q.id, q.name, q.detail, q.qty, q.unitPrice, q.type],
      )
    }
    for (const a of activities) {
      await sql.query(
        `INSERT INTO insignia.activities (id,type,title,meta,time)
         VALUES ($1,$2,$3,$4,$5)
         ON CONFLICT (id) DO UPDATE SET type=EXCLUDED.type, title=EXCLUDED.title, meta=EXCLUDED.meta, time=EXCLUDED.time`,
        [a.id, a.type, a.title, a.meta, a.time],
      )
    }
    for (const n of notifications) {
      await sql.query(
        `INSERT INTO insignia.notifications (id,title,body,kind,time,unread)
         VALUES ($1,$2,$3,$4,$5,$6)
         ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title, body=EXCLUDED.body, kind=EXCLUDED.kind,
           time=EXCLUDED.time, unread=EXCLUDED.unread`,
        [n.id, n.title, n.body, n.type, n.time, !n.read],
      )
    }

    const counts = await getCounts()
    return NextResponse.json({ ok: true, message: "Migración + seed completados", counts })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) }, { status: 500 })
  }
}

async function getCounts() {
  const tables = ["clients", "technicians", "tickets", "equipment", "service_visits", "opportunities", "quote_lines", "quotes", "activities", "notifications"]
  const out: Record<string, number> = {}
  for (const t of tables) {
    try {
      const r = (await sql.query(`SELECT count(*)::int AS n FROM insignia.${t}`)) as any
      out[t] = (r.rows ?? r)[0]?.n ?? 0
    } catch {
      out[t] = -1
    }
  }
  return out
}
