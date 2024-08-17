"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./call-action"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type MessageColumn = {
  id: string
  name: string
  phone: string
  email: string
  createdAt: string
  read: boolean
}

export const columns: ColumnDef<MessageColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "read",
    header: "Read",
    cell: ({ row }) => (
      <div>
        {!row.original.read && <Badge variant="destructive">Unread</Badge>}
      </div>
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
