"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Slider } from "@prisma/client"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
  name: z.string().min(1, "Slider Name is required"),
  imageHeight: z.coerce.number().min(1, "Height is required"),
  imageWidth: z.coerce.number().min(1, "Width is required"),
})

interface SliderFormProps {
  initialData: Slider | null
}

export const SliderForm: React.FC<SliderFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useParams()

  const defaultValues = initialData
    ? {
        ...initialData,
        imageHeight: parseFloat(String(initialData?.imageHeight)),
        imageWidth: parseFloat(String(initialData?.imageWidth)),
      }
    : {
        name: "",
        imageHeight: 1,
        imageWidth: 1,
      }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const title = initialData ? "Update Slider" : "Create Slider"
  const description = initialData
    ? "Update Slider easly with webstly"
    : "Create Slider easly with webstly"
  const toastMessage = initialData ? "Slider updated." : "Sldier Created"
  const action = initialData ? "Update" : "Create"

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/sliders/${params.sliderId}`, values)
        router.push(`/admin/sliders/${params.sliderId}/items`)
      } else {
        const response = await axios.post("/api/sliders", values)
        router.push(`/admin/sliders/${response.data.id}/items`)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  const onDelete = async () => {
    try {
      setLoading(false)
      await axios.delete(`/api/sliders/${params.sliderId}`)
      router.push(`/admin/sliders`)
      router.refresh()
      toast.success("Slider deleted successfully.")
    } catch (error) {
      toast.error("You should delete slider items in this slider first.")
    } finally {
      setLoading(false)
      setOpen(false)
    }
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
        <Heading
          title="Create Slider"
          description="Create slider easilt with the form"
        />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={isSubmitting}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slider Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Slider Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageWidth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Width</FormLabel>
                  <FormControl>
                    <Input placeholder="Image Width" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageHeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Height</FormLabel>
                  <FormControl>
                    <Input placeholder="Image Height" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
