import { Container } from "@/components/ui/container"
import { getPostMeta } from "@/lib/data"
import { notFound } from "next/navigation"
import { SideBar } from "@/components/ui/sidebar"
import { Metadata } from "next"
import { Suspense } from "react"
import Loading from "@/app/loadings"
import PostDetail from "./components/post-detail"

export const dynamic = "force-static"
type Props = {
  params: { slug: string }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Container className="py-0 max-w-[960px]">
        <Suspense
          fallback={
            <>
              <div className="col-span-2 space-y-8 ">
                <Loading />
              </div>
            </>
          }
        >
          <PostDetail params={params} />
        </Suspense>
      </Container>
    </>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const postData = await getPostMeta({ params })

  // fetch data
  if (!postData) {
    return notFound()
  }

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: postData.metaTitle || postData.title,
    description: postData.metaDescription || postData.metaTitle,
  }
}
