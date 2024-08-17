"use client"
import { Badge } from "@/components/ui/badge"
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
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MaintenanceMode, SiteSettings } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface SettingsFormProps {
  settings: MaintenanceMode | null
}

const formSchema = z.object({
  content: z.string().optional(),
  mode: z.boolean().default(false).optional(),
})
export const SettingsForm: React.FC<SettingsFormProps> = ({ settings }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: settings?.content ?? "",
      mode: settings?.mode ?? false,
    },
  })

  const toastMessage = settings ? "Settings Updated" : "Settings Created"
  const action = settings ? "Update Site Setting" : "Create Site Setting"

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (settings) {
        await axios.patch("/api/maintenance", values)
      } else {
        await axios.post("/api/maintenance", values)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something Went Wrong.")
    }
  }
  const CustomEditor = useMemo(
    () => dynamic(() => import("@/components/custom-editor"), { ssr: false }),
    []
  )
  const { isSubmitting } = form.formState
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid lg:grid-cols-4  gap-6 mt-6 p-4 rounded-md border"
        >
          <div className="lg:col-span-3 col-span-4 space-y-6">
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Maintenance Mode</FormLabel>
                    <FormDescription>
                      Your website will be placed in maintenance mode
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Mode Content</FormLabel>
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
          </div>

          <div className="col-span-4">
            <Button type="submit" disabled={isSubmitting}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
