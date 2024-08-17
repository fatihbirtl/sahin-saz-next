import { getSiteSettings } from "@/lib/data"
import { formatPhoneNumber, formatPhoneNumberWithSpan } from "@/lib/utils"
import {
  MailOpen,
  MapPinIcon,
  MessageCircleMore,
  Phone,
  Smartphone,
} from "lucide-react"

export const ContactInfo = async () => {
  const settings = await getSiteSettings()
  if (!settings) return null

  return (
    <div className="flex flex-col gap-4 p-6  rounded-md border">
      <div className="mb-4">
        {settings.companyName && (
          <h2 className="text-sm font-semibold uppercase">
            {settings.companyName}
          </h2>
        )}
        {settings.companySlogan && (
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight">
            {settings.companySlogan}
          </h3>
        )}
      </div>
      {settings.phone && (
        <a
          className="flex items-center gap-x-4"
          href={`tel:${formatPhoneNumber(settings.phone)}`}
        >
          <Phone className="opacity-60" />
          <div className="flex flex-col">
            <span>Bizi Arayın</span>
            <span
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: formatPhoneNumberWithSpan(settings.phone),
              }}
            />
          </div>
        </a>
      )}

      {settings.phone1 && (
        <a
          className="flex items-center gap-x-4"
          href={`tel:${formatPhoneNumber(settings.phone1)}`}
        >
          <Phone className="opacity-60" />
          <div className="flex flex-col">
            <span>Bize Ulaşın</span>
            <span
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: formatPhoneNumberWithSpan(settings.phone1),
              }}
            />
          </div>
        </a>
      )}

      {settings.email && (
        <a
          className="flex items-center gap-x-4"
          href={`mailto:${settings.email}`}
        >
          <MailOpen className="opacity-60" />
          <div className="flex flex-col">
            <span>E-Posta Gönderin</span>
            <span className="font-semibold">{settings.email}</span>
          </div>
        </a>
      )}

      {settings.gsm && (
        <a
          className="flex items-center gap-x-4"
          href={`tel:${formatPhoneNumber(settings.gsm)}`}
        >
          <Smartphone className="opacity-60" />
          <div className="flex flex-col">
            <span>Bize Ulaşın</span>
            <span
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: formatPhoneNumberWithSpan(settings.gsm),
              }}
            />
          </div>
        </a>
      )}
      {settings.whatsapp && (
        <a
          className="flex items-center gap-x-4"
          href={`tel:${formatPhoneNumber(settings.whatsapp)}`}
        >
          <MessageCircleMore className="opacity-60" />
          <div className="flex flex-col">
            <span>Whatsapp</span>
            <span
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: formatPhoneNumberWithSpan(settings.whatsapp),
              }}
            />
          </div>
        </a>
      )}
      {settings.address && (
        <div className="flex items-center gap-x-4">
          <MapPinIcon className="opacity-60" />
          <div className="flex flex-col">
            <span>Adres Bilgilerimiz</span>
            <span className="text-sm font-semibold">{settings.address}</span>
          </div>
        </div>
      )}
    </div>
  )
}
