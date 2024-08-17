import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"
import {
  getFooterLogo,
  getFooterMenu,
  getFooterMenu1,
  getFooterMenu2,
  getFooterMenu3,
  getSocialMediaSettings,
} from "@/lib/data"
import { FooterSocial } from "@/components/frontend-ui/footer/footer-social"
import { FooterMenu } from "@/components/frontend-ui/footer/footer-menu"
import { MailForm } from "@/components/frontend-ui/footer/mail-form"
import { FooterInfo } from "@/components/frontend-ui/footer/footer-info"
import { Suspense } from "react"
import { FooterBanner } from "../banner/footer-banner"
import { ContactCard } from "../contact-card"
import Link from "next/link"
import Image from "next/image"
import { IconList1 } from "../icon-list/list-1"
import { iconList } from "../data/icon-list"

async function GetFooterData() {
  const socialMedia = await getSocialMediaSettings()
  const footerMenu = await getFooterMenu()
  const footerMenu1 = await getFooterMenu1()
  const footerMenu2 = await getFooterMenu2()
  const footerMenu3 = await getFooterMenu3()
  const logo = await getFooterLogo()

  return (
    <>
      <Container className="pt-0 mt-0 pb-5 md:grid lg:grid-cols-4 md:grid-cols-2 gap-8 space-y-0">
        {footerMenu && (
          <div className="md:space-y-5">
            <FooterMenu
              title="HASIR ŞEMSİYE"
              className="footer-menu"
              menu={footerMenu}
            />
          </div>
        )}
        {footerMenu1 && (
          <div className="md:space-y-5">
            <FooterMenu
              title="ÜRÜNLERİMİZ"
              className="footer-menu"
              menu={footerMenu1}
            />
          </div>
        )}

        {footerMenu3 && (
          <div className="md:space-y-5">
            <FooterMenu
              title="HİZMETLERİMİZ"
              className="footer-menu"
              menu={footerMenu3}
            />
          </div>
        )}
        <div className="md:space-y-5 md:py-0 py-10">
          <ContactCard className="bg-gradient-to-tl from-orange-200/10 to-orange-300/5 rounded-md border border-white/10" />
        </div>
      </Container>
      <div
        className="bg-gradient-to-tl from-white/5 to-white/10 border-y border-white/10 
      py-5"
      >
        <Container className="flex items-center flex-wrap justify-center md:justify-between my-0 py-0 text-sm space-y-0 gap-4 text-center md:text-left">
          {logo && (
            <Link
              className="inline-flex opacity-80 hover:opacity-100 transition-all hover:translate-x-1"
              href="/"
            >
              <Image
                width={333}
                height={60}
                alt="Hasır Şemsiye"
                src={logo.imageUrl}
              />
            </Link>
          )}
          {socialMedia && socialMedia.showFooter && (
            <div className="flex items-center flex-wrap">
              {(socialMedia.showIcon || socialMedia.showTitle) && (
                <FooterSocial title="BİZİ TAKİP EDİN" media={socialMedia} />
              )}
            </div>
          )}
        </Container>
      </div>

      <Container className="flex items-center flex-wrap justify-between my-0 py-6 text-sm">
        <FooterInfo className="order-1 md:-order-1" />
        {footerMenu2 && (
          <FooterMenu
            className="flex-row flex-wrap text-center md:text-left justify-center md:justify-start w-full md:w-auto "
            menu={footerMenu2}
          />
        )}
      </Container>
    </>
  )
}

export default function Footer() {
  return (
    <>
      <FooterBanner
        title="Hasır Şemsiye Ürünlerimizi Keşfedin."
        description="Doğal sa kamışı ve kargı kamışlarından üretildiği için kalın dokusu sayesinde  iyi bir ısı yalıtımı sağlar. Hasır Şemsiyeler istediğiniz tasarımda ve istediğiniz ürünler ile yapılabilir."
        imageUrl="/images/footer-hasir-semsiye.png"
        showLink
        linkText="HASIR ŞEMSİYE MODELLERİ"
        href="#"
        className="-mb-[180px]  mt-[180px]"
      />
      <footer className="min-h-[250px] py-4 pt-[180px] mt-10  space-y-6 bg-black text-white">
        <MailForm />
        <Suspense
          fallback={
            <Container>
              <p className="text-2l font-semibold tracking-tighter">
                Loading Footer menus
              </p>
            </Container>
          }
        >
          <IconList1 list={iconList} />
          <div className="py-6 hidden md:block">
            <Separator className="opacity-15 " />
          </div>
          <GetFooterData />
        </Suspense>
      </footer>
    </>
  )
}
