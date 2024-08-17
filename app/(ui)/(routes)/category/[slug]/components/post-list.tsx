import { fetchFilteredCategory } from "@/lib/data"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import { PostItem } from "@/components/frontend-ui/post/post-item"

export default async function PostList({
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
  const category = await fetchFilteredCategory(query, currentPage, params)

  if (!category) {
    return <div>No Posts Found</div>
  }
  return (
    <>
      <NextBreadcrumb
        homeElement="Ana Sayfa"
        items={[
          { text: "Category", link: "/category" },
          { text: `${category.name}`, link: `/category/${category.slug}` },
        ]}
      />

      <Heading
        title={category.name}
        description={`Bu kategoride (${count}) adet içerik mevcuttur.`}
      />

      <Separator />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 ">
        {category?.posts?.map((post) => (
          <PostItem key={post.id} postData={post} />
        ))}
      </div>
    </>
  )
}
