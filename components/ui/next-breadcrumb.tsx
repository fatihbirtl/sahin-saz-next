"use client"

import React, { ReactNode } from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home } from "lucide-react"
import { Container } from "./container"

type TBreadCrumbProps = {
  homeElement: ReactNode
  separator: ReactNode
  containerClasses?: string
  listClasses?: string
  activeClasses?: string
  capitalizeLinks?: boolean
}

const NextBreadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
}: TBreadCrumbProps) => {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)
  console.log(pathNames + " : Pathnames")
  console.log(paths + " : Paths")

  if (!paths || !pathNames.length) {
    return null
  }

  return (
    <div>
      <Container className="my-0 py-0 space-y-0">
        <ul className={containerClasses}>
          <li className={listClasses}>
            <Link className="inline-flex items-center gap-x-2" href={"/"}>
              <Home size={16} />
              {homeElement}
            </Link>
          </li>
          {pathNames.length > 0 && separator}
          {pathNames.map((link, index) => {
            let href = `/${pathNames.slice(0, index + 1).join("/")}`
            let itemClasses =
              paths === href ? `${listClasses} ${activeClasses}` : listClasses
            let itemLink = capitalizeLinks
              ? link[0].toUpperCase() + link.slice(1, link.length)
              : link
            return (
              <React.Fragment key={index}>
                <li className={itemClasses}>
                  <Link href={href}>{itemLink}</Link>
                </li>
                {pathNames.length !== index + 1 && separator}
              </React.Fragment>
            )
          })}
        </ul>
      </Container>
    </div>
  )
}

export default NextBreadcrumb
