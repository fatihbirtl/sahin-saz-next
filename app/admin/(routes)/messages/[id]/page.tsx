import prismadb from "@/lib/prismadb"
import { Container } from "@/components/ui/container"
import { redirect } from "next/navigation"
import { MessageForm } from "./components/message-form"

export default async function Page({ params }: { params: { id: string } }) {
  const message = await prismadb.contactMessage.findUnique({
    where: {
      id: params.id,
    },
  })
  if (!message) {
    redirect("/admin/messages")
  }

  // Only update if the message exists

  return (
    <Container>
      <MessageForm data={message} />
    </Container>
  )
}
