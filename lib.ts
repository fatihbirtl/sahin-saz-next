import { SessionOptions } from "iron-session"

export interface SessionData {
  userId?: string | null
  role?: string | null
  username?: string
  avatar?: string
  isPro?: boolean
  isLoggedIn: boolean
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY!,
  cookieName: "user-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
}
