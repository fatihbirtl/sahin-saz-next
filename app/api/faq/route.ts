import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

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
      items,
      title,
      description,
      posts,
      pages,
      products,
      isFeatured,
      isArchived,
      position,
    } = body

    if (!name) {
      return new NextResponse("Menu name is required", { status: 400 })
    }
    const faq = await prismadb.faq.create({
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
    console.log("FAQ_POST_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const faq = await prismadb.faq.findMany({
      include: {
        items: true,
        products: true,
        posts: true,
        pages: true,
      },
    })

    return NextResponse.json(faq)
  } catch (error) {
    console.log("MENU_POST_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
