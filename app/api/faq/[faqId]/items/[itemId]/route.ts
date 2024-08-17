import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

const window = new JSDOM("").window
const purify = DOMPurify(window)

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string; faqId: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const body = await req.json()
    const { title, content, showLink, link } = body
    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }
    if (!content) {
      return new NextResponse("Content is required", { status: 400 })
    }
    if (!params.faqId) {
      return new NextResponse("FaqId is required", { status: 400 })
    }
    if (!params.itemId) {
      return new NextResponse("Faq Item Item id is required", { status: 401 })
    }
    const sanitizedContent = purify.sanitize(content)

    const faqItem = await prismadb.faqItem.update({
      where: {
        id: params.itemId,
      },
      data: {
        title,
        content: sanitizedContent,
        showLink,
        link,
      },
    })
    revalidatePath("/")
    return NextResponse.json(faqItem)
  } catch (error) {
    console.log("MENU_ITEM_PATCH_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string; faqId: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    if (!params.faqId) {
      return new NextResponse("Menu id is required", { status: 404 })
    }
    if (!params.itemId) {
      return new NextResponse("Menu Item id is required", { status: 401 })
    }

    const menuItem = await prismadb.faqItem.delete({
      where: {
        id: params.itemId,
      },
    })
    revalidatePath("/")
    revalidateTag(params.faqId)
    return NextResponse.json(menuItem)
  } catch (error) {
    console.log("MENU_ITEM_PATCH_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}
