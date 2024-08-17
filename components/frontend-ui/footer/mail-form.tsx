"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1).email("This is not a valid email."),
  acceptTerms: z.boolean().refine((value) => value, {
    message: "You should accept terms",
  }),
})
export const MailForm = () => {
  const { showMailForm } = useSiteSettings()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      acceptTerms: false,
    },
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/contact/mail-form", values)
      router.refresh()
      toast.success("You registered E-Bulletin Successfully.")
      form.reset()
    } catch (error) {
      toast.error("Something Went Wrong.")
    }
  }

  if (!showMailForm) {
    return null
  }

  return (
    <div className="bg-white border-b">
      <div className="mx-auto max-w-[1400px] px-8 py-8 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Your Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex  items-start space-x-2 space-y-0 pb-4 ">
                  <FormControl>
                    <Checkbox
                      disabled={isSubmitting}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Accept Our Terms and{" "}
                      <Link
                        href="/page/privacy"
                        className="font-semibold underline"
                      >
                        Privacy Policy
                      </Link>
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              Register Mail Form
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
