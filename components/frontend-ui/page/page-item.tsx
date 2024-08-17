"use client"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { Page } from "@/types"
import { CldImage } from "next-cloudinary"
import Link from "next/link"

interface PageItemProps {
  pageData: Page
}

export const PageItem: React.FC<PageItemProps> = ({ pageData }) => {
  if (!pageData) {
    return null
  }
  return (
    <div className="p-2 border rounded-md min-h[240px]">
      {pageData.coverImage && (
        <Link
          href={`/page/${pageData.slug}`}
          className="flex h-[240px] overflow-hidden"
        >
          <CldImage
            alt={pageData.title}
            src={pageData.coverImage}
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </Link>
      )}
      <div className="p-3 grid gap-2">
        <span
          className="text-sm font-semibold tracking-tight opacity-70"
          suppressHydrationWarning
        >
          {formatDate(pageData.createdAt)}
        </span>
        <h3 className="text-2xl font-semibold tracking-tighter">
          {pageData.title}
        </h3>

        <p>{pageData.description}</p>
        <Link href={`/page/${pageData.slug}`}>
          <Button variant="outline" className="w-full mt-6 text-sm font-bold">
            READ MORE
          </Button>
        </Link>
      </div>
    </div>
  )
}
