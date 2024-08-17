"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./call-action"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PageColumn = {
  id: string
  title: string
  slug: string
  description: string
  isArchived: boolean
  isFeatured: boolean
  createdAt: string
  coverImage: string | null
  content: string | null
  metaDescription: string | null
  metaTitle: string | null
}

export const columns: ColumnDef<PageColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },

  {
    accessorKey: "slug",
    header: "slug",
  },
  {
    accessorKey: "isArchived",
    header: "isArchived",
    cell: ({ row }) =>
      row.original.isArchived && <Badge variant="destructive">Archived</Badge>,
  },
  {
    accessorKey: "isFeatured",
    header: "isFeatured",
    cell: ({ row }) =>
      row.original.isFeatured && (
        <Badge
          className="border border-slate-300 px-3 py-1"
          variant="secondary"
        >
          Featured
        </Badge>
      ),
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
]
