import { format } from "date-fns"
import { Container } from "@/components/ui/container"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { ProductsClient } from "./components/client"
import { ProductColumn } from "./components/columns"
import { getSession } from "@/actions"

export default async function Pages() {
  const session = await getSession()
  if (!session.userId) {
    redirect("/")
  }

  if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
    redirect("/")
  }
  const products = await prismadb.product.findMany({
    orderBy: {
      title: "desc",
    },
    include: {
      categories: true,
      relatedProducts: true,
      relatedPosts: true,
      images: true,
    },
  })
  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    slug: item.slug,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    images: item.images,
    content: item.content,
    metaDescription: item.metaDescription,
    metaTitle: item.metaTitle,
    categories: item.categories,
    relatedProducts: item.relatedProducts,
    relatedPosts: item.relatedPosts,
    template: item.template,
  }))

  return (
    <Container>
      <ProductsClient data={formattedProducts} />
    </Container>
  )
}
