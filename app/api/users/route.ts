import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { username, email, password, role, avatar } = await req.json()

    // Normalize the username and email
    const normalizedUsername = username.trim().toLowerCase()
    const normalizedEmail = email.trim().toLowerCase()

    // Kullanıcı adı ve e-posta kontrolü
    const existingUser = await prismadb.user.findFirst({
      where: {
        OR: [{ username: normalizedUsername }, { email: normalizedEmail }],
      },
    })

    if (existingUser) {
      return new NextResponse("Invalid username or email", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prismadb.user.create({
      data: {
        username: normalizedUsername,
        email: normalizedEmail,
        password: hashedPassword,
        role,
        avatar,
      },
    })

    return new NextResponse(JSON.stringify(user), { status: 201 })
  } catch (error) {
    return new NextResponse("Something Went Wrong", { status: 500 })
  }
}
