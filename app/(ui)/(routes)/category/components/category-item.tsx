"use client"

import { Button } from "@/components/ui/button"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { PostCategory } from "@/types"
import { ArrowRight } from "lucide-react"
import { CldImage } from "next-cloudinary"
import Link from "next/link"

interface CategoryItemProps {
  category: PostCategory
}
export const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const { notFoundImageUrl } = useSiteSettings()

  if (!category || !category.posts?.length) {
    return null
  }

  return (
    <div className="p-2 border overflow-hidden rounded-md">
      {category.imageUrl && (
        <Link
          href={`/category/${category.slug}`}
          className="h-[240px] rounded-md overflow-hidden flex"
        >
          <CldImage
            width={600}
            height={450}
            crop="fill"
            alt={category.name}
            src={category.imageUrl}
            className="object-cover"
          />
        </Link>
      )}
      {!category.imageUrl && notFoundImageUrl && (
        <Link
          href={`/category/${category.slug}`}
          className="h-[240px] rounded-md overflow-hidden flex"
        >
          <CldImage
            width={600}
            height={600}
            crop="fill"
            alt={category.name}
            src={notFoundImageUrl}
            className="object-cover"
          />
        </Link>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold tracking-tight">
          <Link title={category.name} href={`/category/${category.slug}`}>
            {category.name}
          </Link>
        </h3>
        {category.description && <p>{category.description}</p>}
        <Link
          className="flex mt-4"
          title={category.name}
          href={`/category/${category.slug}`}
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
