"use client"
import { Button } from "@/components/ui/button"
import { Slider } from "@/types"
import { ArrowRight } from "lucide-react"
import { CldImage } from "next-cloudinary"
import Link from "next/link"

interface HomeCustomersProps {
  data: Slider
}
export const HomeCustomers: React.FC<HomeCustomersProps> = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 items-center gap-10">
      <div className=" space-y-4">
        <div className="max-w-[500px] space-y-4">
          <h4 className="text-2xl md:text-4xl font-semibold tracking-tight ">
            See Our Customers
          </h4>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            doloremque consequatur totam ratione iste vitae cum doloribus earum
            dicta quae.
          </p>
          <Link href="/page/brands" className="flex">
            <Button variant="outline" className="mt-6 py-6 px-10">
              See Our Customers
              <ArrowRight className="ml-4 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2 py-10 my-10">
        {data.sliderItems.map((item) => (
          <div
            key={item.id}
            className=" p-4 h-[100px] overflow-hidden flex items-center justify-center rounded-md "
          >
            {item.imageUrl && (
              <CldImage
                src={item.imageUrl}
                alt={item.title || "Image"}
                height={data.imageHeight}
                width={data.imageWidth}
                crop="lpad"
                className="opacity-30  grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
