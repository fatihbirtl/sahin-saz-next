import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"

import { FaqTab } from "./components/faq-tab"
import { Container } from "@/components/ui/container"

interface MenuItemProps {
  params: { faqId: string }
}

export default async function FaqItems({ params }: MenuItemProps) {
  const faq = await prismadb.faq.findUnique({
    where: {
      id: params.faqId,
    },
    include: {
      items: true,
    },
  })

  if (!faq) {
    redirect("/admin/faq")
    return null // Add a return statement to exit the function early
  }

  const faqItems = await prismadb.faqItem.findMany({
    where: {
      faqId: params.faqId,
    },

    orderBy: {
      position: "asc",
    },
  })

  return (
    <Container>
      <div className="lg:grid  gap-4">
        <FaqTab faq={faq} items={faqItems} />
      </div>
    </Container>
  )
}
