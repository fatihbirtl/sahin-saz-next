import { Container } from "@/components/ui/container"
import prismadb from "@/lib/prismadb"
import { SliderForm } from "./components/slider-form"
import { redirect } from "next/navigation"
import { SliderTab } from "./components/slider-tab"

interface SliderItemsProps {
  params: { sliderId: string }
}

export default async function SliderItems({ params }: SliderItemsProps) {
  const slider = await prismadb.slider.findUnique({
    where: {
      id: params.sliderId,
    },
  })

  if (!slider) {
    redirect("/admin/sliders")
    return null // Add a return statement to exit the function early
  }

  const sliderItems = await prismadb.sliderItem.findMany({
    where: {
      sliderId: params.sliderId,
    },
    orderBy: {
      position: "asc",
    },
  })

  return (
    <Container>
      <div className="lg:grid grid-cols-4 gap-4">
        <div className="min-h-[200px] p-6">
          <SliderForm initialData={slider} />
        </div>
        <div className="col-span-3">
          <SliderTab items={sliderItems} />
        </div>
      </div>
    </Container>
  )
}
