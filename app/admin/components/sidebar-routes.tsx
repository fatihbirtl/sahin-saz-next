"use client"
import {
  CheckCircleIcon,
  FileQuestion,
  Layout,
  ListChecks,
  MenuIcon,
  MessageCircleCode,
  Newspaper,
  NotebookPen,
  Settings,
  Settings2Icon,
  Sliders,
  Store,
  ThumbsUp,
  UploadIcon,
  Workflow,
} from "lucide-react"
import { SidebarItem } from "./siderbar-item"

export const SidebarRoutes = () => {
  const guessRoutes = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/admin",
    },

    {
      icon: Sliders,
      label: "Slider Management",
      href: "/admin/sliders",
    },
    {
      icon: Store,
      label: "Product Management",
      href: "/admin/products",
    },
    {
      icon: CheckCircleIcon,
      label: "Product Category Management",
      href: "/admin/product-categories",
    },
    {
      icon: NotebookPen,
      label: "Pages",
      href: "/admin/pages",
    },
    {
      icon: Newspaper,
      label: "Post Management",
      href: "/admin/posts",
    },
    {
      icon: ListChecks,
      label: "Post Category Management",
      href: "/admin/categories",
    },
    {
      icon: UploadIcon,
      label: "Logo Management",
      href: "/admin/logo",
    },
    {
      icon: Settings,
      label: "Site Settings",
      href: "/admin/site-settings",
    },
    {
      icon: MessageCircleCode,
      label: "Messages",
      href: "/admin/messages",
    },
    {
      icon: ThumbsUp,
      label: "Social Media Settings",
      href: "/admin/social-media",
    },
    {
      icon: MenuIcon,
      label: "Menu Management",
      href: "/admin/menu",
    },
    {
      icon: Settings2Icon,
      label: "Maintenance Mode",
      href: "/admin/maintenance",
    },
    {
      icon: FileQuestion,
      label: "Faq Management",
      href: "/admin/faq",
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
