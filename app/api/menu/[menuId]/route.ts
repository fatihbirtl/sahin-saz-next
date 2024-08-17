import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { menuId: string } }
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
    const { name, items } = body

    if (!name) {
      return new NextResponse("Menu name is required", { status: 400 })
    }
    if (!params.menuId) {
      return new NextResponse("Menu id is required", { status: 400 })
    }
    const menu = await prismadb.menu.update({
      where: {
        id: params.menuId,
      },
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

export async function DELETE(
  req: Request,
  { params }: { params: { menuId: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    if (!params.menuId) {
      return new NextResponse("Menu id is required", { status: 400 })
    }
    const menu = await prismadb.menu.delete({
      where: {
        id: params.menuId,
      },
    })

    return NextResponse.json(menu)
  } catch (error) {
    console.log("MENU_POST_ERROR", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { menuId: string } }
) {
  try {
    const menu = await prismadb.menu.findUnique({
      where: {
        id: params.menuId,
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
