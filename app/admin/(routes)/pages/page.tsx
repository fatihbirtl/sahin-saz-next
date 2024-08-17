import { format } from "date-fns"
import { Container } from "@/components/ui/container"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { PagesClient } from "./components/client"
import { PageColumn } from "./components/columns"
import { getSession } from "@/actions"

export default async function Pages() {
  const session = await getSession()
  if (!session.userId) {
    redirect("/")
  }

  if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
    redirect("/")
  }
  const pages = await prismadb.page.findMany({
    orderBy: {
      title: "desc",
    },
  })

  const formattedPages: PageColumn[] = pages.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    content: item.content,
    coverImage: item.coverImage,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    metaDescription: item.metaDescription,
    metaTitle: item.metaTitle,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <Container>
      <PagesClient data={formattedPages} />
    </Container>
  )
}
