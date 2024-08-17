import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import { RelatedPosts } from "@/components/frontend-ui/post/related-posts"
import { RelatedProducts } from "@/components/frontend-ui/post/related-products"
import { Post } from "@/types"
import { PostImages } from "./post-image"

interface PostContentProps {
  post: Post
}
export const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <div className="col-span-2 space-y-8 ">
      <NextBreadcrumb
        homeElement="Ana Sayfa"
        items={[
          { text: "All Blog", link: "/blog" },
          {
            text: `${post.categories && post.categories[0].name}`,
            link: `/category/${post.categories && post.categories[0].slug}`,
          },
          { text: `${post.title}`, link: `${post.slug}` },
        ]}
      />
      <div className="flex flex-col gap-4">
        <div>
          <Heading descBig title={post.title} description={post.description} />
          <span
            className="font-semibold pt-3 inline-block"
            suppressHydrationWarning
          >
            Tarih: {formatDate(post.createdAt)}
          </span>
        </div>
        <div className=" items-center gap-2 p-2 border inline-flex mr-auto text-sm font-bold">
          <span className="opacity-50">Kategoriler: </span>
          {post.categories?.map((cat) => (
            <Link
              className="font-semibold text-sm text-gray-500"
              key={cat.id}
              href={`/category/${cat.slug}`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
        <Separator />

        {post.images && post.images.length === 1 && post.coverImage && (
          <Image
            src={post.coverImage}
            alt={post.title}
            width={600}
            height={600}
            className="rounded-md shadow-md w-full my-2"
            priority
          />
        )}
        {post.images && post.images?.length > 1 && <PostImages post={post} />}

        {post.content && (
          <article
            className=""
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}
      </div>
      <Separator />
      <RelatedPosts post={post} />
      {post.relatedProducts && post.relatedProducts.length > 0 && (
        <RelatedProducts product={post} />
      )}
    </div>
  )
}
