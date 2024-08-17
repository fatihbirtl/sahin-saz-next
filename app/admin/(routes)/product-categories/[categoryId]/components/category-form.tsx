"use client"
import { AlertModal } from "@/components/modals/alert-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ProductCategory } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ArrowLeft, Trash } from "lucide-react"
import dynamic from "next/dynamic"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface CategoryFormProps {
  initialData: ProductCategory | null
}

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "slug is required"),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  metaTitle: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional(),
  metaDescription: z.string().optional(),
})

export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      content: initialData?.content || "",
      isFeatured: initialData?.isFeatured || false,
      isArchived: initialData?.isArchived || false,
      metaTitle: initialData?.metaTitle || "",
      imageUrl: initialData?.imageUrl || "",
      metaDescription: initialData?.metaDescription || "",
    },
  })
  const { isSubmitting, isValid } = form.formState

  const title = initialData ? "Update Category" : "Create a Category"
  const description = initialData
    ? "Update the category easily with the admin panel."
    : "Create a category easily with the admin panel."
  const toastMessage = initialData ? "Category Updated" : "Category Created"
  const action = initialData ? "Update Category" : "Create Category"

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        const response = await axios.patch(
          `/api/product-categories/${params.categoryId}`,
          data
        )
      } else {
        const response = await axios.post(`/api/product-categories`, data)
        router.push(`/admin/product-categories/${response.data.id}`)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/product-categories/${params.categoryId}`)
      router.push("/admin/product-categories")
      router.refresh()
      toast.success("Category is deleted.")
    } catch (error) {
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const CustomEditor = useMemo(
    () => dynamic(() => import("@/components/custom-editor"), { ssr: false }),
    []
  )

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        diasbled={loading}
      />
      <div className="flex items-center justify-between gap-x-2">
        <Heading title={title} description={description} />
        <div className="flex items-center gap-x-2">
          <Button
            variant="secondary"
            className="border"
            onClick={() => router.push("/admin/product-categories")}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Categories
          </Button>
          {initialData && (
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setOpen(true)}
              disabled={loading}
            >
              <Trash className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-4 gap-6">
            <div className=" col-span-3 space-y-6">
              <div className="md:grid grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Category Name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Category Slug" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="col-span-3 grid gap-3">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Description" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category Content</FormLabel>
                        <FormControl>
                          <CustomEditor
                            value={field.value}
                            onChange={(data: string) =>
                              form.setValue("content", data)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2 p-4 border rounded-md">
                <span>
                  <Badge className="border" variant="outline">
                    Seo Settings{" "}
                  </Badge>{" "}
                  (Optional)
                </span>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Meta Title" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Meta Description" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="bg-slate-200 border rounded-md p-4 space-y-4">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex bg-white flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This Categories posts will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex bg-white flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This Categories posts will not appear any where.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={isSubmitting || !isValid}>{action}</Button>
        </form>
      </Form>
    </>
  )
}
