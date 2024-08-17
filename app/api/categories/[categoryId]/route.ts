import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const window = new JSDOM("").window
const purify = DOMPurify(window)

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
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

    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 })
    }

    const sanitizedContent = purify.sanitize(content)

    const category = await prismadb.postCategory.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        slug,
        metaTitle,
        metaDescription,
        isFeatured,
        isArchived,
        imageUrl,
        description,
        content: sanitizedContent,
      },
    })

    revalidatePath("/category")
    return NextResponse.json(category)
  } catch (error) {
    console.log("CATEGORY_PATCH_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const category = await prismadb.postCategory.delete({
      where: {
        id: params.categoryId,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log("CATEGORY_DELETE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = await prismadb.postCategory.findUnique({
      where: {
        id: params.categoryId,
        isArchived: false,
      },
      include: {
        posts: true,
      },
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log("PAGE_GET_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
