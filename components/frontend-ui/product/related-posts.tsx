import { PostItem } from "@/components/frontend-ui/post/post-item"
import { Product } from "@/types"

interface RelatedPostsProps {
  product: Product
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ product }) => {
  return (
    <>
      {product.relatedPosts && product.relatedPosts.length > 0 && (
        <div className="my-4 space-y-6">
          <div className="p-4 space-y-2  ">
            <h4 className="text-3xl font-semibold tracking-tight">
              İlgili İçerikler
            </h4>
            <p>İlginizi çekebilecek diğer içeriklerimize de göz atınız.</p>
          </div>
          <div className="grid gap-4">
            {product.relatedPosts?.map((post) => (
              <PostItem related row key={post.id} postData={post} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
