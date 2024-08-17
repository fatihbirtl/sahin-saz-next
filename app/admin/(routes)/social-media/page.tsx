import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { SocialMedia } from "./components/social-media-form"

export default async function LogoManagement() {
  const settings = await prismadb.socialMedia.findUnique({
    where: {
      name: "socialMedia",
    },
  })

  return (
    <Container>
      <Heading
        title="Social Media Management"
        description="Manage your website logos easily."
      />
      <Separator />

      <SocialMedia settings={settings} />
    </Container>
  )
}
