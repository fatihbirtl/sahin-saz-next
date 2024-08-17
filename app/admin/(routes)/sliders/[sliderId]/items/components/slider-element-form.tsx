"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/image-upload"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useEffect, useMemo } from "react"
import dynamic from "next/dynamic"

interface SliderElementFormProps {
  data: Record<string, any>
}

const formSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  showButton: z.boolean().default(false).optional(),
  buttonText: z.string().optional(),
  href: z.string().optional(),
  imageUrl: z.string().min(1, "Slider Image is required"),
  content: z.string().optional(),
})

export const SliderElementForm: React.FC<SliderElementFormProps> = ({
  data,
}) => {
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      content: data?.content || "",
      showButton: data?.showButton || false,
      buttonText: data?.buttonText || "",
      href: data?.href || "",
      imageUrl: data?.imageUrl || "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/${params.sliderId}/items/${data.id}`, values)
      router.refresh()
      toast.success("Slider item updated")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    form.reset(data)
  }, [data, form])

  const CustomEditor = useMemo(
    () => dynamic(() => import("@/components/custom-editor"), { ssr: false }),
    []
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <ImageUpload
                  disabled={isSubmitting}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                  value={field.value ? [field.value] : []}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Description"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slider Content</FormLabel>
              <FormControl>
                <CustomEditor
                  value={field.value}
                  onChange={(data: string) => form.setValue("content", data)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="href"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add a link (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add a link"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="showButton"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value || false}
                  // @ts-ignore
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Show Button</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buttonText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button Text (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Add a link"
                  {...field}
                  value={field.value || "Read More"}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button disabled={isSubmitting} type="submit">
          Save
        </Button>
      </form>
    </Form>
  )
}
