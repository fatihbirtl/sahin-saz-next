import { Button } from "@/components/ui/button"
import { fetchFilteredPages, fetchSearchPages } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default async function PageList({
  query,
  currentPage,
}: {
  currentPage: number
  query: string
}) {
  const pages = await fetchFilteredPages(query, currentPage)

  const { pageCount } = await fetchSearchPages(query)

  if (!pages.length) {
    return (
      <div className="border p-4">
        <h3 className="text-2xl font-semibold">No Page Found...</h3>
      </div>
    )
  }
  return (
    <div className="border flex flex-col rounded-md overflow-hidden">
      <span className="px-4 pt-3 pb-2 text-sm font-semibold flex border-b">
        Total Pages : {pageCount}
      </span>
      {pages.map((page, index) => (
        <div
          key={page.id}
          className={cn(
            "flex items-center gap-2 px-4 py-4 justify-between hover:bg-slate-50",
            index === 0 ? "" : "border-t"
          )}
        >
          <div className="flex flex-col gap-3">
            <h4>
              <Link
                className="font-semibold text-xl tracking-tight"
                href={`/page/${page.slug}`}
              >
                {page.title}
              </Link>
            </h4>
            <p>{page.description}</p>
          </div>
          <Link href={`/page/${page.slug}`}>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      ))}
    </div>
  )
}
