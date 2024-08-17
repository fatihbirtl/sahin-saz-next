"use client"
import { Button } from "@/components/ui/button"
import { formatDate, formatDateDetails, truncateDescription } from "@/lib/utils"
import { Post as PostTypes } from "@/types"
import Image from "next/image"
import Link from "next/link"

interface PostItemProps {
  postData: PostTypes
  row?: boolean
  related?: boolean
  index?: number
}

export const PostItem: React.FC<PostItemProps> = ({
  postData,
  row,
  related,
  index,
}) => {
  if (!postData) {
    return null
  }

  return (
    <div className=" min-h[500px] relative group overflow-hidden bg-black ">
      {postData.coverImage && (
        <Link
          href={`/blog/${postData.slug}`}
          className="flex h-[500px] overflow-hidden relative z-10"
        >
          <div className="absolute z-20 text-sm w-[64px] h-[64px] top-2 right-2 flex flex-col bg-emerald-700 border border-white/20 text-white rounded items-center justify-center  overflow-hidden font-bold tracking-tighter uppercase">
            <span suppressHydrationWarning>
              {formatDateDetails(postData.createdAt).day}
            </span>
            <span suppressHydrationWarning>
              {formatDateDetails(postData.createdAt).shortMonth}
            </span>
          </div>
          <Image
            alt={postData.title}
            src={postData.coverImage}
            width={600}
            height={450}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-50 transition-all group-hover:scale-105"
            priority={index && index === 0 ? true : false}
          />
          <span className="transition-all block w-full h-[350px]  absolute bottom-0 left-0  z-15 bg-gradient-to-t pointer-events-none from-black"></span>
        </Link>
      )}

      <div className="px-10 py-8 grid gap-2 absolute bottom-0 left-0 w-full z-10 text-white translate-y-[70px] transition-all group-hover:translate-y-0">
        <h3 className="text-4xl font-semibold tracking-tighter">
          {postData.title}
        </h3>

        <p> {truncateDescription(postData.description, 160)}</p>
        <Link href={`/blog/${postData.slug}`}>
          <Button
            variant="default"
            className="bg-transparent border border-white/40  hover:bg-emerald-700 mr-auto mt-6 text-xs font-bold h-auto w-auto py-3  transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-[40px] group-hover:translate-y-0 delay-200"
          >
            DEVAMINI OKU
          </Button>
        </Link>
      </div>
    </div>
  )
}
