import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const userMessage = await prismadb.contactMessage.delete({
      where: {
        id: params.id,
      },
    })
    return NextResponse.json(userMessage)
  } catch (error) {
    console.log("MESSAGE_DELETE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const userMessage = await prismadb.contactMessage.update({
      where: {
        id: params.id,
      },
      data: {
        read: true,
      },
    })
    return NextResponse.json(userMessage)
  } catch (error) {
    console.log("MESSAGE_DELETE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
