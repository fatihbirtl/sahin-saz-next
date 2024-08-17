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
import { MenuItems } from "./menu-items"
import { useState } from "react"
import { MenuItemForm } from "./menu-item-form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { MenuItemTypes, MenuTypes } from "@/types"
import { useSelectedMenu } from "@/hooks/use-selected-menu"

interface MenuTabProps {
  items: MenuItemTypes[]
  menu: MenuTypes
}

const formSchema = z.object({
  value: z.string().min(1, "Value is required"),
  url: z.string().min(1, "Url is required"),
})

export const MenuTab: React.FC<MenuTabProps> = ({ items, menu }) => {
  const params = useParams()
  const router = useRouter()
  const selectedItem = useSelectedMenu((state) => state.selectedItem)
  const setSelectedItem = useSelectedMenu((state) => state.setSelectedItem)
  const [isUpdating, setIsUpdating] = useState(false)

  const selectedElementData = items.find(
    (element) => element.id === selectedItem
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "",
      url: "",
    },
  })
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/menu/${params.menuId}/items`, data)
      router.refresh()
      form.reset()
      // setSelectedItem(items.length)
      toast.success("Menu Item created")
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }

  return (
    <>
      <div className="flex items-center gap-x-2 justify-between">
        <Heading title={menu.name} />
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
                <MenuItemForm
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
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Menu Label</FormLabel>
                      <FormControl>
                        <Input placeholder="label" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Menu Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Url" {...field} />
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
            <MenuItems setIsUpdating={setIsUpdating} elements={items || []} />
          </div>
        </div>
      </div>
    </>
  )
}
