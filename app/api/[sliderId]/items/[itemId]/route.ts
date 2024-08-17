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
  { params }: { params: { itemId: string; sliderId: string } }
) {
  try {
    const body = await req.json()
    const {
      title,
      description,
      imageUrl,
      showButton,
      href,
      buttonText,
      content,
    } = body

    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    if (!params.sliderId) {
      return new NextResponse("SliderId is required", { status: 403 })
    }
    if (!params.itemId) {
      return new NextResponse("Item id is required", { status: 403 })
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 })
    }

    const sanitizedContent = purify.sanitize(content)

    const sliderItem = await prismadb.sliderItem.update({
      where: {
        id: params.itemId,
      },
      data: {
        imageUrl,
        title,
        description,
        showButton,
        buttonText,
        href,
        content: sanitizedContent,
      },
    })

    revalidatePath("/")
    return NextResponse.json(sliderItem)
  } catch (error) {
    console.log("SLIDERITEM_POST_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string; sliderId: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    if (!params.sliderId) {
      return new NextResponse("SliderId is required", { status: 403 })
    }
    if (!params.itemId) {
      return new NextResponse("Item id is required", { status: 403 })
    }

    const sliderItem = await prismadb.sliderItem.delete({
      where: {
        id: params.itemId,
      },
    })
    revalidatePath("/")
    return NextResponse.json(sliderItem)
  } catch (error) {
    console.log("SLIDERITEM_POST_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}
