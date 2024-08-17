import Image from "next/image"

interface LogoProps {
  title: string
}
export const Logo: React.FC<LogoProps> = ({ title }) => {
  return (
    <Image
      alt={title}
      src="/logo.svg"
      width={154}
      height={54}
      className="w-[150px] h-auto"
      priority={true}
    />
  )
}
