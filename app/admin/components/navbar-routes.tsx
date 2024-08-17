import { LogoutButton } from "@/components/logout-button"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export const NavbarRoutes = () => {
  return (
    <div className="flex gap-x-4 ml-auto">
      <Link href="/">
        <Button variant="outline">
          Visit Website
          <ExternalLink className="ml-2 w-4 h-4" />
        </Button>
      </Link>
      <LogoutButton />
    </div>
  )
}
