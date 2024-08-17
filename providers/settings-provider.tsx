"use client"
import React, { useEffect, useState } from "react"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { SiteSettings } from "@/types"

interface SettingsProviderProps {
  settings: SiteSettings | null
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  settings,
}) => {
  const {
    setAddress,
    setCompanyName,
    setCompanySlogan,
    setEmail,
    setGsm,
    setMetaDescription,
    setMetaTitle,
    setNotFoundImageUrl,
    setPageImageUrl,
    setPhone,
    setPhone1,
    setShowMailForm,
    setWebSiteTitle,
    setWhatsapp,
  } = useSiteSettings()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (settings) {
      setAddress(settings.address || "")
      setCompanyName(settings.companyName || "")
      setCompanySlogan(settings.companySlogan || "")
      setWebSiteTitle(settings.whatsapp || "")
      setEmail(settings.email || "")
      setGsm(settings.gsm || "")
      setMetaDescription(settings.metaDescription || "")
      setMetaTitle(settings.metaTitle || "")
      setNotFoundImageUrl(settings.notFoundImageUrl || "")
      setPageImageUrl(settings.pageImageUrl || "")
      setPhone(settings.phone || "")
      setPhone1(settings.phone1 || "")
      setWhatsapp(settings.whatsapp || "")
      setShowMailForm(settings.showMailForm || false)
    }
  }, [
    settings,
    setAddress,
    setCompanyName,
    setCompanySlogan,
    setEmail,
    setGsm,
    setMetaDescription,
    setMetaTitle,
    setNotFoundImageUrl,
    setPageImageUrl,
    setPhone,
    setPhone1,
    setShowMailForm,
    setWebSiteTitle,
    setWhatsapp,
  ])

  if (!mounted || !settings) {
    return null
  }

  // Render işlemleri buraya eklenir.
}

export default SettingsProvider
