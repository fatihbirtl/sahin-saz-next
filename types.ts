export interface Slider {
  id: string
  name: string
  imageWidth: number
  imageHeight: number
  sliderItems: SliderItem[]
  createdAt: Date
  updatedAt: Date
}

export interface SliderItem {
  id: string
  sliderId: string
  title?: string | null
  description?: string | null
  content?: string | null
  imageUrl?: string | null
  showButton: boolean
  href?: string | null
  buttonText?: string | null
  position: number
  createdAt: Date
  updatedAt: Date
}

export interface Page {
  id: string
  title: string
  description: string
  content?: string | null
  slug: string
  coverImage?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  createdAt: Date
  updatedAt: Date
  faq?: FaqType[]
}

interface LogoType {
  id: string
  name: string
  width: number
  height: number
  imageUrl: string
  createdAt: Date
}

export interface LogoTypes {
  headerLogo: LogoType
  footerLogo: LogoType
  mobileLogo: LogoType
}

export interface HeaderLogoTypes {
  id: string
  name: string
  width: number
  height: number
  imageUrl: string
  createdAt: Date
}

export interface FooterLogoTypes {
  id: string
  name: string
  width: number
  height: number
  imageUrl: string
  createdAt: Date
}
export interface MobileLogoTypes {
  id: string
  name: string
  width: number
  height: number
  imageUrl: string
  createdAt: Date
}

export interface SiteSettings {
  id: string
  websiteTitle?: string | null
  companyName?: string | null
  companySlogan?: string | null
  address?: string | null
  phone?: string | null
  phone1?: string | null
  whatsapp?: string | null
  gsm?: string | null
  email?: string | null
  showMailForm: boolean
  metaTitle?: string | null
  pageImageUrl?: string | null
  notFoundImageUrl?: string | null
  metaDescription?: string | null
  createdAt: Date
}

export interface MaintenanceMode {
  id: string
  content?: string | null
  mode?: boolean
  createdAt: Date
}

export interface SocialMedia {
  id: string
  facebook: boolean
  facebookLink?: string | null
  twitter: boolean
  twitterLink?: string | null
  youtube: boolean
  youtubeLink?: string | null
  linkedin: boolean
  linkedinLink?: string | null
  instagram: boolean
  instagramLink?: string | null
  showHeader: boolean
  showFooter: boolean
  showIcon: boolean
  showTitle: boolean
  createdAt: Date
}

export interface MenuTypes {
  id: string
  name: string
  items: MenuItemTypes[] // Make items optional
}

export interface MenuItemTypes {
  id: string
  value: string
  url: string
  parentId: string | null
  menuId: string
  position: number
  children?: MenuItemTypes[]
}

export type MinimalTreeItemData = {
  id: string
  value: string
  children?: MinimalTreeItemData[]
  depth: number // Track depth in the tree
}

export interface MailForm {
  id: string
  name: string
  email: string
  acceptTerms: boolean

  createdAt: Date
}

export interface Post {
  id: string
  title: string
  description: string
  content?: string | null
  slug: string
  coverImage?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  isFeatured: boolean
  isArchived: boolean
  categories?: PostCategory[]
  relatedPosts?: Post[]
  relatedProducts?: Product[]
  images?: PostImage[]
  template: string
  createdAt: Date
  updatedAt: Date
  faq?: FaqType[]
}

export interface PostCategory {
  id: string
  name: string
  slug: string
  posts?: Post[]
  imageUrl?: string | null
  description?: string | null
  content?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  isFeatured: boolean
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
}
export interface PostImage {
  id: string
  postId: string
  url: string
  createdAt: Date
  updatedAt: Date
}

export interface Product {
  id: string
  title: string
  description: string
  content?: string | null
  slug: string
  coverImage?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  isFeatured: boolean
  isArchived: boolean
  categories?: ProductCategory[]
  relatedProducts?: Product[]
  images?: ProductImage[]
  relatedPosts?: Post[]
  template: string
  createdAt: Date
  updatedAt: Date
  faq?: FaqType[]
}

export interface ProductCategory {
  id: string
  name: string
  slug: string
  products?: Product[]
  description?: string | null
  content?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  isFeatured: boolean
  isArchived: boolean
  imageUrl?: string | null

  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  productId: string
  url: string
  createdAt: Date
  updatedAt: Date
}

/// FaqType

export interface FaqType {
  id: string
  pages?: Page[]
  products?: Product[]
  posts?: Post[]

  items?: FaqItemType[]
  name: string
  position: number
  isFeatured: boolean
  isArchived: boolean
  createdAt: Date
}

export interface FaqItemType {
  id: string
  faqId: string
  position: number
  title: string
  content: string
  link: string
  showLink: boolean
  createdAt: Date
}
