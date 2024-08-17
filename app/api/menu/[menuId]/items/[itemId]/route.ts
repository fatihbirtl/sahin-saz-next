import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { itemId: string; menuId: string } }
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
    const { value, url } = body
    if (!value) {
      return new NextResponse("value is required", { status: 405 })
    }
    if (!url) {
      return new NextResponse("Url is required", { status: 402 })
    }
    if (!params.menuId) {
      return new NextResponse("Menu id is required", { status: 404 })
    }
    if (!params.itemId) {
      return new NextResponse("Menu Item id is required", { status: 401 })
    }

    const menuItem = await prismadb.menuItem.update({
      where: {
        id: params.itemId,
      },
      data: {
        value,
        url,
      },
    })
    revalidatePath("/")
    return NextResponse.json(menuItem)
  } catch (error) {
    console.log("MENU_ITEM_PATCH_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { itemId: string; menuId: string } }
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
      return new NextResponse("Menu id is required", { status: 404 })
    }
    if (!params.itemId) {
      return new NextResponse("Menu Item id is required", { status: 401 })
    }

    const menuItem = await prismadb.menuItem.delete({
      where: {
        id: params.itemId,
      },
    })
    revalidatePath("/")
    revalidateTag(params.menuId)
    return NextResponse.json(menuItem)
  } catch (error) {
    console.log("MENU_ITEM_PATCH_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}
