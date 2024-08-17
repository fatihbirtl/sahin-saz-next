"use client"
import { Page, Post } from "@/types"
import { Separator } from "@/components/ui/separator"
import { PageItem } from "./page-item"

interface FeaturedPagesProps {
  posts: Page[]
}
export const FeaturedPages: React.FC<FeaturedPagesProps> = ({ posts }) => {
  return (
    <div className="py-10 my-8 space-y-8">
      <div className="pt-4  flex items-center flex-col md:flex-row md:justify-between">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight">
            Featured Pages
          </h2>
          <p className="text-xl">Featured Pages From DB.</p>
        </div>
      </div>
      <Separator />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((item) => (
          <PageItem key={item.id} pageData={item} />
        ))}
      </div>
    </div>
  )
}
