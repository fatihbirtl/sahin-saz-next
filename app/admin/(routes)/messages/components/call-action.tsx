"use client"
import axios from "axios"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MessageColumn } from "./columns"
import { Button } from "@/components/ui/button"
import { Copy, Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AlertModal } from "@/components/modals/alert-modal"

interface CellActionsProps {
  data: MessageColumn
}

export const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/contact/${data.id}`)
      router.refresh()
      toast.success("Message Deleted")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const onUpdate = async () => {
    try {
      if (data && !data.read) {
        await axios.patch(`/api/contact/${data.id}`)
        toast.success("You are dispaying the message")
      }
      router.push(`/admin/messages/${data.id}`)
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong with displaying message")
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

          <DropdownMenuItem onClick={onUpdate}>
            <Eye className="mr-2 w-4 h-4" />
            Display
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
