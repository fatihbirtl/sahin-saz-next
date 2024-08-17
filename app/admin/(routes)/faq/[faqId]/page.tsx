import prismadb from "@/lib/prismadb"

import { FaqForm } from "./components/faq-form"
import { Container } from "@/components/ui/container"

export default async function FaqPage({
  params,
}: {
  params: { faqId: string }
}) {
  const faq = await prismadb.faq.findUnique({
    where: {
      id: params.faqId,
    },
  })

  return (
    <Container>
      <FaqForm faq={faq} />
    </Container>
  )
}
