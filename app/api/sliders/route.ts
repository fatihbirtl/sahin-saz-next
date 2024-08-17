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
    const { name, imageWidth, imageHeight } = body

    if (!name) {
      return new NextResponse("Slider Name is required", { status: 400 })
    }
    if (!imageWidth) {
      return new NextResponse("Image Width is required", { status: 400 })
    }
    if (!imageHeight) {
      return new NextResponse("Image Height is required", { status: 400 })
    }

    const slider = await prismadb.slider.create({
      data: {
        userId: session.userId,
        name,
        imageHeight,
        imageWidth,
      },
    })
    return NextResponse.json(slider)
  } catch (error) {
    console.log("SLIDER_POST_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const sliders = await prismadb.slider.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(sliders)
  } catch (error) {
    console.log("SLIDERS_GET_ERROR", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}
