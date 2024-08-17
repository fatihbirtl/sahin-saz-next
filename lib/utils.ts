import { MenuItemTypes } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(
  inputNumber: string | null | undefined
): string {
  if (!inputNumber) {
    return "" // veya başka bir değer döndürebilirsiniz
  }
  // Boşlukları ve tire işaretlerini kaldır
  const cleanedNumber = inputNumber
    .replace(/[\s-]/g, "")
    .toLowerCase()
    .toString()

  return cleanedNumber
}

export function formatPhoneNumberWithSpan(
  inputNumber: string | null | undefined
): string {
  if (!inputNumber) {
    return "" // veya başka bir değer döndürebilirsiniz
  }

  const cleanedNumber = inputNumber

  // İlk boşluk karakterinden önceki kısmı al
  const firstPart = cleanedNumber.split(/(?<=\d)\s/)[0]

  // Geri kalan kısmı al
  const remainingPart = cleanedNumber.slice(firstPart.length)

  // İlk kısmın sonuna bir boşluk ekleyerek ve geri kalan kısmı içinde bir <span> ekleyerek formatı oluştur
  return `<span style="font-size:14px !important">${firstPart} </span>${remainingPart}`
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ]
}

export function formatDate(dateString: Date) {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function getShortMonthName(date: Date): string {
  const shortMonthNames = [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ]

  const monthIndex = date.getMonth()
  return shortMonthNames[monthIndex]
}

export function formatDateDetails(date: Date): {
  day: number
  shortMonth: string
} {
  return {
    day: date.getDate(),
    shortMonth: getShortMonthName(date),
  }
}

export function generateSlug(title: string): string {
  const turkishChars: Record<string, string> = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",

    "'": "", // Tırnak işaretini kaldır
  }

  const cleanedTitle = title
    .replace(/./g, (char) => turkishChars[char] || char) // Türkçe karakterleri düzelt
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Harf, rakam ve boşluk dışındaki karakterleri kaldır
    .replace(/^[-\s]+/, "") // Başta kalan boşlukları ve tireleri kaldır
    .replace(/\s+/g, "-") // Boşlukları tireye çevir
    .replace(/[-]+/g, "-") // Birden fazla tireyi tek tireye çevir
    .trim() // Başta ve sonda kalan boşlukları kaldır
    .replace(/-+$/g, "")

  return cleanedTitle
}

export function generateSlugManuel(title: string): string {
  const turkishChars: Record<string, string> = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
    "'": "", // Tırnak işaretini kaldır
  }

  const cleanedTitle = title
    .replace(/./g, (char) => turkishChars[char] || char) // Türkçe karakterleri düzelt
    .toLowerCase()
    .trim() // Başta ve sonda kalan boşlukları kaldır
    .replace(/^[-\s]+/, "") // Başta kalan boşlukları ve tireleri kaldır
    .replace(/[^a-z0-9\s'-]/g, "") // Harf, rakam, boşluk, tire ve apostrof dışındaki karakterleri kaldır
    .replace(/\s+/g, "-") // Boşlukları tireye çevir
    .replace(/-+/g, "-") // Birden fazla tireyi tek tireye çevir
    .replace(/'(?<!-)$/g, "") // Sadece son tırnak işaretini kaldır (tire öncesindeki tırnakları koru)

  return cleanedTitle
}

export const truncateDescription = (
  description: string,
  maxLength: number
): string => {
  if (description.length > maxLength) {
    description = description.slice(0, maxLength).trim() + "..."
  }
  return description
}

export function buildMenuTree(menuItems: MenuItemTypes[]): MenuItemTypes[] {
  const itemMap = new Map<string, MenuItemTypes>()

  // First, convert the array to a map for easy access, and initialize children array
  menuItems.forEach((item) => {
    item.children = []
    itemMap.set(item.id, { ...item })
  })

  // Build the tree by assigning children to their parents
  const rootItems: MenuItemTypes[] = []
  menuItems.forEach((item) => {
    if (item.parentId === null) {
      rootItems.push(itemMap.get(item.id)!)
    } else {
      itemMap.get(item.parentId)?.children?.push(itemMap.get(item.id)!)
    }
  })

  return rootItems
}

export function generatePassword(title: string): string {
  const turkishChars: Record<string, string> = {
    ç: "c",
    Ç: "c",
    ğ: "g",
    Ğ: "g",
    ı: "i",
    İ: "i",
    ö: "o",
    Ö: "o",
    ş: "s",
    Ş: "s",
    ü: "u",
    Ü: "u",
    "'": "", // Tırnak işaretini kaldır
  }

  const cleanedTitle = title
    .replace(/./g, (char) => turkishChars[char] || char) // Türkçe karakterleri düzelt
    .trim() // Başta ve sonda kalan boşlukları kaldır
    .replace(/^[-\s]+/, "") // Başta kalan boşlukları ve tireleri kaldır
    .replace(/\s+/g, "-") // Boşlukları tireye çevir

  return cleanedTitle
}
