import prismadb from "@/lib/prismadb"
import { PageForm } from "./components/page-form"
import { Container } from "@/components/ui/container"

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await prismadb.page.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      faq: true,
    },
  })
  const faq = await prismadb.faq.findMany({
    orderBy: {
      name: "desc",
    },
    select: {
      id: true,
      name: true,
    },
  })
  return (
    <Container>
      <PageForm faq={faq} initialData={page} />
    </Container>
  )
}
