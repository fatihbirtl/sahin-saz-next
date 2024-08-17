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
import { useEffect } from "react"
import { MenuItemTypes } from "@/types"

interface MenuItemFormProps {
  data: MenuItemTypes
  setIsUpdating: (value: boolean) => void
}

const formSchema = z.object({
  value: z.string().min(1, "Menu Label is required"),
  url: z.string().min(1, "Menu Link is required"),
})

const MenuItemForm: React.FC<MenuItemFormProps> = ({ data, setIsUpdating }) => {
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: data.value,
      url: data.url,
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/menu/${params.menuId}/items/${data.id}`, values)
      router.refresh()
      setIsUpdating(false)
      toast.success("Menu item updated")
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    form.reset(data)
  }, [data, form])

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <FormLabel>Menu Url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Menu Link"
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

export { MenuItemForm }
