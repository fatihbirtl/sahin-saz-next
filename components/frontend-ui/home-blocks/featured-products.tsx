"use client"
import { Product } from "@/types"
import { Separator } from "@/components/ui/separator"
import { ProductItem } from "@/components/frontend-ui/product/product-item"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface FeaturedProductsProps {
  posts: Product[]
  title: string
  description: string
}
export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  posts,
  title,
  description,
}) => {
  return (
    <div className=" my-8 space-y-8 mx-auto max-w-[1400px] py-[80px] px-6">
      <div className=" flex items-center flex-col md:flex-row md:justify-between">
        <div className="space-y-6 max-w-[1170px]">
          <h2 className=" text-3xl md:text-5xl font-bold tracking-tighter text-emerald-800 ">
            {title}
          </h2>
          <p className="font-medium  tracking-tight">{description}</p>
        </div>
      </div>
      <Separator />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((item) => (
          <ProductItem key={item.id} productData={item} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link className="inline-flex mx-auto" href="/products">
          <Button className="px-10  py-8 min-w-[260px] shadow-2xl font-bold tracking-tight bg-slate-800 hover:bg-emerald-slate-900 border border-slate-900">
            TÜM ÜRÜNLERİMİZ
          </Button>
        </Link>
      </div>
    </div>
  )
}
