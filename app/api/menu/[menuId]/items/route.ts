import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(
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
    const { value, url } = body
    if (!value) {
      return new NextResponse("value is required", { status: 400 })
    }
    if (!url) {
      return new NextResponse("Url is required", { status: 400 })
    }
    const lastItem = await prismadb.menuItem.findFirst({
      where: {
        menuId: params.menuId,
      },
      orderBy: {
        position: "desc",
      },
    })

    const newPosition = lastItem ? lastItem.position + 1 : 1

    const menuItem = await prismadb.menuItem.create({
      data: {
        menuId: params.menuId,
        value,
        url,
        position: newPosition,
      },
    })
    revalidatePath("/")
    return NextResponse.json(menuItem)
  } catch (error) {
    console.log("SLIDERITEM_POST_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}
