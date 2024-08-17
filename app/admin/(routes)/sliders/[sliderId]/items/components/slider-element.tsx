"use client"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import { useSelectedItem } from "@/hooks/use-selected-item"
import { cn } from "@/lib/utils"
import axios from "axios"
import { Trash } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

interface SliderElementProps {
  item: Record<string, any>
  className: string
}
const SliderElement: React.FC<SliderElementProps> = ({ item, className }) => {
  const setSelectedItem = useSelectedItem((state) => state.setSelectedItem)

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
      setSelectedItem(0)
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
        <Image
          src={item.imageUrl}
          alt={String(item?.title)}
          width={600}
          height={300}
          className="w-full"
        />
        <div className="absolute z-10 right-2 top-4">
          <Button
            variant="destructive"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="mr-2 w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </>
  )
}
export { SliderElement }
