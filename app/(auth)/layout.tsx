import Footer from "@/components/frontend-ui/footer/footer"
import Navbar from "@/components/frontend-ui/header/navbar"

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="bg-slate-800 px-6  w-full h-auto py-10 min-h-[calc(100vh-74px)] flex items-center justify-center">
        <div className="w-full max-w-[460px]">{children}</div>
      </div>
      <Footer />
    </>
  )
}
