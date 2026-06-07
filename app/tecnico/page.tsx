import { getServiceVisits, getClients, getTickets } from "@/lib/data"
import { TecnicoRutaView } from "./view"

export const dynamic = "force-dynamic"

export default async function TecnicoRutaPage() {
  const [visits, clients, tickets] = await Promise.all([getServiceVisits(), getClients(), getTickets()])
  const clientMap = Object.fromEntries(clients.map((c) => [c.id, c]))
  const ticketMap = Object.fromEntries(tickets.map((t) => [t.id, t]))
  const current = visits[0] ?? null
  const next = visits[1] ?? null
  const routeSummary = {
    services: visits.length,
    completed: visits.filter((v) => v.status === "completado").length,
    pending: visits.filter((v) => v.status !== "completado").length,
  }
  return (
    <TecnicoRutaView
      routeSummary={routeSummary}
      current={current}
      currentClient={current ? clientMap[current.clientId] ?? null : null}
      currentTicket={current ? ticketMap[current.ticketId] ?? null : null}
      next={next}
      nextClient={next ? clientMap[next.clientId] ?? null : null}
    />
  )
}
