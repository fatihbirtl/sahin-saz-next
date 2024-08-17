"use client"
import { Button } from "@/components/ui/button"
import { truncateDescription } from "@/lib/utils"
import { Product } from "@/types"
import { CldImage } from "next-cloudinary"
import Link from "next/link"

interface ProductItemProps {
  productData: Product
  row?: boolean
  related?: boolean
}

export const ProductItem: React.FC<ProductItemProps> = ({
  productData,
  row,
  related,
}) => {
  if (!productData) {
    return null
  }
  return !row ? (
    <div className="p-2 border rounded-md min-h[240px]">
      {productData.coverImage && (
        <Link
          href={`/product/${productData.slug}`}
          className="flex h-[333px] overflow-hidden relative"
        >
          <CldImage
            alt={productData.title}
            src={productData.coverImage}
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </Link>
      )}
      {!productData.coverImage && productData.images && (
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
      <div className="p-3 grid gap-4">
        {!related ? (
          <h3 className="text-2xl font-semibold tracking-tighter">
            {productData.title}
          </h3>
        ) : (
          <h5 className="text-2xl font-semibold tracking-tighter">
            {productData.title}
          </h5>
        )}
        <p>{truncateDescription(productData.description, 120)}</p>
        <Link href={`/product/${productData.slug}`}>
          <Button className=" mt-6 h-8 py-0 px-7 bg-teal-700  hover:bg-teal-800/90 text-white  font-semibold text-xs rounded-sm">
            ÜRÜNÜ İNCELE
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex p-2 border rounded-md gap-2 items-center">
      {productData.images && (
        <Link
          href={`/product/${productData.slug}`}
          className="flex w-[80px] h-[80px] md:w-[150px] md:h-[150px] md:max-w-[20%] md:max-h-[150px] overflow-hidden relative"
        >
          <CldImage
            alt={productData.title}
            src={productData.images[0].url}
            width={150}
            height={150}
            crop="fill"
            className="w-full rounded-md h-full object-cover"
          />
        </Link>
      )}
      <div className="p-3 grid gap-2 w-full">
        <div>
          {!related ? (
            <h3 className="text-xl font-semibold tracking-tight">
              <Link href={`/product/${productData.slug}`}>
                {productData.title}
              </Link>
            </h3>
          ) : (
            <h5 className="text-xl font-semibold tracking-tight">
              <Link href={`/product/${productData.slug}`}>
                {productData.title}
              </Link>
            </h5>
          )}
        </div>
        <p className="text-sm hidden md:block">
          {truncateDescription(productData.description, 120)}
        </p>

        <Link href={`/product/${productData.slug}`} className="mr-auto">
          <Button size="sm" variant="outline" className="  text-sm font-bold">
            READ MORE
          </Button>
        </Link>
      </div>
    </div>
  )
}
