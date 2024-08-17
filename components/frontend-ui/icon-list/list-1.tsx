import { cn } from "@/lib/utils"
import Image from "next/image"
import { ListItem } from "./list-item"

interface ItemProps {
  id: string
  title: string
  desc: string
  iconUrl: string
}

interface IconListPrps {
  className?: string
  list: ItemProps[]
}
export const IconList1: React.FC<IconListPrps> = ({ className, list }) => {
  return (
    <div
      className={cn(
        "max-w-[1400px] w-full grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mx-auto p-2",
        className
      )}
    >
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  )
}
