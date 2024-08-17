import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function PUT(
  req: Request,
  { params }: { params: { sliderId: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const { list } = await req.json()

    for (let item of list) {
      await prismadb.sliderItem.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    }
    revalidatePath("/")
    return new NextResponse("Success", { status: 200 })
  } catch (error) {
    console.log("SLIDERITEM_[REORDER]_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
