import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FooterBannerProps {
  title: string
  description: string
  showLink?: boolean
  href?: string
  linkText?: string
  imageUrl: string
  className?: string
}

export const FooterBanner: React.FC<FooterBannerProps> = ({
  title,
  description,
  showLink = false,
  href,
  linkText = "HEMEN KEŞFET",
  imageUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        "max-w-[1600px] w-full mx-auto relative z-20 p-4",
        className
      )}
    >
      <Image
        src="/images/badge.png"
        width={180}
        height={180}
        alt="TÜM TÜRKİYE'DE HİZMETİNİZDEYİZ."
        className="absolute right-0 md:scale-100 scale-75 md:right-5 -top-[65px] z-30 shadow-img1"
      />
      <div className=" p-6 md:px-[120px] pb-6 md:pb-[90px] md:pt-[120px] bg-gradient-to-tl from-orange-600 to-orange-700 text-white rounded-3xl relative z-20">
        <div className="absolute pointer-events-none top-0 left-0 h-full w-full -z-10 opacity-25">
          <Image
            width={1200}
            height={600}
            alt="Dalga Resmi"
            src="/images/wave.png"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="grid gap-6 p-4 md:text-left text-center order-1 lg:order-[0] mt-[-100px] md:mt-0">
            <h4 className=" text-2xl md:text-4xl font-semibold tracking-tight">
              {title}
            </h4>
            <p className="text-sm md:text-lg">{description}</p>
            {showLink && linkText && href && (
              <Link className="inline-flex mx-auto md:mx-0 group" href={href}>
                <Button
                  variant="secondary"
                  className="rounded-full md:px-10 py-4 h-12 md:h-14 font-bold tracking-tight md:pr-[50px] pr-10 relative transition-all hover:-translate-x-2 hover:bg-white"
                >
                  {linkText}
                  <span className="md:h-14 md:w-14 h-12 w-12 bg-white absolute -right-4 rounded-full text-sm flex items-center justify-center border-[6px] border-orange-700 transition-all group-hover:translate-x-5  shadow-img1">
                    <ChevronRight className="" />
                  </span>
                </Button>
              </Link>
            )}
          </div>
          <div className="lg:mt-[-60%] mt-[-20vw] relative -z-5  ">
            <Image
              className="shadow-img w-[300px] max-w-full md:w-full md:mx-0 mx-auto "
              width={800}
              height={800}
              alt={title}
              src={imageUrl}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
