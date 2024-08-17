import Pagination from "@/components/frontend-ui/pagination"
import SearchList from "@/components/frontend-ui/search-list"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { fetchSearchPages } from "@/lib/data"
import PostList from "./components/post-list"
import PageList from "./components/page-list"

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const { totalPages, count } = await fetchSearchPages(query)
  return (
    <Container>
      <Heading title="This is Search page" />
      <Separator />
      <SearchList placeholder="Search invoices..." />
      <div className="grid grid-cols-2 gap-6">
        <PostList query={query} currentPage={currentPage} />
        <PageList query={query} currentPage={currentPage} />
      </div>
      <Pagination totalPages={totalPages} />
    </Container>
  )
}
