import { PostCategory } from "@/types"
const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`

const getPostCategories = async (): Promise<PostCategory[]> => {
  console.log("Constructed URL:", URL)
  console.log(
    "API URL from environment variables:",
    process.env.NEXT_PUBLIC_API_URL
  )

  const res = await fetch(URL)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res.json()
}

export default getPostCategories
