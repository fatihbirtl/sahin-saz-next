import { PostItem } from "@/components/frontend-ui/post/post-item"
import { Post } from "@/types"

interface RelatedPostsProps {
  post: Post
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ post }) => {
  return (
    <>
      <div className="my-4 space-y-6">
        <div className="p-4 space-y-2  ">
          <h4 className="text-3xl font-semibold tracking-tight">
            İlgili İçerikler
          </h4>
          <p>İlginizi çekebilecek diğer içeriklerimize de göz atınız.</p>
        </div>
        <div className="grid gap-4">
          {post.relatedPosts?.length
            ? post.relatedPosts?.map((post) => (
                <PostItem related row key={post.id} postData={post} />
              ))
            : post?.categories &&
              post?.categories[0]?.posts?.map((post) => (
                <PostItem related row key={post.id} postData={post} />
              ))}
        </div>
      </div>
    </>
  )
}
