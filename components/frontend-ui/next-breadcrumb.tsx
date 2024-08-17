// Breadcrumb.tsx
"use client"
import React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

type BreadcrumbItem = {
  text: string
  link: string
}

type BreadcrumbProps = {
  homeElement?: React.ReactNode
  items?: BreadcrumbItem[]
}

const NextBreadcrumb = ({ homeElement, items = [] }: BreadcrumbProps) => {
  return (
    <div className="mx-auto max-w-[1400px] p-2">
      <ul className="flex items-center overflow-x-auto whitespace-nowrap gap-1 text-sm text-gray-500 font-semibold">
        <li className="flex items-center gap-1">
          {homeElement && (
            <Link href={"/"}>
              <Home className="w-4 h-4 opacity-80" />
            </Link>
          )}
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <li>
              <Link href={item.link} className="p-2 inline-flex text-teal-700">
                {item.text}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  )
}

export default NextBreadcrumb
