"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { SliderColumn, columns } from "./columns"
import { ApiList } from "@/components/ui/api-list"
interface SliderClientProps {
  data: SliderColumn[]
}
export const SliderClient: React.FC<SliderClientProps> = ({ data }) => {
  const router = useRouter()
  return (
    <>
      <div className="flex items-center gap-x-2 justify-between">
        <Heading
          title={`Sliders (${data.length})`}
          description="Manage sliders easily with admin panel."
        />
        <Button onClick={() => router.push("/admin/sliders/new")}>
          <PlusCircle className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />
      <Heading title="API" description="Api calls for sliders" />
      <Separator />
      <ApiList entityName="sliders" entityIdName="sliderId" />
    </>
  )
}
