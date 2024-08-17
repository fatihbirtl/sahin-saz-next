import { Container } from "@/components/ui/container"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { MenuTab } from "./components/menu-tab"

interface MenuItemProps {
  params: { menuId: string }
}

export default async function SliderItems({ params }: MenuItemProps) {
  const menu = await prismadb.menu.findUnique({
    where: {
      id: params.menuId,
    },
    include: {
      items: true,
    },
  })

  if (!menu) {
    redirect("/admin/menu")
    return null // Add a return statement to exit the function early
  }

  const menuItems = await prismadb.menuItem.findMany({
    where: {
      menuId: params.menuId,
    },
    orderBy: {
      position: "asc",
    },
  })

  return (
    <Container>
      <div className="lg:grid  gap-4">
        <MenuTab menu={menu} items={menuItems} />
      </div>
    </Container>
  )
}
