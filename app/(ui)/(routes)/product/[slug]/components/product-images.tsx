"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Product } from "@/types"
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react"
import { CldImage } from "next-cloudinary"
import FsLightbox from "fslightbox-react"
import { useEffect, useState } from "react"

interface ProductImageProps {
  product: Product
}

export const ProductImages: React.FC<ProductImageProps> = ({ product }) => {
  const [imageId, setImageId] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [index, setIndex] = useState(2)
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: index,
  })

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return <div className="min-h-[600px] bg-slate-200 w-full col-span-2 "></div>
  }

  const imagesLength = product.images?.length || 1

  const handlePrevClick = () => {
    if (imageId !== 0) {
      setImageId((prev) => prev - 1)
    } else {
      setImageId(imagesLength - 1)
    }
  }
  const handleNextClick = () => {
    if (imageId !== imagesLength - 1) {
      setImageId((prev) => prev + 1)
    } else {
      setImageId(0)
    }
  }
  function openLightboxOnSlide(number: number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    })
  }

  return (
    <div className="images-wrapper grid gap-6 col-span-2  ">
      <div className="flex gap-[4px] px-2 py-4 fixed md:hidden left-0 bottom-0 z-40 scale-95 origin-bottom-left">
        <Button
          onClick={() => {
            setIndex(0)
            openLightboxOnSlide(0)
          }}
          className="gap-2 px-3 py-3 h-auto w-auto bg-amber-600 hover:bg-amber-700 cursor-pointer"
        >
          <ImageIcon className="w-7 h-7 shrink-0" />
          <span className=" font-semibold grid text-left">
            <span className="text-xs">Ürün</span>
            <span className="text-xs">Resimleri</span>
          </span>
        </Button>
      </div>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={
          product.images &&
          product.images.map((image) =>
            image.url.replace(/^http:\/\//i, "https://")
          )
        }
      />
      <div className="relative w-full rounded-md">
        {product.images &&
          product.images.map((image, index) => (
            <Button
              title={product.title}
              className="flex bg-transparent h-auto p-0 w-full hover:bg-transparent"
              onClick={() => {
                setIndex(index)
                openLightboxOnSlide(index)
              }}
              key={image.id}
            >
              <CldImage
                src={image.url}
                alt={product.title}
                width={600}
                height={600}
                crop="fill"
                priority={index === 0}
                className={cn(
                  "opacity-0 rounded-md w-full my-2 visible shadow-2xl",
                  imageId === index ? "opacity-100 visible" : "hidden"
                )}
              />
            </Button>
          ))}
        <div className="controls">
          <Button
            onClick={handlePrevClick}
            className="absolute top-[48%] z-10 left-2 p-0 h-8 w-8 rounded-full shadow-xl"
            size="icon"
            variant="outline"
          >
            <ChevronLeft size={22} />
          </Button>
          <Button
            onClick={handleNextClick}
            className="absolute top-[48%] z-10 right-2 p-0 h-8 w-8 rounded-full shadow-xl"
            size="icon"
            variant="outline"
          >
            <ChevronRight size={22} />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {product.images &&
          product.images.map((image, index) => (
            <Button
              className="p-0 h-auto bg-transparent hover:bg-transparent"
              onClick={() => setImageId(index)}
              key={image.id}
            >
              <CldImage
                src={image.url}
                alt={product.title}
                width={60}
                height={60}
                crop="fill"
                className={cn(
                  "opacity-60 hover:opacity-80 transition-all hover:border-teal-100 rounded-md  border-[2px] border-white hover:scale-105",
                  imageId === index
                    ? "opacity-100 border-teal-500 scale-105 relative z-10 shadow-xl hover:opacity-100 hover:border-teal-500"
                    : ""
                )}
              />
            </Button>
          ))}
      </div>
    </div>
  )
}
