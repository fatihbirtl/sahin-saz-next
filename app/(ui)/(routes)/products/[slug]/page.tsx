import { Container } from "@/components/ui/container"
import { notFound, redirect } from "next/navigation"
import ProductList from "./components/product-list"
import Pagination from "@/components/frontend-ui/pagination"
import { Metadata } from "next"
import {
  fetchFilteredProductCategoryPages,
  getProductCategoryMeta,
} from "@/lib/product-data"
import { Suspense } from "react"
import Loading from "@/app/loadings"

export const dynamic = "force-static"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const category = await getProductCategoryMeta({ params })
  if (!category) notFound()

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: category.metaTitle || category.name,
    description: category.metaDescription || category.metaTitle,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  const pagesInfo = await fetchFilteredProductCategoryPages(query, {
    params,
  })

  if (!pagesInfo) {
    redirect("/products")
  }

  const { totalPages, count } = pagesInfo

  return (
    <Container className="py-0">
      {pagesInfo ? (
        <Suspense fallback={<Loading />}>
          <ProductList
            count={count}
            params={{ params }}
            query={query}
            currentPage={currentPage}
          />
        </Suspense>
      ) : (
        <div>
          <h4 className="text-2xl font-semibold tracking-tight">
            No posts found...
          </h4>
        </div>
      )}
      {totalPages !== 0 && <Pagination totalPages={totalPages} />}
    </Container>
  )
}
