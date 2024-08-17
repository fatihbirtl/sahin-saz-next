import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, acceptTerms } = body

    if (!name) {
      return new NextResponse("Name is Required", { status: 400 })
    }
    if (!email) {
      return new NextResponse("Email is Required", { status: 400 })
    }

    if (!acceptTerms || acceptTerms === false) {
      return new NextResponse("You should accept terms", { status: 400 })
    }

    const userMail = await prismadb.mailForm.create({
      data: {
        name,
        email,
        acceptTerms,
      },
    })

    return NextResponse.json(userMail)
  } catch (error) {
    console.error("MAIL_FORM_POST_ERROR", error)
    // Handle other errors (e.g., notify the user)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
