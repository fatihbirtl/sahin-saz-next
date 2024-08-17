import { Button } from "@/components/ui/button"
import { fetchFilteredPosts, fetchPostsPages } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function PostList({
  query,
  currentPage,
}: {
  currentPage: number
  query: string
}) {
  const posts = await fetchFilteredPosts(query, currentPage)
  const { count } = await fetchPostsPages(query)

  if (!posts.length) {
    return (
      <div className="border p-4">
        <h3 className="text-2xl font-semibold">No Post Found...</h3>
      </div>
    )
  }
  return (
    <div className="border flex flex-col rounded-md overflow-hidden">
      <span className="px-4 pt-3 pb-2 text-sm font-semibold flex border-b">
        Total Posts : {count}
      </span>
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={cn(
            "flex items-center gap-2 px-4 py-4 justify-between hover:bg-slate-50",
            index === 0 ? "" : "border-t"
          )}
        >
          <div className="flex flex-col gap-3">
            <h4>
              <Link
                className="font-semibold text-xl tracking-tight"
                href={`/blog/${post.slug}`}
              >
                {post.title}
              </Link>
            </h4>
            <p>{post.description}</p>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
