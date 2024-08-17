import { ProductItem } from "@/components/frontend-ui/product/product-item"
import { fetchFilteredProducts } from "@/lib/product-data"

export default async function ProductList({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const products = await fetchFilteredProducts(query, currentPage)

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductItem productData={product} key={product.id} />
      ))}
    </div>
  )
}
