import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { SettingsForm } from "./components/settings-form"
import { redirect } from "next/navigation"

export default async function SiteSettings() {
  const settings = await prismadb.siteSettings.findFirst({
    where: {
      name: "siteSettings",
    },
  })

  return (
    <Container>
      <Heading
        title="Manage Site Settings"
        description="Create and update your site settings and contact informations"
      />
      <Separator />
      <SettingsForm settings={settings} />
    </Container>
  )
}
