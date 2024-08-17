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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { generateSlug, generateSlugManuel } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Post, PostCategory, PostImage, Product } from "@prisma/client"
import axios from "axios"
import { ArrowLeft, Trash } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"
import { DateInput } from "./date-input"

interface PostFormProps {
  initialData:
    | (Post & {
        categories: PostCategory[]
        relatedPosts?: Post[]
        images: PostImage[]
        relatedProducts: Product[]
      })
    | null
  postCategories: PostCategory[]
  otherPosts: Post[] | null // Güncellendi: relatedPosts alanı opsiyonel olarak eklendi
  products: Product[]
}

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
  template: z.string(),
  images: z.object({ url: z.string() }).array(),
  publishedAt: z.coerce.date().optional(),

  slug: z.string().min(2, "Slug is required"),
  content: z.string().optional(),
  categories: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one category.",
  }),
  relatedPosts: z.array(z.string()).optional(),
  relatedProducts: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z
    .string()
    .max(161, "Meta Description should be max 161 chracters.")
    .optional(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
})

export const PostForm: React.FC<PostFormProps> = ({
  initialData,
  postCategories,
  otherPosts,
  products,
}) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()
  const [postUrl, setPostUrl] = useState("")
  const [postSlug, setPostSlug] = useState("")
  // const [manuel, setManuel] = useState(() => {
  //   return initialData?.slug ? true : false
  // })
  const [manuel, setManuel] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(
    initialData?.coverImage ||
      (initialData?.images.length ? initialData?.images[0].url : null)
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      publishedAt: initialData?.publishedAt
        ? new Date(initialData.publishedAt)
        : undefined,

      description: initialData?.description || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      template: initialData?.template || "style1",
      images: initialData?.images || [],
      categories: initialData?.categories
        ? initialData.categories.map((category) => category.id)
        : [],
      relatedPosts: initialData?.relatedPosts
        ? initialData.relatedPosts.map((post) => post.id)
        : [],
      relatedProducts: initialData?.relatedProducts
        ? initialData.relatedProducts.map((product) => product.id)
        : [],

      metaTitle: initialData?.metaTitle || "",
      metaDescription: initialData?.metaDescription || "",
      isArchived: initialData?.isArchived || false,
      isFeatured: initialData?.isFeatured || false,
    },
  })

  const { isSubmitting, isValid } = form.formState

  const title = initialData ? "Update Post" : "Create a Post"
  const description = initialData
    ? "Update the post easily with the admin panel."
    : "Create a post easily with the admin panel."
  const toastMessage = initialData ? "Post Updated" : "Post Created"
  const action = initialData ? "Update Post" : "Create Post"

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = { ...data, coverImage }
      if (initialData) {
        const response = await axios.patch(
          `/api/posts/${params.postId}`,
          formData
        )
      } else {
        const response = await axios.post(`/api/posts`, formData)
        router.push(`/admin/posts/${response.data.id}`)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong with the request.")
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/posts/${params.postId}`)
      router.push("/admin/posts")
      router.refresh()
      toast.success("Post is deleted.")
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
            onClick={() => router.push("/admin/posts")}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Posts
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
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="p-4 bg-slate-50 border rounded-md font-semibold">
                  <FormField
                    control={form.control}
                    name="template"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Template</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-4 flex-wrap"
                          >
                            <FormItem className="grid gap-2">
                              <div className="flex items-center space-x-2 ">
                                <FormControl>
                                  <RadioGroupItem value="style1" />
                                </FormControl>
                                <FormLabel>Style 1</FormLabel>
                              </div>
                              <Image
                                src="https://res.cloudinary.com/dmtqgdyzu/image/upload/c_limit,w_300/f_auto/q_auto/v1709572613/wyt2azwr0tlrapyste7q?_a=BAVAfVBy0"
                                alt="Style 1"
                                width={200}
                                height={100}
                                className="rounded-md"
                              />
                            </FormItem>
                            <FormItem className="grid gap-2">
                              <div className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="style2" />
                                </FormControl>
                                <FormLabel>Style 2</FormLabel>
                              </div>
                              <Image
                                src="https://res.cloudinary.com/dmtqgdyzu/image/upload/c_limit,w_300/f_auto/q_auto/v1709572613/wyt2azwr0tlrapyste7q?_a=BAVAfVBy0"
                                alt="Style 3"
                                width={200}
                                height={100}
                                className="rounded-md"
                              />
                            </FormItem>
                            <FormItem className="grid gap-2">
                              <div className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="style3" />
                                </FormControl>
                                <FormLabel>Style 3</FormLabel>
                              </div>
                              <Image
                                src="https://res.cloudinary.com/dmtqgdyzu/image/upload/c_limit,w_300/f_auto/q_auto/v1709572613/wyt2azwr0tlrapyste7q?_a=BAVAfVBy0"
                                alt="Style 1"
                                width={200}
                                height={100}
                                className="rounded-md"
                              />
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Content</FormLabel>
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
              <Badge>Yayınlama Tarihi</Badge>
              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Publish Date and Time</FormLabel>
                    <FormControl>
                      <DateInput
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split(".")[0] // Milisaniyeleri kaldırır
                            : field.value || "" // Eğer field.value undefined ise, boş bir dize kullan
                        }
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Badge>Product images</Badge>
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Images</FormLabel>
                    <FormControl onClick={() => setCoverImage(null)}>
                      <ImageUpload
                        value={field.value.map((image) => image.url)}
                        disabled={loading}
                        onChange={(url) => {
                          if (!coverImage) {
                            // Eğer coverImage yoksa, ilk eklenen resmi coverImage olarak belirle
                            setCoverImage(url)
                          }
                          field.onChange([
                            ...field.value,
                            { url, selected: "" },
                          ])
                        }}
                        onRemove={(url) => {
                          const newImages = field.value.filter(
                            (image) => image.url !== url
                          )
                          if (coverImage === url && newImages.length > 0) {
                            setCoverImage(newImages[0].url) // Silinen resim coverImage ise, yeni coverImage olarak ilk resmi belirle
                          }
                          field.onChange(newImages)
                        }}
                        selectedCover={coverImage}
                        onCoverSelect={(url) => setCoverImage(url)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />
              <FormField
                control={form.control}
                name="categories"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Choose a Category
                      </FormLabel>
                      <FormDescription>
                        Select the items you want to display in the sidebar.
                      </FormDescription>
                    </div>
                    {postCategories.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="categories"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.name}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <FormField
                control={form.control}
                name="relatedPosts"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Choose Related Posts
                      </FormLabel>
                      <FormDescription>
                        Select related posts for the current post.
                      </FormDescription>
                    </div>
                    <div className="max-h-[300px] overflow-auto space-y-2">
                      {otherPosts &&
                        otherPosts.map((post) => (
                          <FormItem
                            key={post.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={
                                  form
                                    .getValues("relatedPosts")
                                    ?.includes(post.id) || false
                                }
                                onCheckedChange={(checked) => {
                                  const currentRelatedPosts =
                                    form.getValues("relatedPosts") || []
                                  const updatedRelatedPosts = checked
                                    ? [...currentRelatedPosts, post.id]
                                    : currentRelatedPosts.filter(
                                        (p) => p !== post.id
                                      )
                                  form.setValue(
                                    "relatedPosts",
                                    updatedRelatedPosts
                                  )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {post.title}
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
                name="relatedProducts"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Choose Related Products
                      </FormLabel>
                    </div>
                    <div className="max-h-[300px] overflow-auto space-y-2">
                      {products &&
                        products.map((product) => (
                          <FormItem
                            key={product.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={
                                  form
                                    .getValues("relatedProducts")
                                    ?.includes(product.id) || false
                                }
                                onCheckedChange={(checked) => {
                                  const currentRelatedProducts =
                                    form.getValues("relatedProducts") || []
                                  const updatedRelatedProducts = checked
                                    ? [...currentRelatedProducts, product.id]
                                    : currentRelatedProducts.filter(
                                        (p) => p !== product.id
                                      )
                                  form.setValue(
                                    "relatedProducts",
                                    updatedRelatedProducts
                                  )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {product.title}
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
          <div></div>
          <Button disabled={isSubmitting}>{action}</Button>
        </form>
      </Form>
    </>
  )
}
