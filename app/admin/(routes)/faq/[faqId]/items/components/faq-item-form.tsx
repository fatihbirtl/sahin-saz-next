"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useEffect, useMemo } from "react"
import { FaqItemType } from "@/types"
import dynamic from "next/dynamic"

interface FaqItemFormProps {
  data: FaqItemType
  setIsUpdating: (value: boolean) => void
}

const formSchema = z.object({
  title: z.string().min(1, "Faq Title is required"),
  content: z.string().min(1, "Faq Content is required"),
  link: z.string().optional(),
})

const FaqItemForm: React.FC<FaqItemFormProps> = ({ data, setIsUpdating }) => {
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data.title,
      link: data.link || "",
      content: data.content,
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/faq/${params.faqId}/items/${data.id}`, values)
      router.refresh()
      setIsUpdating(false)
      toast.success("Faq item updated")
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faq Title</FormLabel>
                <FormControl>
                  <Input placeholder="Faq Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faq Content</FormLabel>
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
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faq Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Faq Link"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit">
            Save
          </Button>
        </form>
      </Form>
    </>
  )
}

export { FaqItemForm }
