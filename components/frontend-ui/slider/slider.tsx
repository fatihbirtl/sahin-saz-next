"use client"
import { SliderItem as SliderItemType, Slider as SliderType } from "@/types"

import { Navigation, Pagination, Autoplay } from "swiper/modules"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination" // Pagination module

import { CldImage } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { SliderSkeleton } from "./slider-skeleton"

interface SliderProps {
  data: SliderType
}

const Slider: React.FC<SliderProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <SliderSkeleton />
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }} // Autoplay delay in milliseconds
      speed={1500}
      loop
    >
      {data.sliderItems.map((item: SliderItemType, index) => (
        <SwiperSlide key={item.id}>
          {item.imageUrl && (
            <div
              className={cn(
                `bg-[#035247] overflow-hidden relative ] h-[600px] md:h-[800px] z-10`
              )}
            >
              <CldImage
                width={data.imageWidth}
                height={data.imageHeight}
                crop="crop"
                alt={item.title || "Image"}
                className="w-full md:h-full h-[288px] object-cover object-right md:object-center"
                src={item.imageUrl}
                priority={index === 0 ? true : false}
              />
              <div className="relative md:absolute z-20 top-0 md:h-full flex flex-col gap-5 justify-center items-start max-w-[1400px] w-full md:left-[50%] md:translate-x-[-50%] px-6 md:px-[50px] text-white">
                <div className="max-w-full w-[700px] space-y-4 p-4">
                  <h3 className=" sw-title text-3xl md:text-6xl tracking-tighter font-bold">
                    {item.title}
                  </h3>
                  <p className="md:text-xl pb-6 sw-desc">{item.description}</p>
                  {item.showButton && item.href && (
                    <Link className="inline-flex sw-button" href={item.href}>
                      <Button
                        variant="default"
                        className="font-semibold md:px-10 md:py-7 rounded-md md:bg-emerald-600 border md:border-emerald-800/60 shadow-2xl hover:bg-emerald-700/80 bg-teal-600 border-teal-700 px-8 py-5"
                      >
                        {item.buttonText}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
export default Slider
