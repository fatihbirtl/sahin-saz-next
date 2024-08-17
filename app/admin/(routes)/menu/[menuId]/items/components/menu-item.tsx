"use client"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MenuItemTypes } from "@/types"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface MenuItemProps {
  item: MenuItemTypes
  className: string
}
const MenuItem: React.FC<MenuItemProps> = ({ item, className }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.sliderId}/items/${item.id}`)
      router.refresh()
      toast.success("Slider item deleted")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <AlertModal
        open={open}
        onConfirm={onDelete}
        onClose={() => setOpen(false)}
        diasbled={loading}
      />

      <div
        className={cn(
          "w-full my-2 relative overflow-hidden rounded-md tab",
          className
        )}
      >
        <div className="py-2 px-4 border rounded md flex gap-x-2 justify-between items-center">
          <span className="font-semibold">{item.value}</span>
          <Button
            variant="destructive"
            onClick={() => setOpen(true)}
            disabled={loading}
            size="icon"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  )
}
export { MenuItem }
