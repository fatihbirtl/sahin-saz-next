"use client"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PageColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, CopyPlus, MoreHorizontal, Pencil, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionsProps {
  data: PageColumn
}

export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [pageData, setPageData] = useState({})

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Page Slug coppied successfully.")
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/pages/${data.slug}`)
      router.refresh()
      toast.success("Page Deleted")
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

      // Use the updated state immediately
      const updatedPage = {
        ...pageData,
        title: `${newData.title}-clone`,
        description: `${newData.description}-clone`,
        slug: `${newData.slug}-clone`,
        metaTitle: `${newData.metaTitle}`,
        metaDescription: `${newData.metaDescription}`,
        content: newData.content,
        coverImage: newData.coverImage,
        isArchived: newData.isArchived,
        isFeatured: newData.isFeatured,
      }
      setPageData(updatedPage) // Update the state with the new page data

      const response = await axios.post(`/api/pages`, updatedPage)
      router.refresh()
      toast.success("Page cloned")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
      setPageData({}) // Reset the state to an empty object
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
          <DropdownMenuItem onClick={() => onCopy(data.slug)}>
            <Copy className="mr-2 w-4 h-4" />
            Copy Id
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/pages/${data.slug}`)}
          >
            <Pencil className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onClone}>
            <CopyPlus className="mr-2 w-4 h-4" />
            Clone Page
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
