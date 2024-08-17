import { Container } from "@/components/ui/container"
import { Heading } from "@/components/ui/heading"
import { Page as PageTypes } from "@/types"
import NextBreadcrumb from "@/components/frontend-ui/next-breadcrumb"
import Image from "next/image"

interface PageInfoProps {
  data: PageTypes
}

export const PageInfo: React.FC<PageInfoProps> = ({ data }) => {
  return (
    <>
      <div>
        <div className="h-[360px] static-banner  overflow-hidden text-white flex items-center  border-b border-emerald-300  px-6 bg-emerald-800 mb-5 relative z-10">
          <Container className="w-[1400px] max-w-[100%]">
            <div className="max-w-[800px] text-white">
              <Heading title={data.title} description={data.description} />
            </div>
          </Container>
          <Image
            src="/static.jpg"
            width={1400}
            height={600}
            alt="Kamış Hasır"
            className="w-full h-full object-cover object-right absolute -z-10 top-0 left-0"
          />
        </div>
      </div>

      <Container className="mt-0 pt-0 max-w-[960px]">
        <NextBreadcrumb
          homeElement="Ana Sayfa"
          items={[{ text: `${data.title}`, link: `/page/${data.slug}` }]}
        />
        {data.content && (
          <article
            className="space-y-4 col-span-2"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        )}
      </Container>
    </>
  )
}
