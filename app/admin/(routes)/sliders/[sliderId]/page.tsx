import { Container } from "@/components/ui/container"
import prismadb from "@/lib/prismadb"
import { SliderForm } from "./components/slider-form"

export default async function SliderPage({
  params,
}: {
  params: { sliderId: string }
}) {
  const slider = await prismadb.slider.findUnique({
    where: {
      id: params.sliderId,
    },
  })
  return (
    <Container>
      <SliderForm initialData={slider} />
    </Container>
  )
}
