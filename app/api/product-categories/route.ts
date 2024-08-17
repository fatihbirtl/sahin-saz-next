import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

const window = new JSDOM("").window
const purify = DOMPurify(window)

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
    const {
      name,
      slug,
      metaTitle,
      metaDescription,
      isFeatured,
      isArchived,
      imageUrl,
      description,
      content,
    } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 })
    }

    const sanitizedContent = purify.sanitize(content)
    const category = await prismadb.productCategory.create({
      data: {
        name,
        slug,
        description,
        metaTitle,
        metaDescription,
        isFeatured,
        isArchived,
        imageUrl,
        content: sanitizedContent,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log("PRODUCT_CATEGORY_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const categories = await prismadb.productCategory.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        name: "desc",
      },
      include: {
        products: true,
      },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.log("PRODUCT_CATEGORY_GET_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
