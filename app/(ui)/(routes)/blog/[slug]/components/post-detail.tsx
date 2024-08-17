import { getPost } from "@/lib/data"
import { PostContent } from "./post-content"
import { notFound } from "next/navigation"

export default async function PostDetail({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost({ params })
  if (!post) {
    return notFound()
  }
  return (
    <>
      <PostContent post={post} />
    </>
  )
}
