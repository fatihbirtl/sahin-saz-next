import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message, subject } = body

    if (!name || !email || !phone || !message || !subject) {
      return new NextResponse("All fields are equired", { status: 402 })
    }

    const userMessage = await prismadb.contactMessage.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
        read: false,
      },
    })

    return NextResponse.json(userMessage)
  } catch (error) {
    console.error("PAGE_POST_ERROR", error)
    // Handle other errors (e.g., notify the user)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
