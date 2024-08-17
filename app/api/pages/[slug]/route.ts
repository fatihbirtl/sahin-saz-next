import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }
    const body = await req.json()
    const {
      title,
      description,
      slug,
      content,
      coverImage,
      metaTitle,
      metaDescription,
      isArchived,
      isFeatured,
      faq,
    } = body

    if (!title) {
      return new NextResponse("Title is required", { status: 400 })
    }
    if (!description) {
      return new NextResponse("Description is required", { status: 400 })
    }
    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 })
    }

    // Fetch existing post data with categories
    const existingPage = await prismadb.page.findUnique({
      where: { slug: params.slug },
      include: {
        faq: true,
      },
    })

    const existingFaqIds = existingPage?.faq.map((page) => page.id)

    const page = await prismadb.page.update({
      where: {
        slug: params.slug,
      },
      data: {
        title,
        description,
        slug,
        content,
        coverImage,
        metaDescription,
        metaTitle,
        isArchived,
        isFeatured,
        faq: {
          connect: [
            ...(faq || []).map((pageId: string) => ({
              id: pageId,
            })),
          ],
          disconnect: existingFaqIds
            ? existingFaqIds
                .filter((pageId) => !faq?.includes(pageId))
                .map((pageId) => ({ id: pageId }))
            : [],
        },
      },
    })
    revalidatePath(`/page/${slug}`)
    return NextResponse.json(page)
  } catch (error) {
    console.log("PAGE_PATCH_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const page = await prismadb.page.delete({
      where: {
        slug: params.slug,
      },
    })
    return NextResponse.json(page)
  } catch (error) {
    console.log("PAGE_PATCH_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  noStore()
  try {
    const page = await prismadb.page.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
      },
      include: {
        faq: true,
      },
    })

    return NextResponse.json(page)
  } catch (error) {
    console.log("PAGE_GET_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
