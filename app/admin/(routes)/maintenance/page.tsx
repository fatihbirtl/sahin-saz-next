import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { SettingsForm } from "./components/settings-form"

export default async function SiteSettings() {
  const settings = await prismadb.maintenanceMode.findFirst()

  return (
    <Container>
      <Heading
        title="Maintenance Mode"
        description="Update your web sites maintenance mode."
      />
      <Separator />
      <SettingsForm settings={settings} />
    </Container>
  )
}
