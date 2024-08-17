"use client"
import { MaintenanceMode } from "@/types"
import DOMPurify from "dompurify"
import { useEffect, useState } from "react"

interface MaintenaceContentProps {
  content: MaintenanceMode
}
export const MaintenanceContent: React.FC<MaintenaceContentProps> = ({
  content,
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  let cleaned = ""

  if (mounted)
    cleaned = content.content ? DOMPurify.sanitize(content.content) : ""
  return (
    <div className="h-[100vh]  w-full flex justify-center items-center p-4">
      <article
        className="space-y-4 col-span-2"
        dangerouslySetInnerHTML={{ __html: cleaned || "" }}
      />
    </div>
  )
}
