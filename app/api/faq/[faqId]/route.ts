import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PATCH(
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
    const {
      name,
      items,
      isFeatured,
      isArchived,
      position,
      title,
      description,
    } = body

    if (!name) {
      return new NextResponse("Menu name is required", { status: 400 })
    }
    if (!params.faqId) {
      return new NextResponse("Menu id is required", { status: 400 })
    }
    const faq = await prismadb.faq.update({
      where: {
        id: params.faqId,
      },
      data: {
        name,
        isFeatured,
        isArchived,
        position,
        title,
        description,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.log("FAQ_PATCH_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
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
    if (!params.faqId) {
      return new NextResponse("Menu id is required", { status: 400 })
    }
    const faq = await prismadb.faq.delete({
      where: {
        id: params.faqId,
      },
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.log("FAQ_DELETE_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { faqId: string } }
) {
  try {
    const faq = await prismadb.faq.findUnique({
      where: {
        id: params.faqId,
      },
      include: {
        items: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.log("MENU_POST_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
