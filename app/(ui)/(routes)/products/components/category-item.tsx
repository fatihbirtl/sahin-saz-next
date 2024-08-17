"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { ProductCategory } from "@/types"
import { ArrowRight } from "lucide-react"
import { CldImage } from "next-cloudinary"
import Link from "next/link"

interface CategoryItemProps {
  category: ProductCategory
}
export const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const { notFoundImageUrl } = useSiteSettings()

  if (!category) {
    return null
  }

  return (
    <div className="p-2 border overflow-hidden rounded-md">
      {category.imageUrl && (
        <Link
          href={`/products/${category.slug}`}
          className="h-[240px] rounded-md overflow-hidden flex"
        >
          <CldImage
            width={600}
            height={400}
            crop="fill"
            alt={category.name}
            src={category.imageUrl}
            className="object-cover"
          />
        </Link>
      )}
      {!category.imageUrl && notFoundImageUrl && (
        <Link
          href={`/products/${category.slug}`}
          className="h-[240px] rounded-md overflow-hidden flex"
        >
          <CldImage
            width={600}
            height={400}
            crop="fill"
            alt={category.name}
            src={notFoundImageUrl}
            className="object-cover"
          />
        </Link>
      )}
      <div className="p-4">
        <Badge className="mb-1 mt-2 rounded-md" variant="outline">
          ({category.products?.length}) Ürün Mevcut{" "}
        </Badge>
        <h3 className="text-2xl mb-3 font-semibold tracking-tighter">
          <Link title={category.name} href={`/products/${category.slug}`}>
            {category.name}
          </Link>
        </h3>

        {category.description && <p>{category.description}</p>}
        <Link
          className="flex mt-4"
          title={category.name}
          href={`/products/${category.slug}`}
        >
          <Button className="w-full" variant="outline">
            {category.name}
            <ArrowRight size={16} className="ml-auto" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
