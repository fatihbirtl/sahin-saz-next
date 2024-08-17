import prismadb from "@/lib/prismadb"
import { Container } from "@/components/ui/container"
import { PostForm } from "./components/post-form"

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await prismadb.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      categories: true,
      relatedPosts: true,
      relatedProducts: true,
      images: true,
      faq: true,
    },
  })
  const otherPosts = await prismadb.post.findMany({
    //  Yukarıdaki post haricinde tüm postları getir
    where: {
      id: {
        not: params.postId,
      },
    },
    orderBy: {
      title: "desc",
    },
    include: {
      categories: true,
    },
  })

  const products = await prismadb.product.findMany({
    orderBy: {
      title: "desc",
    },
  })

  const categories = await prismadb.postCategory.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const faq = await prismadb.faq.findMany({
    orderBy: {
      name: "desc",
    },
    select: {
      id: true,
      name: true,
    },
  })
  return (
    <Container>
      <PostForm
        otherPosts={otherPosts}
        postCategories={categories}
        initialData={post}
        products={products}
        faq={faq}
      />
    </Container>
  )
}
