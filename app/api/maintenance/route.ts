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
    const { mode, content } = body

    const siteSettings = await prismadb.maintenanceMode.create({
      data: {
        name: "maintenance",
        mode,
        content,
      },
    })
    return NextResponse.json(siteSettings)
  } catch (error) {
    console.log("SITESETTINGS_POST_ERROR", error)
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
    const { mode, content } = body

    const siteSettings = await prismadb.maintenanceMode.update({
      where: {
        name: "maintenance",
      },
      data: {
        mode,
        content,
      },
    })
    return NextResponse.json(siteSettings)
  } catch (error) {
    console.log("SITESETTINGS_PATCH_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
