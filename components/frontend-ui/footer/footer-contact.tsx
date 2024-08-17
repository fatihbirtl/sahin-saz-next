"use client"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { cn, formatPhoneNumber, formatPhoneNumberWithSpan } from "@/lib/utils"
import { MailOpen, MessageCircleMore, Phone } from "lucide-react"

interface FooterContactProps {
  title: string
}
export const FooterContact: React.FC<FooterContactProps> = ({ title }) => {
  const { phone, email, whatsapp } = useSiteSettings()

  const classes =
    "flex items-center gap-x-4 transition-all hover:translate-x-1 opacity-70 hover:opacity-100"
  return (
    <>
      <h4 className="  py-4 font-semibold tracking-tight">{title}</h4>
      <ul className="space-y-8">
        {phone && (
          <li>
            <a className={cn(classes)} href={`tel:${formatPhoneNumber(phone)}`}>
              <Phone className="opacity-60" />
              <div className="flex flex-col">
                <span>Call Us</span>
                <span
                  className=" font-semibold tracking-tight"
                  dangerouslySetInnerHTML={{
                    __html: formatPhoneNumberWithSpan(phone),
                  }}
                />
              </div>
            </a>
          </li>
        )}
        {email && (
          <li>
            <a className={cn(classes)} href={`mailto:${email}`}>
              <MailOpen className="opacity-60" />
              <div className="flex flex-col">
                <span>Email Us</span>
                <span className="font-semibold tracking-tight">{email}</span>
              </div>
            </a>
          </li>
        )}

        {whatsapp && (
          <li>
            <a
              className={cn(classes)}
              href={`tel:${formatPhoneNumber(whatsapp)}`}
            >
              <MessageCircleMore className="opacity-60" />
              <div className="flex flex-col">
                <span>Write us on Whatsapp</span>
                <span
                  className="tracking-tight font-semibold"
                  dangerouslySetInnerHTML={{
                    __html: formatPhoneNumberWithSpan(whatsapp),
                  }}
                />
              </div>
            </a>
          </li>
        )}
      </ul>
    </>
  )
}
