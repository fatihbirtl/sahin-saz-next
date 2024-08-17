import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import { MenuClient } from "./components/client"
import { MenuColumn } from "./components/columns"
import { format } from "date-fns"

export default async function MenuManagement() {
  const menus = await prismadb.menu.findMany({
    include: {
      items: true,
    },
  })

  const formattedMenus: MenuColumn[] = menus.map((item) => ({
    id: item.id,
    name: item.name,
    items: item.items.length,
  }))
  return (
    <Container>
      <MenuClient data={formattedMenus} />
    </Container>
  )
}
