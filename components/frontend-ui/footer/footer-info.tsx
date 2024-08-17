import { cn } from "@/lib/utils"

export const FooterInfo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col text-sm gap-4 md:justify-normal md:text-left md:w-auto justify-center text-center w-full",
        className
      )}
    >
      <p className="font-semibold tracking-tighter opacity-50">
        © 2024 Hasır Şemsiye. Tüm Hakları Saklıdır Kamishasir.com.
      </p>
      <span className="font-semibold">
        <a
          href="https://www.tercihyazilim.com"
          target="_blank"
          title=" Web Site Tasarımı | Tercih Yazılım"
          className="underline inline-flex underline-offset-4 opacity-50 hover:opacity-90"
        >
          Web Site Tasarımı
        </a>{" "}
        Tercih Yazılım
      </span>
    </div>
  )
}
