import { getEquipment, getClients } from "@/lib/data"
import { InventarioView } from "./view"

export const dynamic = "force-dynamic"

export default async function AdminInventarioPage() {
  const [equipment, clients] = await Promise.all([getEquipment(), getClients()])
  return <InventarioView equipment={equipment} clients={clients} />
}
