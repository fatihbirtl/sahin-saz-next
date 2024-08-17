import prismadb from "@/lib/prismadb"
import { Container } from "@/components/ui/container"
import { ProductForm } from "./components/product-form"

export default async function Page({
  params,
}: {
  params: { productId: string }
}) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      categories: true,
      relatedProducts: true,
      relatedPosts: true,
      images: true,
      faq: true,
    },
  })
  const otherProducts = await prismadb.product.findMany({
    //  Yukarıdaki post haricinde tüm postları getir
    where: {
      id: {
        not: params.productId,
      },
    },
    orderBy: {
      title: "desc",
    },
    include: {
      categories: true,
    },
  })

  const relatedPosts = await prismadb.post.findMany({
    orderBy: {
      title: "desc",
    },
  })

  const categories = await prismadb.productCategory.findMany({
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
      <ProductForm
        otherProducts={otherProducts}
        productCategories={categories}
        initialData={product}
        posts={relatedPosts}
        faq={faq}
      />
    </Container>
  )
}
