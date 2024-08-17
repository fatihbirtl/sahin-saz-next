"use client"
import { cn } from "@/lib/utils"
import { MenuTypes } from "@/types"
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface MainNavProps {
  className?: string
  menu: MenuTypes
  title?: string
}

export const FooterMenu: React.FC<MainNavProps> = ({
  className,
  title,
  menu,
}) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const menuRoutes = menu.items.map((route) => ({
    href: `${route.url}`,
    label: route.value,
    isActive: pathname === `${route.url}`,
    id: route.id,
  }))

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  if (!menu) {
    return null
  }
  return (
    <>
      {title && (
        <h4
          onClick={() => setOpen((prev) => !prev)}
          className="px-4 cursor-pointer md:cursor-text flex items-center py-6 md:border-0 border-b border-white/30 font-semibold tracking-tight"
        >
          {title}
          {open ? (
            <ChevronUp className="w-4 h-4 ml-auto md:hidden" />
          ) : (
            <ChevronDown className="w-4 h-4 ml-auto md:hidden" />
          )}
        </h4>
      )}
      <nav className={cn(" flex flex-col", open ? "active" : "", className)}>
        {menu &&
          menu.items.length > 0 &&
          menuRoutes.map((route) => (
            <Link
              href={route.href}
              key={route.id}
              className={cn(
                "py-3  flex items-center px-4 font-semibold tracking-tight text-sm opacity-70 hover:opacity-100 transition-opacity",
                route.isActive ? "opacity-100" : ""
              )}
            >
              {route.label}
            </Link>
          ))}
      </nav>
    </>
  )
}
