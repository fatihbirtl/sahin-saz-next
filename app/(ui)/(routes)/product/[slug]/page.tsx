import { Container } from "@/components/ui/container"
import { notFound } from "next/navigation"
import ProductContent from "./components/product-content"
import { Metadata } from "next"
import { getProductMeta } from "@/lib/product-data"
import { Suspense } from "react"
import Loading from "@/app/loadings"

export const dynamic = "force-static"

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      <Container className="py-0 px-4">
        <Suspense fallback={<Loading />}>
          <ProductContent params={params} />
        </Suspense>
      </Container>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // read route params
  const slug = params.slug
  const productData = await getProductMeta({ params })

  // fetch data
  if (!productData) {
    return notFound()
  }

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: productData.metaTitle || productData.title,
    description: productData.metaDescription || productData.metaTitle,
  }
}
