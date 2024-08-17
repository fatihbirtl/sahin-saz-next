import { BiLogoWhatsapp } from "react-icons/bi"
import { Button } from "../ui/button"
import { Image as ImageIcon, Phone } from "lucide-react"
import Link from "next/link"
import { formatPhoneNumber } from "@/lib/utils"
import { getSiteSettings } from "@/lib/data"

interface ContactButtonsProps {
  slug: string
  title: string
}

export const ContactButtons: React.FC<ContactButtonsProps> = async ({
  slug,
  title,
}) => {
  const siteSettings = await getSiteSettings()
  if (!siteSettings) {
    return null
  }
  return (
    <div className="flex gap-[4px] px-2 py-4 fixed md:hidden left-0 bottom-0 z-30 scale-95 origin-bottom-left">
      <Button className="gap-2 px-3 py-3 h-auto w-auto bg-amber-600 opacity-0 invisible pointer-events-none">
        <ImageIcon className="w-7 h-7 shrink-0" />
        <span className=" font-semibold grid text-left">
          <span className="text-xs">Ürün</span>
          <span className="text-xs">Resimleri</span>
        </span>
      </Button>
      {siteSettings.whatsapp && (
        <Link
          href={`https://api.whatsapp.com/send?phone=${formatPhoneNumber(
            siteSettings.whatsapp
          )}&text=www.kamishasir.com/product/${slug} ${title} Siparişi`}
        >
          <Button className="gap-2 px-3 py-3 h-auto w-auto bg-emerald-700 hover:bg-emerald-800">
            <BiLogoWhatsapp className="w-7 h-7 shrink-0" />
            <span className=" font-semibold grid text-left">
              <span className="text-xs">Whatsapp</span>
              <span className="text-xs">Sipariş</span>
            </span>
          </Button>
        </Link>
      )}
      {siteSettings.phone && (
        <Link href={`tel:${formatPhoneNumber(siteSettings.phone)}`}>
          <Button className="gap-2 px-3 py-3 h-auto w-auto bg-slate-700">
            <Phone className="w-6 h-6 shrink-0" />
            <span className=" font-semibold grid text-left">
              <span className="text-xs">Telefon</span>
              <span className="text-xs">Sipariş</span>
            </span>
          </Button>
        </Link>
      )}
    </div>
  )
}
;<a
  target="_blank"
  className="flex items-center gap-x-2 text-white bg-green-700 hover:bg-green-700/90 px-6 py-3 rounded-lg shadow-2xl hover:translate-y-1 transition-all"
></a>
