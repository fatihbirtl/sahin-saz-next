import { getSession, logout } from "@/actions"
import { Button } from "./ui/button"
import { LogOutIcon } from "lucide-react"

export const LogoutButton = async () => {
  const session = await getSession()
  if (!session.userId) return null

  return (
    <form action={logout}>
      <Button
        size="sm"
        className="font-bold w-full flex text-sm border border-slate-300 tracking-tight gap-x-2 py-5 px-4 "
        variant="secondary"
        title="Logout"
      >
        <span>Logout</span>
        <LogOutIcon size={16} />
      </Button>
    </form>
  )
}
