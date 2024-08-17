"use client"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PostColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, CopyPlus, MoreHorizontal, Pencil, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionsProps {
  data: PostColumn
}

export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({})
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Post id coppied successfully.")
  }
  const [error, setError] = useState("")

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/posts/${data.id}`)
      router.refresh()
      toast.success("Post Deleted")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const onClone = async () => {
    try {
      setLoading(true)

      // Ensure data is defined before accessing its properties
      const newData = data || {}

      // Extract category IDs from the array of category objects
      const categoryIds = newData.categories
        ? newData.categories.map((category) => category.id)
        : []

      const relatedPostIds = newData.relatedPosts
        ? newData.relatedPosts.map((post) => post.id)
        : []

      const relatedProductIds = newData.relatedProducts
        ? newData.relatedProducts.map((product) => product.id)
        : []
      const imageIds = newData.images
        ? newData.images.map((image) => image.id)
        : []

      // Use the updated state immediately
      const updatedPost = {
        ...post,
        title: `${newData.title}-clone`,
        description: `${newData.description}-clone`,
        slug: `${newData.slug}-clone`,
        metaTitle: `${newData.metaTitle}`,
        metaDescription: `${newData.metaDescription}`,
        content: newData.content,
        template: newData.template,
        coverImage: newData.coverImage,
        categories: categoryIds,
        relatedPosts: relatedPostIds,
        relatedProducts: relatedProductIds,
        images: imageIds,
        isArchived: newData.isArchived,
        isFeatured: newData.isFeatured,
      }
      setPost(updatedPost) // Update the state with the new post data

      const response = await axios.post(`/api/posts`, updatedPost)
      router.push(`/admin/posts/${response.data.id}`)
      router.refresh()
      toast.success("Post cloned")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
      setPost({}) // Reset the state to an empty object
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
            onClick={() => router.push(`/admin/posts/${data.id}`)}
          >
            <Pencil className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onClone}>
            <CopyPlus className="mr-2 w-4 h-4" />
            Clone Post
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
