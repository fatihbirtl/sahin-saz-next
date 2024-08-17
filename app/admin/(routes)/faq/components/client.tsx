"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"

import { Separator } from "@/components/ui/separator"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { columns, FaqColumn } from "./columns"
import { Heading } from "@/components/ui/heading"

interface FaqClientProps {
  data: FaqColumn[]
}
export const FaqClient: React.FC<FaqClientProps> = ({ data }) => {
  const router = useRouter()
  return (
    <>
      <div className="flex items-center gap-x-2 justify-between">
        <Heading
          title={`FAQ (${data.length})`}
          description="Manage FAQ easily with admin panel."
        />
        <Button onClick={() => router.push("/admin/faq/new")}>
          <PlusCircle className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />
    </>
  )
}
