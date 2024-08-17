import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import Pagination from "@/components/frontend-ui/pagination"
import { Suspense } from "react"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import { fetchProductsPages } from "@/lib/product-data"
import ProductList from "@/components/frontend-ui/product/product-list"
import Loading from "@/app/loadings"
import SearchCategory from "@/components/frontend-ui/search-product"

async function GetProducts({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const { totalPages, count } = await fetchProductsPages(query)

  return (
    <>
      <Heading
        title="Tüm Ürünlerimiz"
        description={`Bu sayfada toplamda (${count}) adet ürün bulunmaktadır.`}
      />
      <NextBreadcrumb
        homeElement="Ana Sayfa"
        items={[{ text: `Ürünler`, link: `/product` }]}
      />
      <Separator />
      <SearchCategory placeholder="Ürün Ara..." />
      <ProductList query={query} currentPage={currentPage} />
      <Pagination totalPages={totalPages} />
    </>
  )
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  return (
    <>
      <Container>
        <Suspense fallback={<Loading />}>
          <GetProducts searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  )
}
