"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface HeaderProps {
  children: React.ReactNode
}
export const Header: React.FC<HeaderProps> = ({ children }) => {
  const [headerFixed, setHeaderFixed] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHeaderFixed(true)
      } else {
        setHeaderFixed(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div
      className={cn(
        "shadow-lg bg-black sticky z-50 top-0 left-0",
        headerFixed ? "fixed-header fixed top-0 left-0 w-full max-w-none" : ""
      )}
    >
      <div
        className={cn(
          "flex bg-inherit gap-x-2 md:gap-x-4 max-w-[1400px] mx-auto items-center h-20 md:h-28 px-0 transition-all",
          headerFixed ? "md:h-20" : ""
        )}
      >
        {children}
      </div>
    </div>
  )
}
