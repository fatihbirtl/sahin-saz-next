"use client"

import { SearchIcon } from "lucide-react"
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation"
import { useEffect, useRef } from "react"
import { useDebouncedCallback } from "use-debounce"

export default function SearchCategory({
  placeholder,
}: {
  placeholder: string
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const param = useParams()

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`)

    const params = new URLSearchParams(searchParams)

    params.set("page", "1")

    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    if (pathname.includes("product")) {
      replace(`?${params.toString()}`)
    } else {
      replace(`/product/${param.slug}?${params.toString()}`)
    }
  }, 300)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search-input"
        ref={inputRef} // Ref'i input elementine bağla
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}
