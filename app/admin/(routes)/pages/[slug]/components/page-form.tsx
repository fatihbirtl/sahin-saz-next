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
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { generateSlug, generateSlugManuel } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Page } from "@prisma/client"
import axios from "axios"
import { ArrowLeft, Trash } from "lucide-react"
import dynamic from "next/dynamic"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface FaqType {
  id: string
  name: string
}

interface PageFormProps {
  initialData:
    | (Page & {
        faq?: FaqType[]
      })
    | null
  faq: FaqType[] | null
}

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Descrption is required"),
  slug: z.string().min(2, "Slug is required"),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  faq: z.array(z.string()).optional(),
})

export const PageForm: React.FC<PageFormProps> = ({ initialData, faq }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const [postUrl, setPostUrl] = useState("")
  const [postSlug, setPostSlug] = useState("")
  const [manuel, setManuel] = useState(() => {
    return initialData?.slug ? true : false
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      coverImage: initialData?.coverImage || "",
      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      isArchived: initialData?.isArchived || false,
      isFeatured: initialData?.isFeatured || false,
      faq: initialData?.faq ? initialData.faq.map((faq) => faq.id) : [],
    },
  })
  const { isSubmitting, isValid } = form.formState

  const title = initialData ? "Update Page" : "Create a Page"
  const description = initialData
    ? "Update the page easily with the admin panel."
    : "Create a page easily with the admin panel."
  const toastMessage = initialData ? "Page Updated" : "Page Created"
  const action = initialData ? "Update Page" : "Create Page"

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        const response = await axios.patch(`/api/pages/${params.slug}`, data)
        router.push(`/admin/pages/${response.data.slug}`)
      } else {
        const response = await axios.post(`/api/pages`, data)
        router.push(`/admin/pages/${response.data.slug}`)
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
      await axios.delete(`/api/pages/${params.slug}`)
      router.push("/admin/pages")
      router.refresh()
      toast.success("Page is deleted.")
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPostUrl = generateSlug(e.target.value)

    setPostUrl(newPostUrl)
    form.setValue("slug", newPostUrl) // Set the value of the slug field in the form
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPostUrl = generateSlugManuel(e.target.value)

    setPostSlug(newPostUrl)
    form.setValue("slug", newPostUrl) // Set the value of the slug field in the form
  }
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
            onClick={() => router.push("/admin/pages")}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Pages
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
          <div className="md:grid grid-cols-4 gap-6">
            <div className="col-span-3">
              <div className=" bg-slate-50 border rounded-md mb-6 p-4 space-y-4">
                <Badge>Seo Settings</Badge>
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Meta Title" {...field} />
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
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Post Title"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            if (!manuel) handleTitleChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-2 p-3 bg-slate-50 border">
                  <div className="flex items-center">
                    <Switch
                      className="scale-[0.8] origin-left"
                      onClick={() => setManuel((prev) => !prev)}
                      id="slug-mode"
                      checked={manuel}
                      disabled={loading}
                    />
                    <Label
                      htmlFor="slug-mode"
                      className="cursor-pointer"
                      aria-checked={manuel}
                    >
                      {manuel ? "Write slug" : "Auto"}
                    </Label>
                  </div>
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post Slug</FormLabel>
                        <FormControl>
                          <Input
                            className="disabled:bg-slate-700 disabled:text-white"
                            placeholder="Post Slug"
                            {...field}
                            readOnly={!manuel}
                            disabled={!manuel || loading}
                            onChange={(e) => {
                              field.onChange(e)
                              if (manuel) handleSlugChange(e)
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

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
                      <FormLabel>Page Content</FormLabel>
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
            <div className="p-4 border rounded-md space-y-4">
              <Badge>Cover Image</Badge>
              <FormField
                control={form.control}
                name="coverImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        disabled={loading}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="faq"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Choose Related Faq
                      </FormLabel>
                      <FormDescription>
                        Select related faq for the current post.
                      </FormDescription>
                    </div>
                    <div className="max-h-[300px] overflow-auto space-y-2">
                      {faq &&
                        faq.map((item) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={
                                  form.getValues("faq")?.includes(item.id) ||
                                  false
                                }
                                onCheckedChange={(checked) => {
                                  const currentRelatedFaqs =
                                    form.getValues("faq") || []
                                  const updatedRelatedFaqs = checked
                                    ? [...currentRelatedFaqs, item.id]
                                    : currentRelatedFaqs.filter(
                                        (p) => p !== item.id
                                      )
                                  form.setValue("faq", updatedRelatedFaqs)
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This post will appear on the home page
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        This post will not appear anywhere in the website.
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
