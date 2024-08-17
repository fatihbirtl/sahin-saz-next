import { Button } from "@/components/ui/button"
import { truncateDescription } from "@/lib/utils"
import { Product } from "@/types"
import Image from "next/image"

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
  return (
    <div className=" rounded-md min-h[444px] group">
      {productData.coverImage && (
        <Link
          href={`/product/${productData.slug}`}
          className="flex h-[444px] shadow-2xl relative rounded-lg border border-emerald-700/40"
        >
          <Image
            alt={productData.title}
            src={productData.coverImage}
            width={600}
            height={450}
            className="w-full h-full object-cover rounded-lg"
          />
        </Link>
      )}

      <div className="   gap-2 max-w-[100%] relative z-10 bg-white border border-slate-800/40 -top-20 -left-6 px-8 py-10 text-dark rounded-md group-hover:text-white transition-all group-hover:-top-28 group-hover:bg-slate-950">
        <h3 className="text-3xl font-semibold tracking-tighter">
          {productData.title}
        </h3>

        <p className=" tracking-tight">
          {truncateDescription(productData.description, 300)}
        </p>
        <Link href={`/product/${productData.slug}`}>
          <Button variant="secondary" className=" mt-6 h-10 py-0 px-4">
            ÜRÜNÜ İNCELE
          </Button>
        </Link>
      </div>
    </div>
  )
}
