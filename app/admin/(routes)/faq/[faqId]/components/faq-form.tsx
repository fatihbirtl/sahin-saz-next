"use client"

import { AlertModal } from "@/components/modals/alert-modal"
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

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { FaqType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"

import axios from "axios"
import { ArrowLeft, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface FaqFormProps {
  faq: FaqType | null
}
const formSchema = z.object({
  name: z.string().min(1, "Faq Name is Required"),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  position: z.coerce.number().default(0).optional(),
})

export const FaqForm: React.FC<FaqFormProps> = ({ faq }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: faq || {
      name: "",
      isFeatured: false,
      isArchived: false,
      position: 0,
    },
  })

  const title = !faq ? "Create faq" : "Update the faq"
  const action = !faq ? "Add faq" : "Update faq"
  const toastMessage = !faq ? "faq Created" : "faq Updated"
  const description = !faq
    ? "Create menu easily with the admin panel."
    : "Update menu easily with the admin panel"

  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (faq) {
        const response = await axios.patch(`/api/faq/${params.faqId}`, values)
      } else {
        const response = await axios.post(`/api/faq`, values)
        router.push(`/admin/faq/${response.data.id}`)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something Went wrong")
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/faq/${params.faqId}`)
      router.push("/admin/faq")
      router.refresh()
      toast.success("Faq Deleted")
    } catch (error) {
      toast.error("Something Went wrong")
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }
  return (
    <>
      <AlertModal
        diasbled={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        open={open}
      />
      <div className="flex items-center gap-x-2 justify-between">
        <Heading title={title} description={description} />
        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => router.push("/admin/faq")}
            disabled={isSubmitting || loading}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> menu
          </Button>
          {faq && (
            <Button
              variant="destructive"
              size="icon"
              disabled={isSubmitting}
              onClick={() => setOpen(true)}
            >
              <Trash size={18} />
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="lg:grid grid-cols-3 space-y-4 lg:space-y-0 gap-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faq Name</FormLabel>
                <FormControl>
                  <Input placeholder="Faq Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Position" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              <FormItem
                className={cn(
                  "flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                )}
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>
                    This post will not appear any where.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <div className="col-span-3">
            <Button
              disabled={isSubmitting || loading || !isValid}
              type="submit"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
