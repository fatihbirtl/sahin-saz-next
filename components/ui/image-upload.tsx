"use client"

import { CldUploadWidget } from "next-cloudinary"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ImagePlus, Trash } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
  className?: string
  selectedCover?: string | null // Receive selected cover prop
  onCoverSelect?: (url: string) => void // Handler for cover selection
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  className,
  selectedCover,
  onCoverSelect,
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    onChange(result.info.url)
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className="mb-4 flex flex-col max-h-[400px] overflow-auto items-center gap-4">
        {value.map((url) => (
          <div
            onClick={() => {
              if (selectedCover !== url) {
                onCoverSelect?.(url) // Set as cover
              }
            }}
            key={url}
            className={cn(
              "relative w-[100%] h-[200px] shrink-0 rounded-md overflow-hidden",
              selectedCover === url ? "border-4 border-red-700" : "",
              className
            )}
          >
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="destructive"
                size="sm"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      >
        {({ open }) => {
          const onClick = () => {
            return open()
          }

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload

// "post": {
//   "id": "7d9b3c04-1e8a-4db7-a982-6f5e8729d5a7",
//   "author": "Hannah Browns",
//   "publishedAt": "2023-08-23",
//   "imgUrl": "/stories/ben-stern-4n96lyJd2Xs-unsplash.jpg",
//   "sourceUrl": "https://www.euronews.com/green/2023/08/23/meet-the-company-using-discarded-oyster-shells-to-cut-energy-costs-and-keep-frances-buildi",
//   "translations": {
//     "en-US": {
//       "enTitle": "The paint made from oyster shells could...",
//       "enBody": "Cool Roof France (CRF) uses discarded oyster..."
//     },
//     "tr-Tr": {
//       "trTitle": "Türkçe başlık",
//       "trBody": "Türkçe içerik.."
//       }
//   }
// },
