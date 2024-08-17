import { Container } from "@/components/ui/container"
import { Image as ImageIcon } from "lucide-react"

export const PageSkeleton = () => {
  return (
    <>
      <div>
        <div className="h-[300px]  overflow-hidden relative z-10 text-white flex items-center  justify-center shadow-lg px-6 bg-slate-800 mb-6">
          <ImageIcon size={80} className="opacity-45" />
        </div>
      </div>

      <Container className="mt-0 pt-0">
        <div className="md:grid grid-cols-3 gap-8 p-2 bg-slate-200 min-h-[400px]"></div>
      </Container>
    </>
  )
}
