import { cn } from "@/lib/utils"
import { HeaderLogoTypes } from "@/types"
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  logo: HeaderLogoTypes
  title: string
  className?: string
}
export const Logo: React.FC<LogoProps> = ({ logo, title, className }) => {
  if (!logo) return null
  return (
    <Link
      className={cn(
        "shrink-0 md:max-w-none md:mr-10   max-w-[280px] md:self-start p-3 bg-inherit header-logo",
        className
      )}
      title={title}
      href="/"
    >
      <span className="header-span"></span>
      <Image
        alt={title}
        src={logo.imageUrl}
        width={logo.width}
        height={logo.height}
        className="w-full lg:w-auto h-auto"
        priority
      />
    </Link>
  )
}
