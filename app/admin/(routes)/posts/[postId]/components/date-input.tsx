"use client"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface DateInputProps {
  value: string
  onChange: (value: string) => void
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  if (!value || !value.includes("T")) {
    return (
      <Input
        type="datetime-local"
        placeholder="Publish Date and Time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }

  // Saat ve tarih kısmını gösteren bir giriş alanı sağla
  const formattedDateTime = value.split("T")[0] + "T" + value.split("T")[1]

  return (
    <Input
      type="datetime-local"
      placeholder="Publish Date and Time"
      value={formattedDateTime}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export { DateInput }
