import { getTickets, getClients, getTechnicians } from "@/lib/data"
import { TicketsView } from "./view"

export const dynamic = "force-dynamic"

export default async function AdminTicketsPage() {
  const [tickets, clients, technicians] = await Promise.all([getTickets(), getClients(), getTechnicians()])
  return <TicketsView tickets={tickets} clients={clients} technicians={technicians} />
}
