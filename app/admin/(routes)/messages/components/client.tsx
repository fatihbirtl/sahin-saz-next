"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { MessageColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ContactMessagesClientProps {
  data: MessageColumn[]
}

export const ContactMessagesClient: React.FC<ContactMessagesClientProps> = ({
  data,
}) => {
  const router = useRouter()
  return (
    <>
      <div className="flex items-center justify-between gap-x-2">
        <Heading
          title={`Messages (${data.length})`}
          description="Manage messages easily"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
