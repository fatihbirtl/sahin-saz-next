"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./call-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SliderColumn = {
  id: string
  name: string
  imageHeight: number
  imageWidth: number
  createdAt: string
  items: number
}

export const columns: ColumnDef<SliderColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    header: "image Size",
    id: "imageRatio",
    cell: ({ row }) => (
      <div>
        {row.original.imageHeight} / {row.original.imageWidth}
      </div>
    ),
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
