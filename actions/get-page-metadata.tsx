import { Page } from "@/types"
import { Metadata } from "next"

interface PageProps {
  params: { slug: string; pageId: string }
}

type Props = {
  params: { slug: string }
}
const URL = `${process.env.NEXT_PUBLIC_API_URL}/pages`

export async function generatePageMetadata({
  params,
}: Props): Promise<Metadata> {
  const slug = params.slug

  const page: Page = await fetch(`${URL}/${slug}`).then((res) => res.json())

  return {
    title: page.metaTitle,
    description: page.metaDescription,
  }
}
