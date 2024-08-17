import prismadb from "@/lib/prismadb"
import { CategoryForm } from "./components/category-form"
import { Container } from "@/components/ui/container"

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const category = await prismadb.productCategory.findUnique({
    where: {
      id: params.categoryId,
    },
    include: {
      products: true,
    },
  })
  return (
    <Container>
      <CategoryForm initialData={category} />
    </Container>
  )
}
