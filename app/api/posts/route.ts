import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { getSession } from "@/actions"

const isSlugExists = async (slug: string) => {
  try {
    const existingPost = await prismadb.post.findUnique({
      where: { slug },
    })
    return existingPost !== null
  } catch (error) {
    return false
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    let {
      title,
      description,
      slug,
      content,
      categories,
      faq,
      coverImage,
      metaTitle,
      metaDescription,
      isFeatured,
      isArchived,
      relatedPosts,
      relatedProducts,
      images,
      template,
      publishedAt,
    } = body

    const window = new JSDOM("").window
    const purify = DOMPurify(window)

    const sanitizedContent = purify.sanitize(content)

    if (
      !title ||
      !description ||
      !slug ||
      !categories ||
      categories.length === 0
    ) {
      return new NextResponse("Invalid request parameters", { status: 400 })
    }

    // Check if the original slug exists
    let existingPost = await prismadb.post.findUnique({
      where: { slug },
    })

    // If the original slug exists, make it unique
    if (existingPost) {
      let counter = 1
      let newSlug = `${slug}-clone`

      while (await isSlugExists(newSlug)) {
        newSlug = `${slug}-clone${counter}`
        counter++
      }

      // Update slug for the post
      slug = newSlug
    }

    // Create or connect related posts
    const relatedPostsData = relatedPosts.map((postId: string) => ({
      id: postId,
    }))

    const relatedProductsData = relatedProducts.map((postId: string) => ({
      id: postId,
    }))

    // Determine the coverImage from the first image if coverImage is not selected but images are uploaded
    if (!coverImage && images && images.length > 0) {
      coverImage = images[0].url
    }

    const faqData = faq.map((faqId: string) => ({
      id: faqId,
    }))

    // Create the post object once
    const postData = {
      title,
      description,
      slug,
      content: sanitizedContent,
      coverImage,
      metaDescription,
      metaTitle,
      isFeatured,
      isArchived,
      template,
      publishedAt,
      categories: {
        connect: categories.map((categoryId: string) => ({
          id: categoryId,
        })),
      },
      images: images
        ? {
            createMany: {
              data: images
                .filter((image: { url: string }) => image.url) // Filter out empty URLs
                .map((image: { url: string }) => ({
                  url: image.url,
                })),
            },
          }
        : {},
      relatedPosts: {
        connect: relatedPostsData,
      },
      relatedProducts: {
        connect: relatedProductsData,
      },
      faq: {
        connect: faqData,
      },
    }

    // Create the post
    const post = await prismadb.post.create({
      data: postData,
    })
    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath("/category")
    revalidatePath("/")

    return NextResponse.json(post)
  } catch (error) {
    console.error("POST_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const posts = await prismadb.post.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        title: "desc",
      },
      include: {
        faq: true,
        categories: true,
        relatedPosts: true,
        images: true,
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.log("POSTS_GET_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
