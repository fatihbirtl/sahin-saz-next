import getPage from "@/actions/get-page"
import { PageInfo } from "./page-info"
import { notFound } from "next/navigation"

export default async function PageWrapper({ slug }: { slug: string }) {
  const pageDetail = await getPage(slug)

  if (!pageDetail) {
    return notFound()
  }
  return <PageInfo data={pageDetail} />
}
