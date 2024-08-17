"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { useMemo, useState } from "react"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FaqItemType, FaqType } from "@/types"

import { FaqItemForm } from "./faq-item-form"
import { FaqItems } from "./faq-items"
import dynamic from "next/dynamic"
import { useSelectedFaq } from "@/hooks/use-selected-faq"
import { Heading } from "@/components/ui/heading"

interface FaqTabProps {
  items: FaqItemType[]
  faq: FaqType
}

const formSchema = z.object({
  title: z.string().min(1, "Value is required"),
  content: z.string().min(1, "Url is required"),
  link: z.string().optional(),
  showLink: z.boolean().optional(),
})

export const FaqTab: React.FC<FaqTabProps> = ({ items, faq }) => {
  const params = useParams()
  const router = useRouter()
  const selectedItem = useSelectedFaq((state) => state.selectedItem)
  const setSelectedItem = useSelectedFaq((state) => state.setSelectedItem)
  const [isUpdating, setIsUpdating] = useState(false)

  const selectedElementData = items.find(
    (element) => element.id === selectedItem
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      link: "",
    },
  })
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/faq/${params.faqId}/items`, data)
      router.refresh()
      form.reset()
      // setSelectedItem(items.length)
      toast.success("Faq Item created")
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  const CustomEditor = useMemo(
    () => dynamic(() => import("@/components/custom-editor"), { ssr: false }),
    []
  )

  return (
    <>
      <div className="flex items-center gap-x-2 justify-between">
        <Heading title={faq.name} />
        {isUpdating && (
          <Button variant="outline" onClick={() => setIsUpdating(false)}>
            Add Menu Item
          </Button>
        )}
      </div>
      <Separator />
      <div className="grid grid-cols-2 gap-8">
        <div className="p-4 space-y-4">
          {isUpdating && (
            <div>
              {selectedElementData && (
                <FaqItemForm
                  setIsUpdating={setIsUpdating}
                  data={selectedElementData}
                />
              )}
            </div>
          )}
          {!isUpdating && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 p-4 border rounded-md"
              >
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
                          onChange={(data: string) =>
                            form.setValue("content", data)
                          }
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
                        <Input placeholder="Faq Link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting || !isValid}>
                  Submit
                </Button>
              </form>
            </Form>
          )}
        </div>
        <div className="slider-tab">
          <div className="tab-content">
            <FaqItems setIsUpdating={setIsUpdating} elements={items || []} />
          </div>
        </div>
      </div>
    </>
  )
}
