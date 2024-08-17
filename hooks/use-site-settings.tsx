import { create } from "zustand"

interface useSiteSettingsProps {
  webSiteTitle: string
  setWebSiteTitle: (value: string) => void
  companyName: string
  setCompanyName: (value: string) => void
  companySlogan: string
  setCompanySlogan: (value: string) => void
  address: string
  setAddress: (value: string) => void
  email: string
  setEmail: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  phone1: string
  setPhone1: (value: string) => void
  whatsapp: string
  setWhatsapp: (value: string) => void
  gsm: string
  setGsm: (value: string) => void
  pageImageUrl: string
  setPageImageUrl: (value: string) => void
  notFoundImageUrl: string
  setNotFoundImageUrl: (value: string) => void
  metaTitle: string
  setMetaTitle: (value: string) => void
  metaDescription: string
  setMetaDescription: (value: string) => void
  showMailForm: boolean
  setShowMailForm: (value: boolean) => void
}

export const useSiteSettings = create<useSiteSettingsProps>((set) => ({
  webSiteTitle: "",
  setWebSiteTitle: (value: string) => set({ webSiteTitle: value }),

  companyName: "",
  setCompanyName: (value: string) => set({ companyName: value }),

  companySlogan: "",
  setCompanySlogan: (value: string) => set({ companySlogan: value }),

  address: "",
  setAddress: (value: string) => set({ address: value }),

  email: "",
  setEmail: (value: string) => set({ email: value }),

  phone: "",
  setPhone: (value: string) => set({ phone: value }),

  phone1: "",
  setPhone1: (value: string) => set({ phone1: value }),

  pageImageUrl: "",
  setPageImageUrl: (value: string) => set({ pageImageUrl: value }),

  notFoundImageUrl: "",
  setNotFoundImageUrl: (value: string) => set({ notFoundImageUrl: value }),

  gsm: "",
  setGsm: (value: string) => set({ gsm: value }),
  whatsapp: "",
  setWhatsapp: (value: string) => set({ whatsapp: value }),
  metaTitle: "",
  setMetaTitle: (value: string) => set({ metaTitle: value }),
  metaDescription: "",
  setMetaDescription: (value: string) => set({ metaDescription: value }),
  showMailForm: false,
  setShowMailForm: (value: boolean) => set({ showMailForm: value }),
}))
