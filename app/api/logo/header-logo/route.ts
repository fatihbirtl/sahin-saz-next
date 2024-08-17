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
    const { name, imageUrl, width, height } = body

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 })
    }

    if (!width) {
      return new NextResponse("Width is required", { status: 400 })
    }
    if (!height) {
      return new NextResponse("height is required", { status: 400 })
    }

    const headerLogo = await prismadb.logo.create({
      data: {
        name: "headerLogo",
        width,
        height,
        imageUrl,
      },
    })
    return NextResponse.json(headerLogo)
  } catch (error) {
    console.log("PAGE_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const body = await req.json()
    const { name, imageUrl, width, height } = body

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 })
    }

    if (!width) {
      return new NextResponse("Width is required", { status: 400 })
    }
    if (!height) {
      return new NextResponse("height is required", { status: 400 })
    }

    const headerLogo = await prismadb.logo.update({
      where: {
        name: "headerLogo",
      },
      data: {
        name: "headerLogo",
        width,
        height,
        imageUrl,
      },
    })
    return NextResponse.json(headerLogo)
  } catch (error) {
    console.log("PAGE_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
