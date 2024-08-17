"use client"
import { Button } from "@/components/ui/button"
import { useSiteSettings } from "@/hooks/use-site-settings"
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
  const { notFoundImageUrl } = useSiteSettings()
  if (!postData) {
    return null
  }

  return !row ? (
    <div className="p-2 border rounded-md min-h[240px]">
      {postData.coverImage && (
        <Link
          href={`/blog/${postData.slug}`}
          className="flex h-[240px] overflow-hidden relative"
        >
          <div className="absolute text-sm w-[50px] h-[50px] top-2 right-2 flex flex-col bg-white rounded items-center justify-center  overflow-hidden font-bold tracking-tighter uppercase">
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
            className="w-full h-full object-cover"
            priority={index && index === 0 ? true : false}
          />
        </Link>
      )}
      {!postData.coverImage && notFoundImageUrl && (
        <Link
          href={`/blog/${postData.slug}`}
          className="flex h-[240px] overflow-hidden relative"
        >
          <div className="absolute text-sm w-[50px] h-[50px] top-2 right-2 flex flex-col bg-white rounded items-center justify-center  overflow-hidden font-bold tracking-tighter uppercase">
            <span suppressHydrationWarning>
              {formatDateDetails(postData.createdAt).day}
            </span>
            <span suppressHydrationWarning>
              {formatDateDetails(postData.createdAt).shortMonth}
            </span>
          </div>
          <Image
            alt={postData.title}
            src={notFoundImageUrl}
            width={600}
            height={450}
            className="w-full h-full object-cover"
            priority={index && index === 0 ? true : false}
          />
        </Link>
      )}
      <div className="p-3 grid gap-4">
        {!related ? (
          <h3 className="text-2xl font-semibold tracking-tighter">
            {postData.title}
          </h3>
        ) : (
          <h5 className="text-2xl font-semibold tracking-tighter">
            {postData.title}
          </h5>
        )}
        <p> {truncateDescription(postData.description, 160)}</p>
        <Link href={`/blog/${postData.slug}`}>
          <Button variant="outline" className="w-full mt-6 text-xs font-bold">
            DEVAMINI OKU
          </Button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex p-2 border rounded-md gap-2 items-center">
      {postData.coverImage && (
        <Link
          href={`/blog/${postData.slug}`}
          className="flex w-[80px] h-[80px] md:w-[150px] md:h-[150px] md:max-w-[20%] md:max-h-[150px] overflow-hidden relative"
        >
          <Image
            alt={postData.title}
            src={postData.coverImage}
            width={150}
            height={150}
            className=" rounded-md object-cover h-[150px] w-[150px]"
            priority={index && index === 0 ? true : false}
          />
        </Link>
      )}
      <div className="p-3 grid gap-2 w-full">
        <div>
          {!related ? (
            <h3 className="text-xl font-semibold tracking-tight">
              <Link href={`/blog/${postData.slug}`}>{postData.title}</Link>
            </h3>
          ) : (
            <h5 className="text-xl font-semibold tracking-tight">
              <Link href={`/blog/${postData.slug}`}>{postData.title}</Link>
            </h5>
          )}
          <span
            className="font-semibold text-xs inline-block"
            suppressHydrationWarning
          >
            {formatDate(postData.createdAt)}
          </span>
        </div>
        <p className="text-sm hidden md:block">
          {truncateDescription(postData.description, 150)}
        </p>

        <Link href={`/blog/${postData.slug}`} className="mr-auto">
          <Button
            size="sm"
            variant="outline"
            className="w-full  text-xs h-7 px-6 font-bold mt-4"
          >
            DEVAMINI OKU
          </Button>
        </Link>
      </div>
    </div>
  )
}
