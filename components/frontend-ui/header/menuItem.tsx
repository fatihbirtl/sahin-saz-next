import { cn } from "@/lib/utils"
import { MenuItemTypes } from "@/types"
import Link from "next/link"

interface MenuItemProps {
  route: MenuItemTypes
  isActive: boolean
}

export const MenuItem: React.FC<MenuItemProps> = ({ route, isActive }) => {
  return (
    <Link
      href={route.url}
      key={route.id}
      className={cn(
        "py-3 h-16 flex items-center px-4 font-semibold tracking-tight text-sm opacity-70 hover:opacity-100 transition-opacity",
        isActive ? "opacity-100" : ""
      )}
    >
      {route.value}
    </Link>
  )
}
