import { Container } from "@/components/ui/container"
import prismadb from "@/lib/prismadb"
import { MenuForm } from "./components/menu-form"

export default async function MenuPage({
  params,
}: {
  params: { menuId: string }
}) {
  const menu = await prismadb.menu.findUnique({
    where: {
      id: params.menuId,
    },
  })

  return (
    <Container>
      <MenuForm menu={menu} />
    </Container>
  )
}
