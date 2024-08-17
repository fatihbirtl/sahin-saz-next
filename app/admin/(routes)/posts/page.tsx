import { format } from "date-fns"
import { Container } from "@/components/ui/container"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"
import { PostsClient } from "./components/client"
import { PostColumn } from "./components/columns"
import { getSession } from "@/actions"

export default async function Pages() {
  const session = await getSession()
  if (!session.userId) {
    redirect("/")
  }

  if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
    redirect("/")
  }
  const posts = await prismadb.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      categories: true,
      relatedPosts: true,
      relatedProducts: true,
      images: true,
    },
  })

  const formattedPosts: PostColumn[] = posts.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    slug: item.slug,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    coverImage: item.coverImage,
    content: item.content,
    metaDescription: item.metaDescription,
    metaTitle: item.metaTitle,
    categories: item.categories,
    relatedPosts: item.relatedPosts,
    relatedProducts: item.relatedProducts,
    images: item.images,
    template: item.template,
  }))

  return (
    <Container>
      <PostsClient data={formattedPosts} />
    </Container>
  )
}
