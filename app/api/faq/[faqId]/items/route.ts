import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const window = new JSDOM("").window
const purify = DOMPurify(window)

export async function POST(
  req: Request,
  { params }: { params: { faqId: string } }
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

    const sanitizedContent = purify.sanitize(content)
    const lastItem = await prismadb.faqItem.findFirst({
      where: {
        faqId: params.faqId,
      },
      orderBy: {
        position: "desc",
      },
    })

    const newPosition = lastItem ? lastItem.position + 1 : 1

    const faqItem = await prismadb.faqItem.create({
      data: {
        faqId: params.faqId,
        title,
        showLink,
        link,
        content: sanitizedContent,
        position: newPosition,
      },
    })
    revalidatePath("/")
    return NextResponse.json(faqItem)
  } catch (error) {
    console.log("SLIDERITEM_POST_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}
