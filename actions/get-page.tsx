import { Page } from "@/types"
const URL = `${process.env.NEXT_PUBLIC_API_URL}/pages`

const getPage = async (slug: string): Promise<Page> => {
  const res = await fetch(`${URL}/${slug}`, { cache: "no-store" })
  return res.json()
}

export default getPage
