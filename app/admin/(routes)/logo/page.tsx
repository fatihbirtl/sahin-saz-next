import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { HeaderLogo } from "./components/header-logo"
import prismadb from "@/lib/prismadb"
import { FooterLogo } from "./components/footer-logo"
import { MobileLogo } from "./components/mobile-logo"

export default async function LogoManagement() {
  const headerLogo = await prismadb.logo.findUnique({
    where: {
      name: "headerLogo",
    },
  })
  const footerLogo = await prismadb.logo.findUnique({
    where: {
      name: "footerLogo",
    },
  })

  const mobileLogo = await prismadb.logo.findUnique({
    where: {
      name: "mobileLogo",
    },
  })
  return (
    <Container>
      <Heading
        title="Logo Management"
        description="Manage your website logos easily."
      />
      <Separator />

      <div className="grid gap-6 md:grid-cols-3 py-4">
        <HeaderLogo data={headerLogo} />
        <FooterLogo data={footerLogo} />
        <MobileLogo data={mobileLogo} />
      </div>
    </Container>
  )
}
