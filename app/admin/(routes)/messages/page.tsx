import { format } from "date-fns"
import { Container } from "@/components/ui/container"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { ContactMessagesClient } from "./components/client"
import { MessageColumn } from "./components/columns"
import { getSession } from "@/actions"

export default async function MessagesPages() {
  const session = await getSession()
  if (!session.userId) {
    redirect("/")
  }

  if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
    redirect("/")
  }
  const messages = await prismadb.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedMessages: MessageColumn[] = messages.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    email: item.email,
    read: item.read,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <Container>
      <ContactMessagesClient data={formattedMessages} />
    </Container>
  )
}
