import { getMaintenanceMode } from "@/lib/data"
import { MaintenanceContent } from "@/components/frontend-ui/maintenance/maintenance-content"

export default async function Maintenance() {
  const maintenace = await getMaintenanceMode()

  if (!maintenace) {
    return null
  }
  return <MaintenanceContent content={maintenace} />
}
