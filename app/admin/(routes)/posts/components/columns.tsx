"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./call-action"
import { Badge } from "@/components/ui/badge"
import { Post, PostCategory, Product } from "@/types"
import { PostImage } from "@prisma/client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PostColumn = {
  id: string
  title: string
  description: string
  slug: string
  isArchived: boolean
  isFeatured: boolean
  createdAt: string
  coverImage: string | null
  content: string | null
  metaDescription: string | null
  metaTitle: string | null
  categories: PostCategory[] | null
  relatedProducts: Product[]
  relatedPosts: Post[]
  images: PostImage[] | null
  template: string
}

export const columns: ColumnDef<PostColumn>[] = [
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
      row.original.isFeatured && <Badge variant="secondary">Featured</Badge>,
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
