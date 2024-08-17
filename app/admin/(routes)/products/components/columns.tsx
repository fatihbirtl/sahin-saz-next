"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellActions } from "./call-action"
import { Badge } from "@/components/ui/badge"
import { Post, Product, ProductCategory, ProductImage } from "@/types"

export type ProductColumn = {
  id: string
  title: string
  description: string
  slug: string
  isArchived: boolean
  isFeatured: boolean
  createdAt: string
  content: string | null
  metaDescription: string | null
  metaTitle: string | null
  categories: ProductCategory[] | null
  relatedProducts: Product[]
  relatedPosts: Post[]
  images: ProductImage[] | null
  template: string
}

export const columns: ColumnDef<ProductColumn>[] = [
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
