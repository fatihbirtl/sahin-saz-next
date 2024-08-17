"use client"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaqColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionsProps {
  data: FaqColumn
}

export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success("Menu id coppied successfully.")
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/faq/${data.id}`)
      router.push("/admin/faq")
      router.refresh()
      toast.success("menu Deleted")
    } catch (error) {
      toast.error("You should first delete menu items in this menu")
    } finally {
      setLoading(false)
      setOpen(false)
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
            onClick={() => router.push(`/admin/faq/${data.id}/items`)}
          >
            <Pencil className="mr-2 w-4 h-4" />
            Update
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
