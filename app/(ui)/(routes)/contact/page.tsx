import { ContactForm } from "@/components/ui/contact-form"
import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { ContactInfo } from "./components/contact-info"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import { Suspense } from "react"
export const dynamic = "force-static"
export default function ContactPage() {
  return (
    <Container>
      <NextBreadcrumb
        homeElement="Ana Sayfa"
        items={[{ text: `Contact`, link: `/contact` }]}
      />
      <Heading
        title="Bize Ulaşın"
        description="Detaylı bilgi almak için bize ulaşınız."
      />
      <Separator />

      <div className="grid md:grid-cols-2 pt-10 gap-8">
        <Suspense fallback={<p>Loading Contact Info...</p>}>
          <ContactInfo />
        </Suspense>
        <ContactForm />
      </div>
    </Container>
  )
}
