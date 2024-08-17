"use client"
import * as css from "@/app/css"
import { login } from "@/actions"
import { useFormState } from "react-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOff } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <>
      <form action={formAction} className={css.SignInForm}>
        <h2 className="text-2xl font-semibold tracking-tighter">Login Form</h2>
        <input
          type="text"
          name="username"
          required
          placeholder="username"
          className={css.input}
          autoComplete="username"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            placeholder="password"
            className={cn(css.input, "pr-[40px]")}
            autoComplete="current-password"
          />
          <Button
            variant="ghost"
            type="button"
            size="icon"
            className="w-8 h-8 p-0 absolute right-2 top-[50%] translate-y-[-15px]"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 text-slate-600" />
            ) : (
              <EyeIcon className="w-5 h-5 text-slate-600" />
            )}
          </Button>
        </div>
        <Button>Login</Button>
        {state?.error && <p className={css.error}>{state.error}</p>}
        <p className="text-xs text-slate-500">
          Hesabınız yoksa yeni bir{" "}
          <Link
            className="inline-flex underline font-semibold text-slate-700 "
            href="/sign-in"
          >
            üyelik Oluşturun.
          </Link>
        </p>
      </form>
    </>
  )
}

export default LoginForm
