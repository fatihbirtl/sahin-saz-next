"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./call-action"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string
  name: string
  slug: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "slug",
    header: "slug",
  },

  {
    accessorKey: "isFeatured",
    header: "Featured",
    cell: ({ row }) => row.original.isFeatured && <Badge>Featured</Badge>,
  },

  {
    accessorKey: "isArchived",
    header: "arcived",
    cell: ({ row }) => row.original.isArchived && <Badge>Arcived</Badge>,
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
