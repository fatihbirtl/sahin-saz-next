"use client"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { PostColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface PostsClientProps {
  data: PostColumn[]
}

export const PostsClient: React.FC<PostsClientProps> = ({ data }) => {
  const router = useRouter()
  return (
    <>
      <div className="flex items-center justify-between gap-x-2">
        <Heading
          title={`Posts (${data.length})`}
          description="Manage pages easily"
        />
        <Button onClick={() => router.push("/admin/posts/new")}>
          <Plus className="w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={data} />
      <Heading title="API" description="Api calls for sliders" />
      <Separator />
      <ApiList entityName="posts" entityIdName="postId" />
    </>
  )
}
