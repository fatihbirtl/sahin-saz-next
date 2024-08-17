import { fetchFilteredPosts } from "@/lib/data"
import { PostItem } from "@/components/frontend-ui/post/post-item"

export default async function PostList({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const posts = await fetchFilteredPosts(query, currentPage)

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
      {posts.map((post, index) => (
        <PostItem index={index} postData={post} key={post.id} />
      ))}
    </div>
  )
}
