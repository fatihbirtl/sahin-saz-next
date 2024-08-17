import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "space-y-4 mx-auto max-w-[1400px] mt-10 pt-10 my-6 px-4 ",
        className
      )}
    >
      {children}
    </div>
  )
}
