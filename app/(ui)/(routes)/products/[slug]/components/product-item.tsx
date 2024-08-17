"use client"
import { Button } from "@/components/ui/button"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { formatDateDetails, truncateDescription } from "@/lib/utils"
import { Product } from "@/types"
import { CldImage } from "next-cloudinary"
import Link from "next/link"

interface ProductItemProps {
  productData: Product
}

export const ProductItem: React.FC<ProductItemProps> = ({ productData }) => {
  const { notFoundImageUrl } = useSiteSettings()
  if (!productData) {
    return null
  }
  return (
    <div className="p-2 border rounded-md min-h[240px]">
      {productData.images && (
        <Link
          href={`/product/${productData.slug}`}
          className="flex h-[240px] overflow-hidden relative"
        >
          <CldImage
            alt={productData.title}
            src={productData.images[0].url}
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </Link>
      )}

      {!productData.images && notFoundImageUrl && (
        <Link
          href={`/product/${productData.slug}`}
          className="flex h-[240px] overflow-hidden relative"
        >
          <CldImage
            alt={productData.title}
            src={notFoundImageUrl}
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </Link>
      )}
      <div className="p-3 grid gap-4">
        <h3 className="text-2xl font-semibold tracking-tighter">
          {productData.title}
        </h3>
        <p>{truncateDescription(productData.description, 120)}</p>
        <Link href={`/product/${productData.slug}`}>
          <Button variant="outline" className="w-full mt-6 text-sm font-bold">
            READ MORE
          </Button>
        </Link>
      </div>
    </div>
  )
}
