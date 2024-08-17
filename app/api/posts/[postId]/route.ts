import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { Post, PostImage } from "@/types"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const window = new JSDOM("").window
const purify = DOMPurify(window)

export async function PATCH(
  req: Request,
  { params }: { params: { postId: string } }
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
    let {
      title,
      description,
      slug,
      content,
      coverImage,
      categories,
      metaTitle,
      metaDescription,
      isFeatured,
      isArchived,
      relatedPosts,
      relatedProducts,
      faq,
      template,
      images,
      publishedAt,
    } = body

    const sanitizedContent = purify.sanitize(content)

    if (!title || !description || !slug) {
      return new NextResponse("Title, description, and slug are required", {
        status: 400,
      })
    }

    // Fetch existing post data with categories
    const existingPost = await prismadb.post.findUnique({
      where: { id: params.postId },
      include: {
        categories: true,
        relatedPosts: true,
        relatedProducts: true,
        faq: true,
      },
    })

    if (!existingPost) {
      return new NextResponse("Post not found", { status: 404 })
    }

    // Extract existing category IDs
    const existingCategoryIds = existingPost.categories.map(
      (category) => category.id
    )

    const existingPostIds = existingPost?.relatedPosts.map((post) => post.id)

    const existingProductIds = existingPost?.relatedProducts.map(
      (product) => product.id
    )
    const existingFaqIds = existingPost?.faq.map((faq) => faq.id)

    if (images.length > 0) {
      if (
        !coverImage ||
        !images.find((image: PostImage) => image.url === coverImage)
      ) {
        coverImage = images[0].url
      }
    } else {
      coverImage = ""
    }

    // Update the post
    await prismadb.post.update({
      where: { id: params.postId },
      data: {
        title,
        description,
        slug,
        content: sanitizedContent,
        coverImage,
        metaDescription,
        metaTitle,
        isFeatured,
        isArchived,
        template,
        publishedAt,
        categories: {
          connect: [
            ...(categories || []).map((categoryId: string) => ({
              id: categoryId,
            })),
          ],
          disconnect: existingCategoryIds
            .filter((categoryId) => !categories?.includes(categoryId))
            .map((categoryId) => ({ id: categoryId })),
        },
        relatedProducts: {
          connect: [
            ...(relatedProducts || []).map((productId: string) => ({
              id: productId,
            })),
          ],
          disconnect: existingProductIds
            .filter((productId) => !relatedProducts?.includes(productId))
            .map((productId) => ({ id: productId })),
        },

        relatedPosts: {
          connect: [
            ...(relatedPosts || []).map((postId: string) => ({
              id: postId,
            })),
          ],
          disconnect: existingPostIds
            .filter((postId) => !relatedPosts?.includes(postId))
            .map((postId) => ({ id: postId })),
        },
        faq: {
          connect: [
            ...(faq || []).map((postId: string) => ({
              id: postId,
            })),
          ],
          disconnect: existingFaqIds
            .filter((postId) => !faq?.includes(postId))
            .map((postId) => ({ id: postId })),
        },
        images: {
          deleteMany: {},
        },
      },
    })
    // Update the post
    const updatedPost = await prismadb.post.update({
      where: { id: params.postId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })
    revalidatePath(`/`)
    revalidatePath(`/blog/${slug}`)
    revalidatePath("/blog")
    revalidatePath("/category")

    return new NextResponse(JSON.stringify(updatedPost), { status: 200 })
  } catch (error) {
    console.error("POST_PATCH_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const post: Post = await prismadb.post.delete({
      where: {
        id: params.postId,
      },
      include: {
        relatedPosts: true,
      },
    })

    // İlgili gönderinin relatedPosts listesinden çıkartılması
    if (post.relatedPosts && post.relatedPosts.length > 0) {
      const relatedPostIds = post.relatedPosts.map(
        (relatedPost) => relatedPost.id
      )

      await Promise.all(
        relatedPostIds.map((id) =>
          prismadb.post.update({
            where: { id },
            data: { relatedPosts: { disconnect: [{ id: params.postId }] } },
          })
        )
      )
    }
    revalidatePath(`/`)
    revalidatePath(`/blog/${post.slug}`)
    revalidatePath("/blog")
    revalidatePath("/category")

    return NextResponse.json(post)
  } catch (error) {
    console.error("POST_DELETE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const post = await prismadb.post.findUnique({
      where: {
        id: params.postId,
        isArchived: false,
      },
      include: {
        categories: true,
        relatedPosts: true,
        images: true,
        faq: true,
      },
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log("POST_GET_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
