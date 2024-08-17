import prismadb from "@/lib/prismadb"

import { FaqColumn } from "./components/columns"
import { FaqClient } from "./components/client"
import { Container } from "@/components/ui/container"

export default async function FaqManagement() {
  const faqs = await prismadb.faq.findMany({
    include: {
      items: true,
    },
  })

  const formattedMenus: FaqColumn[] = faqs.map((item) => ({
    id: item.id,
    name: item.name,
    items: item.items.length,
  }))
  return (
    <Container>
      <FaqClient data={formattedMenus} />
    </Container>
  )
}
