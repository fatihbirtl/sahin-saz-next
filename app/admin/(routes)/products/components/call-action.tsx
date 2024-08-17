"use client"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, CopyPlus, MoreHorizontal, Pencil, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionsProps {
  data: ProductColumn
}

export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Product id coppied successfully.")
  }
  const [error, setError] = useState("")

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/products/${data.id}`)
      router.refresh()
      toast.success("Product Deleted")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  useEffect(() => {
    console.log(product)
  }, [product])

  const onClone = async () => {
    try {
      setLoading(true)

      // Ensure data is defined before accessing its properties
      const newData = data || {}

      // Extract category IDs from the array of category objects
      const categoryIds = newData.categories
        ? newData.categories.map((category) => category.id)
        : []

      const imageIds = newData.images
        ? newData.images.map((image) => image.id)
        : []

      const relatedProductIds = newData.relatedProducts
        ? newData.relatedProducts.map((product) => product.id)
        : []
      const relatedPostIds = newData.relatedPosts
        ? newData.relatedPosts.map((post) => post.id)
        : []

      // Use the updated state immediately
      const updatedProduct = {
        ...product,
        title: `${newData.title}-clone`,
        description: `${newData.description}-clone`,
        slug: `${newData.slug}-clone`,
        metaTitle: `${newData.metaTitle}`,
        template: `${newData.template}`,
        metaDescription: `${newData.metaDescription}`,
        content: newData.content,
        categories: categoryIds, // Use category IDs instead of objects
        relatedPosts: relatedPostIds,
        relatedProducts: relatedProductIds,
        images: imageIds,
        isArchived: newData.isArchived,
        isFeatured: newData.isFeatured,
      }
      setProduct(updatedProduct) // Update the state with the new post data

      const response = await axios.post(`/api/products`, updatedProduct)
      router.push(`/admin/products/${response.data.id}`)
      router.refresh()
      toast.success("Product cloned")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
      setProduct({}) // Reset the state to an empty object
    }
  }

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        diasbled={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 w-8 p-0">
            <span className="sr-only"></span>
            <MoreHorizontal className=" w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 w-4 h-4" />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/products/${data.id}`)}
          >
            <Pencil className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onClone}>
            <CopyPlus className="mr-2 w-4 h-4" />
            Clone Product
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
