export default function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug
  console.log(slug)
  return (
    <h1 className="p-8 font-semibold tracking-tighter text-3xl">
      Slug : {slug}
    </h1>
  )
}
