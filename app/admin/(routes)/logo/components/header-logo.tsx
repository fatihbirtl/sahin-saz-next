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
import { Input } from "@/components/ui/input"
import { HeaderLogoTypes } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

const formSchema = z.object({
  imageUrl: z.string().min(1, "Logo image is required"),
  width: z.coerce.number().min(1, "Logo image is required"),
  height: z.coerce.number().min(1, "Logo image is required"),
})

interface HeaderLogoProps {
  data: HeaderLogoTypes | null
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ data }) => {
  const router = useRouter()

  const action = data ? "Update" : "Create"
  const toastMessage = data ? "Updated" : "Created"

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (data) {
        await axios.patch(`/api/logo/header-logo`, values)
      } else {
        await axios.post(`/api/logo/header-logo`, values)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something went wrong.")
    }
  }
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      imageUrl: "",
      width: 0,
      height: 0,
    },
  })

  const { isSubmitting, isValid } = form.formState

  return (
    <div>
      <h4 className="text-xl font-semibold tracking-tight mb-4">Header Logo</h4>
      <div className="flex flex-col gap-3 min-h-[200px] border  p-4 rounded-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="With" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="Height" type="number" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Header Logo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={isSubmitting}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      className="h-[80px] space-y-2"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Button
                className="mt-4"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {action}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
