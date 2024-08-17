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
    const { name, items } = body

    if (!name) {
      return new NextResponse("Menu name is required", { status: 400 })
    }
    const menu = await prismadb.menu.create({
      data: {
        name,
        items: {
          create: items,
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(menu)
  } catch (error) {
    console.log("MENU_POST_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const menu = await prismadb.menu.findMany({
      include: {
        items: true,
      },
    })

    return NextResponse.json(menu)
  } catch (error) {
    console.log("MENU_POST_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}
