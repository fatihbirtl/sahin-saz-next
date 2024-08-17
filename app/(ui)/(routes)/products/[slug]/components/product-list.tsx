import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import { fetchFilteredProductCategory } from "@/lib/product-data"
import { ProductItem } from "@/components/frontend-ui/product/product-item"

export default async function ProductList({
  query,
  currentPage,
  params,
  count,
}: {
  currentPage: number
  query: string
  params: { params: { slug: string } }
  count: number
}) {
  const category = await fetchFilteredProductCategory(
    query,
    currentPage,
    params
  )

  if (!category) {
    return <div>No Posts Found</div>
  }
  return (
    <>
      <NextBreadcrumb
        homeElement="Ana Sayfa"
        items={[
          { text: "Category", link: "/products" },
          { text: `${category.name}`, link: `/products/${category.slug}` },
        ]}
      />

      <Heading
        title={category.name}
        description={`Bu kategoride (${count}) adet ürün  bulunmaktadır.`}
      />

      <Separator />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 xl:grid-cols-4">
        {category?.products?.map((product, index) => (
          <ProductItem key={product.id} productData={product} />
        ))}
      </div>
    </>
  )
}
