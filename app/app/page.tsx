import { getClients, getTickets } from "@/lib/data"
import { ClientPortalView } from "./view"

export const dynamic = "force-dynamic"

export default async function ClientPortalHome() {
  const [clients, tickets] = await Promise.all([getClients(), getTickets()])
  const client = clients[0]
  if (!client) return <div className="p-6 text-sm text-muted-foreground">Sin datos de cliente.</div>
  const myTickets = tickets.filter((t) => t.clientId === client.id)
  return <ClientPortalView client={client} myTickets={myTickets} />
}
