"use server"
import bcrypt from "bcryptjs"
import { sessionOptions, SessionData, defaultSession } from "@/lib"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import prismadb from "./lib/prismadb"
import { isAdmin } from "./lib/admin"

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }
  return session
}
export const login = async (
  prevstate: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession()

  const formUsername = formData.get("username") as string
  const formPassword = formData.get("password") as string

  /// Burada veritabanında gelen user bilgisini nasıl alırım iron session da kullanmak için
  const user = await prismadb.user.findUnique({
    where: {
      username: formUsername,
    },
  })
  // Check credentials
  if (!user || !(await bcrypt.compare(formPassword, user.password))) {
    return { error: "Wrong Credentialsd" }
  }
  session.userId = user?.id
  session.username = formUsername
  session.isPro = user?.isPro
  session.isLoggedIn = true
  session.role = user.role

  await session.save()
  if (session.role === "superAdmin" && isAdmin(session.userId))
    redirect("/admin")
  else {
    redirect("/")
  }
}
export const logout = async () => {
  const session = await getSession()
  session.destroy()
  redirect("/")
}
