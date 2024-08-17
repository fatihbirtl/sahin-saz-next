import { Container } from "@/components/ui/container"

import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import { Suspense } from "react"
import CategoryList from "./components/category-list"
import Loading from "@/app/loadings"

export const dynamic = "force-static"

export default async function CategoriesPage() {
  return (
    <Container className="py-0">
      <NextBreadcrumb
        homeElement="Ana Sayfa"
        items={[{ text: "Category", link: "/category" }]}
      />
      <Heading
        title="Kategorilerimize Göz Atınz"
        description="ürün ve hizmetlerimizi keşfedin. Taze ve doğal içeriklerimizi de okuyarak keyifli vakit geçirebilirsiniz."
      />
      <Separator />
      <Suspense fallback={<Loading />}>
        <CategoryList />
      </Suspense>
    </Container>
  )
}
