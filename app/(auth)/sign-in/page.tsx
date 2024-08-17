import { getSession } from "@/actions"
import { SignInForm } from "@/components/frontend-ui/signin-form"
import { getUser } from "@/lib/data"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  const users = await getUser()
  const session = await getSession()
  if (session.isLoggedIn) {
    redirect("/")
  }
  return (
    <>
      <SignInForm users={users} />
    </>
  )
}
