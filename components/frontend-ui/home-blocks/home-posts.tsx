"use client"
import { Post } from "@/types"
import { Separator } from "@/components/ui/separator"
import { PostItem } from "@/components/frontend-ui/post/post-item"

interface FeaturedPostsProps {
  posts: Post[]
  title: string
  description: string
}
export const FeaturedPosts: React.FC<FeaturedPostsProps> = ({
  posts,
  title,
  description,
}) => {
  return (
    <div className="pt-4 max-w-[1400px] px-6 mx-auto  py-10 my-8 space-y-8">
      <div className="flex items-center flex-col md:flex-row md:justify-between">
        <div className="space-y-6 max-w-[1170px]">
          <h2
            className=" text-3xl md:text-5xl font-bold tracking-tighter text-emerald-800 "
            style={{ lineHeight: 1.2 }}
          >
            {title}
          </h2>
          <p className="font-medium tracking-tight">{description}</p>
        </div>
      </div>
      <Separator />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {posts.map((item) => (
          <PostItem key={item.id} postData={item} />
        ))}
      </div>
    </div>
  )
}
