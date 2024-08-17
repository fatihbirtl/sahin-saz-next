"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SideBarItemProps {
  icon: LucideIcon
  label: string
  href: string
}
export const SidebarItem: React.FC<SideBarItemProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname()
  const router = useRouter()

  const isActive =
    (pathname === "/admin" && href === "/admin") ||
    pathname === href ||
    (href !== "/admin" && pathname?.startsWith(`${href}/`))

  const onClick = () => {
    router.push(href)
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center relative gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:text-sky-700 hover:bg-sky-200/20"
      )}
    >
      <div
        className={cn(
          "mr-auto opacity-0 border-2 absolute left-0 top-0 z-20 border-sky-700 h-full transition-all",
          isActive && "opacity-80"
        )}
      />
      <div className="flex items-center gap-x-2 py-4 relative">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
    </button>
  )
}
