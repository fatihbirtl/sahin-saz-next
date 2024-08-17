"use client"

import { SearchIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useRef, useState } from "react"
import { Button } from "../ui/button"

export default function SearchList({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)

  const [searchKey, setSearchKey] = useState("")

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(`Searching... ${searchKey}`)

    const params = new URLSearchParams(searchParams)

    params.set("page", "1")

    if (searchKey) {
      params.set("query", searchKey)
    } else {
      params.delete("query")
    }
    if (pathname.includes("product")) {
      replace(`?${params.toString()}`)
    } else {
      replace(`/product?${params.toString()}`)
    }
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0 p-2 bg-slate-50 ">
      <form
        onSubmit={handleSearch}
        className="relative flex flex-1 flex-shrink-0 gap-x-2"
      >
        <label htmlFor="search" className="sr-only">
          Site İçi Arama
        </label>
        <input
          id="search-input"
          ref={inputRef} // Ref'i input elementine bağla
          className="peer block w-full rounded-md border border-gray-400/70 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 h-16"
          placeholder={placeholder}
          onChange={(e) => {
            setSearchKey(e.target.value)
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        <Button className="bg-emerald-700 px-6 h-16" type="submit">
          ARA
        </Button>
      </form>
    </div>
  )
}
