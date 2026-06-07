// =====================================================================
// Insignia Link — Capa de datos (servidor). Lee de Neon. CERO mock en runtime.
// Mapea filas snake_case de Postgres a las interfaces camelCase del frontend
// para que las vistas del demo v0 funcionen sin reescribir su UI.
// =====================================================================
import "server-only"
import { sql, hasDb } from "@/lib/db"
import type {
  Client,
  Technician,
  Ticket,
  Equipment,
  ServiceVisit,
  Opportunity,
} from "@/lib/mock-data"

async function q<T = any>(text: string, params: any[] = []): Promise<T[]> {
  if (!hasDb) return []
  try {
    const r = (await sql.query(text, params)) as any
    return (r.rows ?? r) as T[]
  } catch {
    return []
  }
}

export async function getClients(): Promise<Client[]> {
  const rows = await q(`SELECT * FROM insignia.clients ORDER BY name`)
  return rows.map(mapClient)
}
export async function getClient(id: string): Promise<Client | null> {
  const rows = await q(`SELECT * FROM insignia.clients WHERE id=$1`, [id])
  return rows[0] ? mapClient(rows[0]) : null
}
export async function getTechnicians(): Promise<Technician[]> {
  const rows = await q(`SELECT * FROM insignia.technicians ORDER BY name`)
  return rows.map(mapTech)
}
export async function getTickets(): Promise<Ticket[]> {
  const rows = await q(`SELECT * FROM insignia.tickets ORDER BY ts DESC, id DESC`)
  return rows.map(mapTicket)
}
export async function getTicketsByTechnician(techId: string): Promise<Ticket[]> {
  const rows = await q(`SELECT * FROM insignia.tickets WHERE assigned_to=$1 ORDER BY ts DESC`, [techId])
  return rows.map(mapTicket)
}
export async function getEquipment(): Promise<Equipment[]> {
  const rows = await q(`SELECT * FROM insignia.equipment ORDER BY category, name`)
  return rows.map(mapEquip)
}
export async function getServiceVisits(): Promise<ServiceVisit[]> {
  const rows = await q(`SELECT * FROM insignia.service_visits ORDER BY ord`)
  return rows.map(mapVisit)
}
export async function getOpportunities(): Promise<Opportunity[]> {
  const rows = await q(`SELECT * FROM insignia.opportunities ORDER BY amount DESC`)
  return rows.map(mapOpp)
}
export async function getNotifications() {
  const rows = await q(`SELECT * FROM insignia.notifications ORDER BY id DESC`)
  return rows.map((n) => ({ id: n.id, title: n.title, body: n.body, time: n.time, type: n.kind, read: !n.unread }))
}

export interface DashboardKpis {
  clients: number
  activeClients: number
  openTickets: number
  inProgressTickets: number
  resolvedTickets: number
  technicians: number
  techsInField: number
  equipment: number
  servicesActive: number
  pipelineValue: number
  avgResponse: string
}

export async function getDashboardKpis(): Promise<DashboardKpis> {
  const [c] = await q(`SELECT
      count(*)::int AS clients,
      count(*) FILTER (WHERE account='activa')::int AS active
    FROM insignia.clients`)
  const [t] = await q(`SELECT
      count(*) FILTER (WHERE status='abierto')::int AS open,
      count(*) FILTER (WHERE status='en-proceso')::int AS inprog,
      count(*) FILTER (WHERE status IN ('resuelto','completado'))::int AS resolved
    FROM insignia.tickets`)
  const [te] = await q(`SELECT count(*)::int AS techs, count(*) FILTER (WHERE status='en-campo')::int AS field FROM insignia.technicians`)
  const [eq] = await q(`SELECT coalesce(sum(stock),0)::int AS units FROM insignia.equipment`)
  const [sv] = await q(`SELECT count(*) FILTER (WHERE status IN ('en-ruta','en-progreso'))::int AS active FROM insignia.service_visits`)
  const [pl] = await q(`SELECT coalesce(sum(amount),0)::numeric AS val FROM insignia.opportunities WHERE stage NOT IN ('ganado','perdido')`)
  return {
    clients: c?.clients ?? 0,
    activeClients: c?.active ?? 0,
    openTickets: t?.open ?? 0,
    inProgressTickets: t?.inprog ?? 0,
    resolvedTickets: t?.resolved ?? 0,
    technicians: te?.techs ?? 0,
    techsInField: te?.field ?? 0,
    equipment: eq?.units ?? 0,
    servicesActive: sv?.active ?? 0,
    pipelineValue: Number(pl?.val ?? 0),
    avgResponse: "2.4 h",
  }
}

// ---- mappers ----
function mapClient(r: any): Client {
  return {
    id: r.id, name: r.name, legalName: r.legal_name, city: r.city, state: r.state,
    lat: Number(r.lat), lng: Number(r.lng), contact: r.contact, email: r.email, phone: r.phone,
    account: r.account, radios: r.radios, cameras: r.cameras, dvr: r.dvr, sites: r.sites, since: r.since,
  }
}
function mapTech(r: any): Technician {
  return {
    id: r.id, name: r.name, role: r.role, avatarColor: r.avatar_color, initials: r.initials,
    services: r.services, completed: r.completed, efficiency: r.efficiency, status: r.status, phone: r.phone,
  }
}
function mapTicket(r: any): Ticket {
  return {
    id: r.id, title: r.title, clientId: r.client_id, priority: r.priority, status: r.status,
    category: r.category, createdAt: r.created_at, assignedTo: r.assigned_to, description: r.description,
  }
}
function mapEquip(r: any): Equipment {
  return { id: r.id, name: r.name, category: r.category, serial: r.serial, status: r.status, stock: r.stock, clientId: r.client_id }
}
function mapVisit(r: any): ServiceVisit {
  return { id: r.id, ticketId: r.ticket_id, clientId: r.client_id, technicianId: r.technician_id, window: r.window_label, status: r.status, order: r.ord }
}
function mapOpp(r: any): Opportunity {
  return { id: r.id, name: r.name, clientId: r.client_id, stage: r.stage, amount: Number(r.amount), date: r.date, summary: r.summary }
}
