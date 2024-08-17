import { getSession } from "@/actions"
import LoginForm from "@/components/frontend-ui/login-form"
import { isAdmin } from "@/lib/admin"
import { redirect } from "next/navigation"

export default async function Login() {
  const session = await getSession()

  if (session.userId) {
    if (session.role === "superAdmin" && isAdmin(session.userId)) {
      redirect("/admin")
    }
    if (
      session.isLoggedIn ||
      (session.role !== "superAdmin" && !isAdmin(session.userId))
    ) {
      redirect("/")
    }
  }

  return <LoginForm />
}
