"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProductColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ProductsClientProps {
  data: ProductColumn[]
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
  const router = useRouter()
  return (
    <>
      <div className="flex items-center justify-between gap-x-2">
        <Heading
          title={`Products (${data.length})`}
          description="Manage Products Easily"
        />
        <Button onClick={() => router.push("/admin/products/new")}>
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <Heading title="API" description="Api calls for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  )
}
