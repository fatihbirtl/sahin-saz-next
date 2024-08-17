"use client"
import {
  Briefcase,
  Contact,
  Handshake,
  HomeIcon,
  Layout,
  ListChecks,
  MessageCircleCode,
  Newspaper,
  NewspaperIcon,
  NotebookPen,
  Settings,
  Sliders,
  Store,
  UploadIcon,
  WorkflowIcon,
} from "lucide-react"
import { SidebarItem } from "./siderbar-item"

export const SidebarRoutes = () => {
  const guessRoutes = [
    {
      icon: HomeIcon,
      label: "Ana Sayfa",
      href: "/",
    },
    {
      icon: NewspaperIcon,
      label: "Güncel Blog İçerikleri",
      href: "/blog",
    },

    {
      icon: Handshake,
      label: "Hakkımızda",
      href: "/page/hakkimizda",
    },
    {
      icon: Briefcase,
      label: "Hizmetlerimiz",
      href: "/category",
    },
    {
      icon: Store,
      label: "Ürünlerimiz",
      href: "/products",
    },
    {
      icon: Contact,
      label: "İletişim Bilgilerimiz",
      href: "/contact",
    },
  ]
  const routes = guessRoutes
  return (
    <div className="w-full flex flex-col">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}
