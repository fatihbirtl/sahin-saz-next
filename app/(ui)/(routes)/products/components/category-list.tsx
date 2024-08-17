import { fetchProductCategories } from "@/lib/product-data"
import { notFound } from "next/navigation"
import { CategoryItem } from "./category-item"

export default async function CategoryList() {
  const categories = await fetchProductCategories()
  if (!categories) {
    return notFound()
  }
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <CategoryItem key={cat.id} category={cat} />
      ))}
    </div>
  )
}
