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
import { SiteSettings } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface SettingsFormProps {
  settings: SiteSettings | null
}

const formSchema = z.object({
  websiteTitle: z.string().optional(),
  companyName: z.string().optional(),
  pageImageUrl: z.string().optional(),
  notFoundImageUrl: z.string().optional(),
  companySlogan: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  phone1: z.string().optional(),
  whatsapp: z.string().optional(),
  gsm: z.string().optional(),
  email: z.string().optional(),
  showMailForm: z.boolean().default(true).optional(),
  metaTitle: z.string().max(61, "Meta Title max 61 characters").optional(),
  metaDescription: z
    .string()
    .max(160, "Meta Description max 160 characters")
    .optional(),
})
export const SettingsForm: React.FC<SettingsFormProps> = ({ settings }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteTitle: settings?.websiteTitle ?? "",
      companyName: settings?.companyName ?? "",
      companySlogan: settings?.companySlogan ?? "",
      address: settings?.address ?? "",
      phone: settings?.phone ?? "",
      phone1: settings?.phone1 ?? "",
      whatsapp: settings?.whatsapp ?? "",
      pageImageUrl: settings?.pageImageUrl ?? "",
      notFoundImageUrl: settings?.notFoundImageUrl ?? "",
      gsm: settings?.gsm ?? "",
      email: settings?.email ?? "",
      showMailForm: settings?.showMailForm ?? false,
      metaTitle: settings?.metaTitle ?? "",
      metaDescription: settings?.metaDescription ?? "",
    },
  })

  const toastMessage = settings ? "Settings Updated" : "Settings Created"
  const action = settings ? "Update Site Setting" : "Create Site Setting"

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (settings) {
        await axios.patch("/api/site-settings", values)
      } else {
        await axios.post("/api/site-settings", values)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something Went Wrong.")
    }
  }
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
              name="websiteTitle"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Website Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Website Title"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Company Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companySlogan"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Company Slogan</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Company Slogan"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="col-span-3">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="col-span-3 lg:col-span-1">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Address"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Phone"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone1"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Phone1</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Phone1"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gsm"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>GSM</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="GSM"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem className="col-span-3 lg:col-span-1">
                  <FormLabel>Whatsapp</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Whatsapp"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="showMailForm"
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
                    <FormLabel>Show Mail Form</FormLabel>
                    <FormDescription>
                      E Mail register Form will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="col-span-3 p-4 border grid gap-4 rounded-md bg-slate-50">
              <div className="flex gap-3">
                <Badge className="inline-flex " variant="outline">
                  Seo Setting
                </Badge>
                <span className="text-sm font-semibold tracking-tight">
                  (Optional For Home Page SEO)
                </span>
              </div>
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Meta title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Meta Description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="lg:col-span-1 col-span-4 space-y-6">
            <div className="p-4 border rounded-md space-y-4">
              <div className="space-y-2">
                <Badge variant="secondary">Page Image</Badge>
                <FormField
                  control={form.control}
                  name="pageImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value ? [field.value] : []}
                          disabled={isSubmitting}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="p-4 border rounded-md space-y-4">
              <div className="space-y-2">
                <Badge variant="secondary">Page Image</Badge>
                <FormField
                  control={form.control}
                  name="notFoundImageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Not Found Image</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value ? [field.value] : []}
                          disabled={isSubmitting}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange("")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
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
