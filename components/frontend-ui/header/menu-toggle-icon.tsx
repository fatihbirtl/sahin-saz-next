import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const MenuToggleIcon = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className={cn(
          "nav-toggle  flex h-12 w-20 px-4 border-none bg-transparent menu-toggler outline-none",

          open ? "open" : ""
        )}
        variant="ghost"
        size="icon"
      >
        <span></span>
        <span></span>
        <span></span>
      </Button>
    </>
  )
}
