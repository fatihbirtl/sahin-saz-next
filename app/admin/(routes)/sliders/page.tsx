import { format } from "date-fns"
import { Container } from "@/components/ui/container"
import prismadb from "@/lib/prismadb"
import { SliderColumn } from "./components/columns"
import { SliderClient } from "./components/client"

export default async function SlidersPage() {
  const sliders = await prismadb.slider.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sliderItems: true,
    },
  })
  const formattedSliders: SliderColumn[] = sliders.map((item) => ({
    id: item.id,
    name: item.name,
    imageHeight: item.imageHeight,
    imageWidth: item.imageWidth,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    items: item.sliderItems.length,
  }))
  return (
    <Container>
      <SliderClient data={formattedSliders} />
    </Container>
  )
}
