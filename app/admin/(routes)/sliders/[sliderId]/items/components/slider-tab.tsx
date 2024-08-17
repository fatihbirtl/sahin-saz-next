"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import ImageUpload from "@/components/ui/image-upload"
import { zodResolver } from "@hookform/resolvers/zod"
import { SliderItem } from "@prisma/client"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"
import { SliderElements } from "./slider-elements"
import { useState } from "react"
import { SliderElementForm } from "./slider-element-form"
import { useSelectedItem } from "@/hooks/use-selected-item"

interface SliderTabProps {
  items: SliderItem[]
}

const formSchema = z.object({
  imageUrl: z.string().min(1, "Image is required"),
})

export const SliderTab: React.FC<SliderTabProps> = ({ items }) => {
  const params = useParams()
  const router = useRouter()
  const selectedItem = useSelectedItem((state) => state.selectedItem)
  const setSelectedItem = useSelectedItem((state) => state.setSelectedItem)
  const [isUpdating, setIsUpdating] = useState(false)

  const selectedElementData = items[selectedItem]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
    },
  })
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/${params.sliderId}/items`, data)
      router.refresh()
      form.reset()
      setSelectedItem(items.length)
      toast.success("Slider iten created")
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true)
      await axios.put(`/api/${params.sliderId}/items/reorder`, {
        list: updateData,
      })
      router.refresh()
      toast.success("Chapters reordered")
    } catch (error) {
      toast.error("Something went Wrong")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 p-2 border-r border-l ">
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Add Slider Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting || !isValid}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <div className="slider-tab">
          <div className="tab-content">
            <SliderElements
              onEdit={() => {}}
              onReorder={onReorder}
              elements={items || []}
              isUpdating={isUpdating}
            />
          </div>
        </div>
      </div>

      {selectedElementData && <SliderElementForm data={selectedElementData} />}
    </div>
  )
}
