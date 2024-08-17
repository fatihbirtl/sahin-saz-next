import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: { sliderId: string } }
) {
  try {
    const body = await req.json()
    const { imageUrl } = body

    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (!imageUrl) {
      return new NextResponse("Image Url is required", { status: 400 })
    }
    const lastItem = await prismadb.sliderItem.findFirst({
      where: {
        sliderId: params.sliderId,
      },
      orderBy: {
        position: "desc",
      },
    })

    const newPosition = lastItem ? lastItem.position + 1 : 1

    const sliderItem = await prismadb.sliderItem.create({
      data: {
        sliderId: params.sliderId,
        imageUrl,
        position: newPosition,
      },
    })
    revalidatePath("/")
    return NextResponse.json(sliderItem)
  } catch (error) {
    console.log("SLIDERITEM_POST_ERROR", error)
    return new NextResponse("Initial Server Error", { status: 500 })
  }
}
