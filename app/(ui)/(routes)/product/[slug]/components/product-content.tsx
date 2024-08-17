import { Style1 } from "./templates/style1"
import { getProduct } from "@/lib/product-data"
import { notFound } from "next/navigation"

export default async function ProductContent({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProduct({ params })
  if (!product) {
    return notFound()
  }

  return <Style1 product={product} />
}
