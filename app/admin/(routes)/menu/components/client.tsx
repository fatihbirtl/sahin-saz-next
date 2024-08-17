"use client"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { MenuColumn, columns } from "./columns"
interface MenuClientProps {
  data: MenuColumn[]
}
export const MenuClient: React.FC<MenuClientProps> = ({ data }) => {
  const router = useRouter()
  return (
    <>
      <div className="flex items-center gap-x-2 justify-between">
        <Heading
          title={`Menus (${data.length})`}
          description="Manage Menus easily with admin panel."
        />
        <Button onClick={() => router.push("/admin/menu/new")}>
          <PlusCircle className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" data={data} columns={columns} />
      <Heading title="API" description="Api calls for menus" />
    </>
  )
}
