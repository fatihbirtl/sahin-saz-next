import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ToastProvider } from "@/providers/toast-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Kamış Hasır",
    default: "Kamış Hasır | Hasır Çatı | Bambu Kamış Çit", // a default is required when creating a template
  },
  description:
    "Kamış çit, hasır gölgelik, hasır çatı ve kamış çatı hizmetlerimiz ile Türkiye'nin her yerinde hizmet vermekteyiz.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
