import Footer from "@/components/frontend-ui/footer/footer"
import { Header } from "@/components/frontend-ui/header/header"
import Navbar from "@/components/frontend-ui/header/navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      {children}
      <Footer />
    </>
  )
}
