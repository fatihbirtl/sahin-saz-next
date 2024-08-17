"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Slider } from "@/types"
import { ArrowRight } from "lucide-react"
import { CldImage } from "next-cloudinary"
import Link from "next/link"

interface HomeAboutProps {
  data: Slider
  className?: string
}
export const HomeAbout: React.FC<HomeAboutProps> = ({ data, className }) => {
  return (
    <div className={cn("grid py-8", className)}>
      {data.sliderItems.map((item, index) => (
        <div
          key={item.id}
          className="grid lg:grid-cols-8 items-center space-y-4 gap-8 flex-nowrap py-6 mb-8"
        >
          {item.imageUrl && (
            <div
              className={cn(
                "lg:min-h-[380px] rounded-md   shrink-0 lg:col-span-4",
                index % 2 === 1 ? "order-2 mt-10 " : ""
              )}
            >
              {item.href ? (
                <Link className="flex relative z-10" href={item.href}>
                  <CldImage
                    src={item.imageUrl}
                    alt={item.title || "Image"}
                    width={data.imageWidth}
                    height={data.imageHeight}
                    crop="fill"
                    className="w-full h-full  rounded-lg"
                  />
                </Link>
              ) : (
                <div className="flex relative z-10">
                  <CldImage
                    src={item.imageUrl}
                    alt={item.title || "Image"}
                    width={data.imageWidth}
                    height={data.imageHeight}
                    crop="fill"
                    className="w-full h-full  rounded-lg"
                  />
                </div>
              )}
            </div>
          )}
          <div className="p-4 space-y-4 lg:col-span-4 ">
            {item.title &&
              (index === 0 ? (
                <h1 className="text-4xl lg:text-6xl tracking-tight font-bold text-zinc-600">
                  {item.title}
                </h1>
              ) : (
                <h2 className="text-4xl lg:text-6xl tracking-tight font-bold text-zinc-600">
                  {item.title}
                </h2>
              ))}

            {item.description && (
              <p className="text-xl tracking-tight ">{item.description}</p>
            )}
            {item.showButton && item.buttonText && item.href && (
              <Link className="flex" href={item.href}>
                <Button className="rounded-md w-full md:w-auto md:px-[3rem] mt-4 bg-transparent  border-emerald-500 text-black border py-6 hover:bg-emerald-600 hover:text-white hover:border-transparent hover:translate-x-2 transition-all ">
                  {item.buttonText}
                  <ArrowRight className="ml-4 w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
