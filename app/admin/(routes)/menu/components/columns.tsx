"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./call-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MenuColumn = {
  id: string
  name: string
  items: number
}

export const columns: ColumnDef<MenuColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "items",
    header: "Items",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
]
