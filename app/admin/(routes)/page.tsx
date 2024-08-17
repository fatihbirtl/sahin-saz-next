import { getSession } from "@/actions"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { isAdmin } from "@/lib/admin"
import { redirect } from "next/navigation"

export default async function AdminHome() {
  const session = await getSession()
  if (!session.userId) {
    redirect("/")
  }

  if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
    redirect("/")
  }
  return (
    <Container>
      <Heading
        title="Dashboard Home"
        description="Manage your website easily with webstly"
      />
      <Separator />
    </Container>
  )
}
