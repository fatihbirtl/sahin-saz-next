import { Metadata } from "next"
import { Page as PageTypes } from "@/types"
import { Suspense } from "react"
import PageWrapper from "./components/page-wrapper"
import { PageSkeleton } from "./components/page-skeleton"
import { getPageMeta } from "@/lib/data"
import { notFound } from "next/navigation"

export const dynamic = "force-static"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const page = await getPageMeta({ params })
  if (!page) {
    return notFound()
  }

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: page?.metaTitle || page?.title,
    description: page?.metaDescription || page?.description,
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageWrapper slug={params.slug} />
    </Suspense>
  )
}
