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
} from "./form"
import { Input } from "./input"
import { Button } from "./button"
import { Textarea } from "./textarea"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface ContactFormProps {
  className?: string
}
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  subject: z.string().min(1, "Subject is required"),
  email: z.string().min(1).email("This is not a valid email."),
  phone: z.string().length(11, "Phone must be exactly 10 characters"),
  message: z.string().min(1, "Message is required"),
})

export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      phone: "",
      message: "",
    },
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (datas: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/contact`, datas)
      console.log(response)
      console.log("values: ", datas)
      toast.success("Your Message sent successfully.")

      router.refresh()
      form.reset()
    } catch (error) {
      toast.error("Something Went Wrong.")
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
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
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Phone</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Your phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your Message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Button className="mt-4 w-full" type="submit" disabled={isSubmitting}>
            SEND FORM
          </Button>
        </div>
      </form>
    </Form>
  )
}
