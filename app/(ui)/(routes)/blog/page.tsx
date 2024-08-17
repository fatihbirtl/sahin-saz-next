import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import PostList from "@/components/frontend-ui/post/post-list"

export const dynamic = "force-static"

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1

  return (
    <>
      <Container>
        <Heading
          title="Güncel Blog İçeriklerimiz"
          description={`Güncel blog içeriklermizi okuyun.`}
        />
        <NextBreadcrumb
          homeElement="Ana Sayfa"
          items={[{ text: `Blog`, link: `/blog` }]}
        />
        <Separator />

        <Suspense fallback={<p>Loading Posts...</p>}>
          <PostList query={query} currentPage={currentPage} />
        </Suspense>
      </Container>
    </>
  )
}
