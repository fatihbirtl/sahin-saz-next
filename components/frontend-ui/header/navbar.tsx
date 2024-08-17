import { Logo } from "@/components/frontend-ui/header/logo"
import { MainNav } from "@/components/frontend-ui/header/main-nav"
import {
  getFooterLogo,
  getHeaderLogo,
  getHeaderMenu,
  getMobileLogo,
  getSiteSettings,
} from "@/lib/data"
import { formatPhoneNumber, formatPhoneNumberWithSpan } from "@/lib/utils"
import { Smartphone } from "lucide-react"
import { BiLogoWhatsapp } from "react-icons/bi"

async function GetLogo() {
  const headerLogo = await getHeaderLogo()

  if (!headerLogo) return null

  return (
    <Logo
      className="hidden md:flex"
      title="Hasır Şemsiye"
      logo={headerLogo}
    ></Logo>
  )
}

async function GetMobileLogo() {
  const mobileLogo = await getFooterLogo()

  if (!mobileLogo) return null

  return (
    <Logo
      className="md:hidden flex"
      title="Hasır Şemsiye"
      logo={mobileLogo}
    ></Logo>
  )
}

async function GetPhone() {
  const settings = await getSiteSettings()
  if (!settings) return null

  return (
    settings.gsm && (
      <a
        className="hidden xl:flex items-center gap-x-2 mycolor shrink-0 mr-6"
        href={`tel:${formatPhoneNumber(settings.gsm)}`}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex border border-orange-300 w-7 h-0 opacity-60"></span>
          <span
            className="text-lg font-semibold"
            dangerouslySetInnerHTML={{
              __html: formatPhoneNumberWithSpan(settings.gsm),
            }}
          />
        </div>
      </a>
    )
  )
}

async function GetMenu() {
  const headerMenu = await getHeaderMenu()
  if (!headerMenu) {
    return null
  }

  return (
    <MainNav menu={headerMenu}>
      <GetPhone />
    </MainNav>
  )
}

export default function Navbar() {
  return (
    <>
      <GetLogo />
      <GetMobileLogo />
      <GetMenu />
    </>
  )
}
