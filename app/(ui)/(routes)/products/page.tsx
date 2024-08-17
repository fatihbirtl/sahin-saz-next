import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import { Suspense } from "react"
import Loading from "@/app/loadings"
import CategoryList from "./components/category-list"

export const dynamic = "force-static"

export default async function CategoriesPage() {
  return (
    <Container className="py-0">
      <NextBreadcrumb
        homeElement="Ana Sayfa"
        items={[{ text: "Category", link: "/products" }]}
      />
      <Heading
        title="Ürün Kategorileri"
        description="Tüm ürünlerimizi keşfedin."
      />
      <Separator />
      <Suspense fallback={<Loading />}>
        <CategoryList />
      </Suspense>
    </Container>
  )
}
