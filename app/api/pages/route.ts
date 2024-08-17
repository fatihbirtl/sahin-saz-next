import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { unstable_noStore as noStore } from "next/cache"
import { NextResponse } from "next/server"

const isSlugExists = async (slug: string) => {
  try {
    const existingPage = await prismadb.page.findUnique({
      where: { slug },
    })
    return existingPage !== null
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
    // console.log("Received request body:", body)
    const {
      title,
      description,
      slug,
      content,
      coverImage,
      metaTitle,
      metaDescription,
      isFeatured,
      isArchived,
      faq,
    } = body

    if (!description) {
      return new NextResponse("Invalid request parameters", { status: 400 })
    }

    if (!title || !description || !slug) {
      return new NextResponse("Invalid request parameters", { status: 400 })
    }

    // Check if the original slug exists
    let existingPage = await prismadb.page.findUnique({
      where: { slug },
    })

    if (existingPage) {
      // Slug exists, add a suffix to make it unique
      let counter = 1
      let newSlug = `${slug}-clone`

      while (await isSlugExists(newSlug)) {
        newSlug = `${slug}-clone${counter}`
        counter++
      }

      const faqData = faq.map((faqId: string) => ({
        id: faqId,
      }))

      const post = await prismadb.page.create({
        data: {
          title,
          description,
          slug: newSlug,
          content,
          coverImage,
          metaDescription,
          metaTitle,
          isFeatured,
          isArchived,
          faq: {
            connect: faqData,
          },
        },
      })

      return NextResponse.json(post)
    } else {
      // Slug is unique, proceed with regular creation
      const faqData = faq.map((faqId: string) => ({
        id: faqId,
      }))
      const post = await prismadb.page.create({
        data: {
          title,
          description,
          slug,
          content,
          coverImage,
          metaDescription,
          metaTitle,
          isFeatured,
          isArchived,
          faq: {
            connect: faqData,
          },
        },
      })

      return NextResponse.json(post)
    }
  } catch (error) {
    console.error("PAGE_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  noStore()
  try {
    const pages = await prismadb.page.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        title: "desc",
      },
      include: {
        faq: true,
      },
    })
    return NextResponse.json(pages)
  } catch (error) {
    console.log("PAGES_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
