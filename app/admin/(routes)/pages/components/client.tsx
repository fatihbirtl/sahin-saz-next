"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { PageColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface PagesClientProps {
  data: PageColumn[]
}

export const PagesClient: React.FC<PagesClientProps> = ({ data }) => {
  const router = useRouter()
  return (
    <>
      <div className="flex items-center justify-between gap-x-2">
        <Heading
          title={`Pages (${data.length})`}
          description="Manage pages easily"
        />
        <Button onClick={() => router.push("/admin/pages/new")}>
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <Heading title="API" description="Api calls for sliders" />
      <Separator />
      <ApiList entityName="pages" entityIdName="slug" />
    </>
  )
}
