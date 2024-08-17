import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function PATCH(
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
    const body = await req.json()
    const { name, imageWidth, imageHeight } = body

    if (!name) {
      return new NextResponse("Slider Name is required", { status: 400 })
    }
    if (!params.sliderId) {
      return new NextResponse("Slider id is required", { status: 400 })
    }

    const slider = await prismadb.slider.update({
      where: {
        id: params.sliderId,
      },
      data: {
        name,
        imageHeight,
        imageWidth,
      },
    })
    revalidatePath(`/`)
    return NextResponse.json(slider)
  } catch (error) {
    console.log("SLIDER_POST_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(
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

    if (!params.sliderId) {
      return new NextResponse("Slider id is required", { status: 400 })
    }

    const slider = await prismadb.slider.delete({
      where: {
        id: params.sliderId,
      },
    })
    revalidatePath(`/`)
    return NextResponse.json(slider)
  } catch (error) {
    console.log("SLIDER_POST_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sliderId: string } }
) {
  try {
    if (!params.sliderId) {
      return new NextResponse("Slider Id is required", { status: 400 })
    }

    const slider = await prismadb.slider.findUnique({
      where: {
        id: params.sliderId,
      },
      include: {
        sliderItems: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    return NextResponse.json(slider)
  } catch (error) {
    console.log("SLIDER_GET_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
