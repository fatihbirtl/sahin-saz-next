import { getProducts } from "@/lib/product-data"
import { MetadataRoute } from "next"

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000
  const end = start + 50000
  const categories = await getProducts()
  return categories.map((cate) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/product/${cate.slug}`,
    lastModified: cate?.createdAt,
  }))
}
