import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const window = new JSDOM("").window
const purify = DOMPurify(window)

const isSlugExists = async (slug: string) => {
  try {
    const existingProduct = await prismadb.product.findUnique({
      where: { slug },
    })
    return existingProduct !== null
  } catch (error) {
    return false
  }
}
export async function POST(req: Request) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const body = await req.json()

    let {
      title,
      description,
      slug,
      content,
      categories,
      metaTitle,
      metaDescription,
      isFeatured,
      isArchived,
      images,
      relatedProducts,
      relatedPosts,
      faq,
      template,
      coverImage,
    } = body

    const sanitizedContent = purify.sanitize(content)

    if (!title || !description || !slug) {
      return new NextResponse("Invalid request parameters", { status: 400 })
    }

    if (!categories || categories.length === 0) {
      return new NextResponse("Categories is required", { status: 405 })
    }

    // Check if the original slug exists
    let existingProduct = await prismadb.product.findUnique({
      where: { slug },
    })

    // If the original slug exists, make it unique
    if (existingProduct) {
      let counter = 1
      let newSlug = `${slug}-clone`

      while (await isSlugExists(newSlug)) {
        newSlug = `${slug}-clone${counter}`
        counter++
      }

      // Update slug for the post
      slug = newSlug
    }
    const relatedProductsData =
      relatedProducts && relatedProducts.length > 0
        ? relatedProducts.map((productId: string) => ({ id: productId }))
        : []

    const relatedPostsData =
      relatedPosts && relatedPosts.length > 0
        ? relatedPosts.map((postId: string) => ({ id: postId }))
        : []
    if (!coverImage && images && images.length > 0) {
      coverImage = images[0].url
    } else {
      coverImage = ""
    }

    const faqData = faq.map((faqId: string) => ({
      id: faqId,
    }))

    // Create the post object once
    const productData = {
      title,
      description,
      slug,
      content: sanitizedContent,
      metaDescription,
      metaTitle,
      isFeatured,
      isArchived,
      template,
      coverImage,
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
      relatedProducts: {
        connect: relatedProductsData,
      },
      relatedPosts: {
        connect: relatedPostsData,
      },
      faq: {
        connect: faqData,
      },
    }

    // Create the post
    const product = await prismadb.product.create({
      data: productData,
    })
    revalidatePath("/products")
    revalidatePath("/")
    revalidatePath("/category")
    revalidatePath(`/product`)

    return NextResponse.json(product)
  } catch (error) {
    console.error("PRODUCT_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const posts = await prismadb.product.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        title: "desc",
      },
      include: {
        categories: true,
        relatedProducts: true,
        images: true,
        relatedPosts: true,
        faq: true,
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.log("PRODUCTS_GET_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
