"use client"
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
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SocialMedia as SocialMediaTypes } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

interface SocialMediaProps {
  settings: SocialMediaTypes | null
}

const formSchema = z.object({
  facebookLink: z.string().optional(),
  instagramLink: z.string().optional(),
  twitterLink: z.string().optional(),
  youtubeLink: z.string().optional(),
  linkedinLink: z.string().optional(),
  facebook: z.boolean().default(false).optional(),
  instagram: z.boolean().default(false).optional(),
  twitter: z.boolean().default(false).optional(),
  youtube: z.boolean().default(false).optional(),
  linkedin: z.boolean().default(false).optional(),
  showTitle: z.boolean().default(false).optional(),
  showIcon: z.boolean().default(true).optional(),
  showHeader: z.boolean().default(false).optional(),
  showFooter: z.boolean().default(false).optional(),
})
export const SocialMedia: React.FC<SocialMediaProps> = ({ settings }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facebookLink: settings?.facebookLink ?? "",
      instagramLink: settings?.instagramLink ?? "",
      twitterLink: settings?.twitterLink ?? "",
      youtubeLink: settings?.youtubeLink ?? "",
      linkedinLink: settings?.linkedinLink ?? "",
      facebook: settings?.facebook ?? false,
      twitter: settings?.twitter ?? false,
      linkedin: settings?.linkedin ?? false,
      youtube: settings?.youtube ?? false,
      instagram: settings?.instagram ?? false,
      showTitle: settings?.showTitle ?? false,
      showIcon: settings?.showIcon ?? true,
      showFooter: settings?.showFooter ?? true,
      showHeader: settings?.showHeader ?? false,
    },
  })

  const toastMessage = settings ? "Settings Updated" : "Settings Created"
  const action = settings ? "Update Settings" : "Create Settings"

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (settings) {
        await axios.patch("/api/social-media", values)
      } else {
        await axios.post("/api/social-media", values)
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
          className="lg:grid lg:grid-cols-3  gap-4 mt-6"
        >
          <div className="grid gap-2 px-3 py-4 border">
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem className=" inline-flex mr-auto gap-x-2 items-baseline">
                  <FormControl>
                    <Checkbox
                      className="mt-1"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">Show Facebook</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebookLink"
              render={({ field }) => (
                <FormItem className="w-full shrink-0 flex-grow-1">
                  <FormLabel>Facebook Page Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Facebook Page Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2 px-3 py-4 border">
            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem className=" inline-flex mr-auto gap-x-2 items-baseline">
                  <FormControl>
                    <Checkbox
                      className="mt-1"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">Show Twitter</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterLink"
              render={({ field }) => (
                <FormItem className="w-full shrink-0 flex-grow-1">
                  <FormLabel>Twitter Page Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Twitter Page Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2 px-3 py-4 border">
            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem className=" inline-flex mr-auto gap-x-2 items-baseline">
                  <FormControl>
                    <Checkbox
                      className="mt-1"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">Show Youtube</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="youtubeLink"
              render={({ field }) => (
                <FormItem className="w-full shrink-0 flex-grow-1">
                  <FormLabel>Youtube Page Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Youtube Page Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2 px-3 py-4 border">
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem className=" inline-flex mr-auto gap-x-2 items-baseline">
                  <FormControl>
                    <Checkbox
                      className="mt-1"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">Show linkedin</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinLink"
              render={({ field }) => (
                <FormItem className="w-full shrink-0 flex-grow-1">
                  <FormLabel>Linkedin Page Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="linkedin Page Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2 px-3 py-4 border">
            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem className=" inline-flex mr-auto gap-x-2 items-baseline">
                  <FormControl>
                    <Checkbox
                      className="mt-1"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="">Show instagram</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramLink"
              render={({ field }) => (
                <FormItem className="w-full shrink-0 flex-grow-1">
                  <FormLabel>instagram Page Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="instagram Page Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-3">
            <Separator />
          </div>
          <div className="col-span-3 lg:grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="showIcon"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Show Icons</FormLabel>
                    <FormDescription>
                      Social media buttons will appears with icons.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showTitle"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Show Title</FormLabel>
                    <FormDescription>
                      Social media buttons will appears with title.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showFooter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Show On Footer</FormLabel>
                    <FormDescription>
                      Social media buttons will appears in Footer.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showHeader"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Show On Header</FormLabel>
                    <FormDescription>
                      Social media buttons will appears on Header.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-3">
            <Button type="submit" disabled={isSubmitting}>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
