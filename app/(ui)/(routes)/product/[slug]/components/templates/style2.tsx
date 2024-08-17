"use client"
import { Separator } from "@/components/ui/separator"
import { Product } from "@/types"
import DOMPurify from "dompurify"
import { useEffect, useState } from "react"
import Link from "next/link"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import { useSiteSettings } from "@/hooks/use-site-settings"

import { formatPhoneNumber, formatPhoneNumberWithSpan } from "@/lib/utils"
import { BiLogoWhatsapp } from "react-icons/bi"
import { ProductImages } from "../product-images"
import { RelatedProducts } from "@/components/frontend-ui/product/related-products"
import { RelatedPosts } from "@/components/frontend-ui/product/related-posts"

interface Style2Props {
  product: Product
}
export const Style2: React.FC<Style2Props> = ({ product }) => {
  const [mounted, setMounted] = useState(false)
  const siteSettings = useSiteSettings()

  useEffect(() => {
    setMounted(true)
  }, [])
  let cleaned = ""

  if (mounted)
    cleaned = product.content ? DOMPurify.sanitize(product.content) : ""
  return (
    <div className=" space-y-4 ">
      <NextBreadcrumb
        homeElement="Ana Sayfa"
        items={[
          { text: "Products", link: "/product" },
          {
            text: `${product.categories && product.categories[0].name}`,
            link: `/products/${
              product.categories && product.categories[0].slug
            }`,
          },
          { text: `${product.title}`, link: `${product.slug}` },
        ]}
      />
      <div className="md:grid grid-cols-5 gap-10">
        <ProductImages product={product} />
        <div className="flex flex-col gap-4 p-4 col-span-3">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {product.title}
            </h1>
            <div className=" rounded-md items-center bg-teal-50 gap-2 p-1 px-2 border inline-flex mr-auto text-sm font-bold flex-wrap">
              <span className="opacity-80">Kategori: </span>
              {product.categories?.map((cat) => (
                <Link
                  className="font-normal text-sm text-teal-800"
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <p className="font-normal  py-4 tracking-tight">
              {product.description}
            </p>
            <div className="lg:flex space-y-4 gap-4 lg:space-y-0">
              {siteSettings.whatsapp && (
                <a
                  target="_blank"
                  className="flex items-center gap-x-2 text-white bg-green-700 hover:bg-green-700/90 px-6 py-3 rounded-lg shadow-2xl hover:translate-y-1 transition-all"
                  href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(
                    siteSettings.whatsapp
                  )}&text=www.kamishasir.com/product/${product.slug} ${
                    product.title
                  } Siparişi`}
                >
                  <BiLogoWhatsapp size={44} className="opacity-100" />
                  <div className="flex flex-col">
                    <span className="text-sm">WHATSAPP SİPARİŞ</span>
                    <span
                      className="text-xl font-semibold tracking-tighter"
                      dangerouslySetInnerHTML={{
                        __html: formatPhoneNumberWithSpan(
                          siteSettings.whatsapp
                        ),
                      }}
                    />
                  </div>
                </a>
              )}
              {siteSettings.phone && (
                <a
                  className="flex items-center gap-x-2 text-white bg-slate-800 hover:bg-slate-800/90 px-6 py-3 rounded-lg shadow-2xl hover:translate-y-1 transition-all"
                  href={`tel:${formatPhoneNumber(siteSettings.phone)}`}
                >
                  <BiLogoWhatsapp size={44} className="opacity-100" />
                  <div className="flex flex-col">
                    <span className="text-sm">BİZİ ARAYIN</span>
                    <span
                      className="text-xl font-semibold tracking-tighter"
                      dangerouslySetInnerHTML={{
                        __html: formatPhoneNumberWithSpan(siteSettings.phone),
                      }}
                    />
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-5">
          {!mounted ? (
            <p className="text-xl font-semibold tracking-tight">
              Loading Content...
            </p>
          ) : (
            <article
              className=""
              dangerouslySetInnerHTML={{ __html: cleaned || "" }}
            />
          )}
        </div>
      </div>

      <Separator />
      <RelatedProducts product={product} />
      <RelatedPosts product={product} />
    </div>
  )
}
