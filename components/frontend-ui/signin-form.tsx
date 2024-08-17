"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import * as css from "@/app/css"
import { useForm } from "react-hook-form"
import { useState } from "react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { cn, generatePassword, generateSlugManuel } from "@/lib/utils"
import { Button } from "../ui/button"
import { Eye, EyeIcon, EyeOff } from "lucide-react"
import { Separator } from "../ui/separator"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface User {
  id: string
  username: string
  email: string
}

interface SignInFormProps {
  users: User[]
}

const formSchema = z.object({
  username: z.string().min(5, "Username must be 5 characters at least"),
  email: z
    .string()
    .min(5, "Email must be 5 characters at least")
    .email("This is not a valid email."),
  password: z.string().min(8, "Password must be 8 characters at least"),
})
export const SignInForm: React.FC<SignInFormProps> = ({ users }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const username = form.getValues("username").trim().toLowerCase()
      const email = form.getValues("email").trim().toLowerCase()

      const isSameUsername = users.find(
        (user) => user.username.trim().toLowerCase() === username
      )
      const isSameEmail = users.find(
        (user) => user.email.trim().toLowerCase() === email
      )

      if (isSameUsername || isSameEmail) {
        toast.error("Invalid username or email")
        return
      }

      const sanitizedValues = {
        ...values,
        username: username,
        email: email,
      }

      await axios.post("/api/users", sanitizedValues)
      router.refresh()
      router.push("/")
      toast.success("User was created successfully.")
    } catch (error) {
      toast.error("Something Went Wrong")
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={css.SignInForm}>
          <h1 className="text-2xl font-semibold tracking-tighter">
            Üyelik Oluştur
          </h1>
          <Separator />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kullanıcı Adı *</FormLabel>
                <FormControl>
                  <Input
                    className={css.input}
                    disabled={isSubmitting}
                    type="text"
                    placeholder="username"
                    {...field}
                    onChange={(e) => {
                      const newValue = generateSlugManuel(e.target.value)
                      field.onChange(newValue)
                    }}
                    autoComplete="username"
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
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    className={css.input}
                    disabled={isSubmitting}
                    type="email"
                    placeholder="Email"
                    {...field}
                    onChange={(e) => {
                      const newValue = generatePassword(e.target.value)
                      field.onChange(newValue)
                    }}
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Şifre *</FormLabel>
                <FormControl>
                  <Input
                    className={cn(css.input, "pr-[40px]")}
                    disabled={isSubmitting}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                    onChange={(e) => {
                      const newValue = generatePassword(e.target.value)
                      field.onChange(newValue)
                    }}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
                <Button
                  variant="ghost"
                  type="button"
                  size="icon"
                  className="w-8 h-8 p-0 absolute right-2 top-[50%] -translate-y-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-600" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-slate-600" />
                  )}
                </Button>
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting || !isValid}>Üye Ol</Button>
          <p className="text-xs text-slate-500">
            Hesabınız varsa{" "}
            <Link
              className="inline-flex underline font-semibold text-slate-700 "
              href="/login"
            >
              Giriş Yapın.
            </Link>
          </p>
        </form>
      </Form>
    </>
  )
}
