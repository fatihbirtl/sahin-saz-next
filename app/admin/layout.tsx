import { isAdmin } from "@/lib/admin"
import { redirect } from "next/navigation"
import { SideBar } from "./components/sidebar"
import { Navbar } from "./components/navbar"
import { getSession } from "@/actions"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session.userId) {
    redirect("/")
  }

  if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
    redirect("/")
  }
  return (
    <>
      <div className="h-full">
        <div className="h-[80px]  md:pl-60 xl:pl-80 fixed inset-y-0 w-full z-50 ">
          <Navbar />
        </div>
        <div className="hidden md:flex h-full w-60 xl:w-80 fixed flex-col inset-y-0 z-50">
          <SideBar />
        </div>
        <main className="md:pl-60 xl:pl-80 h-ful">
          <div className="p-4 pt-[100px]">{children}</div>
        </main>
      </div>
    </>
  )
}
