import { format } from "date-fns"
import { Container } from "@/components/ui/container"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { CategoriesClient } from "./components/client"
import { CategoryColumn } from "./components/columns"
import { getSession } from "@/actions"

export default async function Pages() {
  const session = await getSession()
  if (!session.userId) {
    redirect("/")
  }

  if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
    redirect("/")
  }
  const categories = await prismadb.productCategory.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <Container>
      <CategoriesClient data={formattedCategories} />
    </Container>
  )
}
