import Image from "next/image"

interface ItemProps {
  id: string
  title: string
  desc: string
  iconUrl: string
}

export const ListItem = ({ item }: { item: ItemProps }) => {
  return (
    <div className="rounded-md border border-white/20 opacity-70 md:p-8 p-4 grid gap-2 hover:opacity-100 transition-all hover:translate-x-1">
      <div className="pb-6">
        <Image
          alt={item.title}
          width={60}
          height={60}
          src={item.iconUrl}
          className="opacity-80"
        />
      </div>
      <h5 className="md:text-xl font-semibold tracking-tight">{item.title}</h5>
      <p className="text-sm text-white/80">{item.desc}</p>
    </div>
  )
}
