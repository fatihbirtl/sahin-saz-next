import { cn } from "@/lib/utils"

interface HeadingProps {
  title: string
  description?: string
  descBig?: boolean
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  descBig,
}) => {
  return (
    <div className="space-y-2 mb-4">
      <h1 className="text-3xl md:text-6xl tracking-tighter font-bold">
        {title}
      </h1>
      <p className={cn("text-lg", descBig ? "text-xl pt-3" : "")}>
        {" "}
        {description}{" "}
      </p>
    </div>
  )
}
