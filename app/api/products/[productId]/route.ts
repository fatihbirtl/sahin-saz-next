import DOMPurify from "dompurify"
import { JSDOM } from "jsdom"
import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { Product, ProductImage } from "@/types"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

const window = new JSDOM("").window
const purify = DOMPurify(window)

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
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
      images,
      categories,
      metaTitle,
      metaDescription,
      isFeatured,
      isArchived,
      relatedProducts,
      relatedPosts,
      template,
      coverImage,
      faq,
    } = body

    const sanitizedContent = purify.sanitize(content)

    if (!title || !description || !slug) {
      return new NextResponse("Title, description, and slug are required", {
        status: 400,
      })
    }
    if (!template) {
      return new NextResponse("Product template is required", {
        status: 400,
      })
    }

    // Fetch existing post data with categories
    const existingProduct = await prismadb.product.findUnique({
      where: { id: params.productId },
      include: {
        categories: true,
        relatedProducts: true,
        relatedPosts: true,
        faq: true,
      },
    })

    if (!existingProduct) {
      return new NextResponse("Post not found", { status: 404 })
    }

    // Extract existing category IDs
    const existingCategoryIds = existingProduct.categories.map(
      (category) => category.id
    )

    const existingProductIds = existingProduct?.relatedProducts.map(
      (product) => product.id
    )

    const existingPostIds = existingProduct?.relatedPosts.map((post) => post.id)

    const existingFaqIds = existingProduct?.faq.map((faq) => faq.id)

    if (images.length > 0) {
      if (
        !coverImage ||
        !images.find((image: ProductImage) => image.url === coverImage)
      ) {
        coverImage = images[0].url
      }
    } else {
      coverImage = ""
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        title,
        description,
        metaTitle,
        metaDescription,
        slug,
        content: sanitizedContent,
        template,
        coverImage,
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
        isFeatured,
        isArchived,
      },
    })

    // Update the post
    const updatedProduct = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    })

    revalidatePath("/")
    revalidatePath("/category")
    revalidatePath(`/products`)
    revalidatePath(`/product/${updatedProduct.slug}`)

    return new NextResponse(JSON.stringify(updatedProduct), { status: 200 })
  } catch (error) {
    console.error("POST_PATCH_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await getSession()
    if (!session.userId) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    if (session.role !== "superAdmin" && !isAdmin(session.userId)) {
      return new NextResponse("Unauthenticated", { status: 403 })
    }

    const product: Product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
      include: {
        relatedProducts: true,
        relatedPosts: true,
        images: true,
      },
    })

    // İlgili gönderinin relatedProducts listesinden çıkartılması
    if (product.relatedProducts && product.relatedProducts.length > 0) {
      const relatedProductIds = product.relatedProducts.map(
        (relatedProduct) => relatedProduct.id
      )

      await Promise.all(
        relatedProductIds.map((id) =>
          prismadb.product.update({
            where: { id },
            data: {
              relatedProducts: { disconnect: [{ id: params.productId }] },
              relatedPosts: { disconnect: [{ id: params.productId }] },
            },
          })
        )
      )
    }

    revalidatePath("/")
    revalidatePath("/category")
    revalidatePath(`/products`)
    revalidatePath(`/product/${product.slug}`)

    return NextResponse.json(product)
  } catch (error) {
    console.error("PROCUCT_DELETE_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
        isArchived: false,
      },
      include: {
        categories: true,
        relatedProducts: true,
        relatedPosts: true,
        images: true,
        faq: true,
      },
    })
    return NextResponse.json(product)
  } catch (error) {
    console.log("PRODUCT_GET_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
