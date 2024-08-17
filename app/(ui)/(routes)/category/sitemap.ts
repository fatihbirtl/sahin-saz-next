import getPostCategories from "@/actions/get-post-categories"
import { fetchCategories } from "@/lib/data"
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
  const categories = await fetchCategories()
  return categories.map((cate) => ({
    url: `${process.env.NEXT_PUBLIC_URL}/category/${cate.slug}`,
    lastModified: cate?.createdAt,
  }))
}
