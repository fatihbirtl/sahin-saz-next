"use client"
import SearchList from "@/components/frontend-ui/search-list"
import { Button } from "@/components/ui/button"
import {
  buildMenuTree,
  cn,
  formatPhoneNumber,
  formatPhoneNumberWithSpan,
} from "@/lib/utils"
import { MenuTypes } from "@/types"
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Phone,
  PhoneCall,
  PhoneForwarded,
  PhoneOutgoing,
  SearchIcon,
  Smartphone,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { MenuToggleIcon } from "./menu-toggle-icon"
import {
  BiLogoWhatsapp,
  BiPhone,
  BiPhoneCall,
  BiPhoneIncoming,
} from "react-icons/bi"

interface MainNavProps {
  className?: string
  menu: MenuTypes
  children?: React.ReactNode
}

export const MainNav: React.FC<MainNavProps> = ({
  className,
  menu,
  children,
}) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [activeLink, setActiveLink] = useState("")
  const [subActiveLink, setSubActiveLink] = useState("")
  useEffect(() => {
    setOpen(false)
    setShowSearch(false)
    window.scrollTo(0, 0)
    setSubActiveLink("")
    setActiveLink("")
  }, [pathname])

  const formattedMenu = buildMenuTree(menu.items)

  if (!menu) {
    return null
  }
  return (
    <div className="w-full flex items-center h-20 md:order-1">
      <nav
        className={cn(
          "flex items-center gap-x-2 main-nav z-20 w-full ",

          open ? "open" : ""
        )}
      >
        {formattedMenu && formattedMenu.length > 0 && (
          <ul className="main-menu mycolor">
            {formattedMenu.map((item) => (
              <li
                key={item.id}
                className={cn(
                  item.children?.length ? "dropdown" : "",
                  activeLink === item.id ? "is_active" : ""
                )}
              >
                <Link
                  href={item.url}
                  onClick={() =>
                    setActiveLink(activeLink === item.id ? "" : item.id)
                  }
                >
                  {item.value}
                  {item.children && item.children.length > 0 && (
                    <ChevronDown size={16} />
                  )}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul>
                    {item.children.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={cn(
                          subItem.children?.length ? "dropdown" : "",
                          subActiveLink === subItem.id ? "is_active" : ""
                        )}
                      >
                        <Link
                          href={subItem.url}
                          onClick={() =>
                            setSubActiveLink(
                              subActiveLink === subItem.id ? "" : subItem.id
                            )
                          }
                        >
                          {subItem.value}
                          {subItem.children && subItem.children.length > 0 && (
                            <ChevronRight size={16} />
                          )}
                        </Link>
                        {subItem.children && subItem.children.length > 0 && (
                          <ul>
                            {subItem.children.map((subSubItem) => (
                              <li key={subSubItem.id}>
                                <Link href={subSubItem.url}>
                                  {subSubItem.value}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
        <div className="grid p-4 gap-4 w-full lg:hidden">
          <a
            className="flex items-center gap-x-2 border bg-emerald-200/5 mycolor px-4 py-2 border-white/10 rounded-sm text-white w-full"
            href={`tel:${formatPhoneNumber("05442930416")}`}
          >
            <BiPhone className="opacity-80  shrink-0 h-8 w-8" />
            <div className="flex flex-col">
              <span>Bizi Arayın</span>
              <span
                className="text-2xl tracking-tight font-semibold"
                dangerouslySetInnerHTML={{
                  __html: formatPhoneNumberWithSpan("0544 2930416"),
                }}
              />
            </div>
          </a>

          <a
            className="flex items-center gap-x-2 border bg-emerald-600/50 mycolor px-4 py-2 border-white/10 rounded-sm text-white w-full"
            href={`tel:${formatPhoneNumber("05442930416")}`}
          >
            <BiLogoWhatsapp className="opacity-80  shrink-0 h-12 w-12" />
            <div className="flex flex-col">
              <span>Whatsapp</span>
              <span
                className="text-2xl tracking-tight font-semibold"
                dangerouslySetInnerHTML={{
                  __html: formatPhoneNumberWithSpan("0544 2930416"),
                }}
              />
            </div>
          </a>
        </div>
      </nav>
      {children}

      <Button
        size="icon"
        variant="secondary"
        onClick={() => setShowSearch((show) => !show)}
        className={cn(
          " bg-transparent shrink-0 h-14 w-14 hover:bg-orange-300/70 transition-all rounded-full hover:border-yellow-900/20 mycolor hover:text-white ml-auto",
          open ? "opacity-0" : ""
        )}
      >
        {showSearch ? (
          <X className="w-6 h-6" />
        ) : (
          <SearchIcon className="w-6 h-6" />
        )}
      </Button>
      <MenuToggleIcon setOpen={setOpen} open={open} />

      <div
        onClick={() => setOpen(false)}
        className={cn("overlay", open ? "open" : "")}
      ></div>
      {showSearch && (
        <div className="h-[80px] shadow-xl border-t border-b bg-white flex items-center absolute top-[100%] left-0 w-full">
          <div className="max-w-[1400px] w-full mx-auto px-4">
            <SearchList placeholder="Search in website..." />
          </div>
        </div>
      )}
    </div>
  )
}
