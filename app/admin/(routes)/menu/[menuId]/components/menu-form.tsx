"use client"
import { AlertModal } from "@/components/modals/alert-modal"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Menu } from "@prisma/client"
import axios from "axios"
import { ArrowLeft, Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface MenuFormProps {
  menu: Menu | null
}
const formSchema = z.object({
  name: z.string().min(1, "Menu Name is Required"),
})

export const MenuForm: React.FC<MenuFormProps> = ({ menu }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: menu || {
      name: "",
    },
  })

  const title = !menu ? "Create Menu" : "Update the Menu"
  const action = !menu ? "Add Menu" : "Update Menu"
  const toastMessage = !menu ? "Menu Created" : "Menu Updated"
  const description = !menu
    ? "Create menu easily with the admin panel."
    : "Update menu easily with the admin panel"

  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (menu) {
        const response = await axios.patch(`/api/menu/${params.menuId}`, values)
      } else {
        const response = await axios.post(`/api/menu`, values)
        router.push(`/admin/menu/${response.data.id}`)
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
      await axios.delete(`/api/menu/${params.menuId}`)
      router.push("/admin/menu")
      router.refresh()
      toast.success("Menu Deleted")
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
            onClick={() => router.push("/admin/menu")}
            disabled={isSubmitting || loading}
            variant="outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> menu
          </Button>
          {menu && (
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
                <FormLabel>Menu Name</FormLabel>
                <FormControl>
                  <Input placeholder="Menu Name" {...field} />
                </FormControl>
                <FormMessage />
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
