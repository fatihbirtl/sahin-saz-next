import { PostCategory, Product, ProductCategory } from "@/types"
import prismadb from "./prismadb"

export async function getFeaturedProducts() {
  // noStore()

  try {
    const products = await prismadb.product.findMany({
      where: {
        isArchived: false,
        isFeatured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
        images: true,
      },
      take: 15,
    })
    return products || null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Featured Products.")
  }
}

export async function getProducts() {
  // noStore()

  try {
    const products = await prismadb.product.findMany({
      where: {
        isArchived: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
        images: true,
      },
    })
    return products || null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getProduct({ params }: { params: { slug: string } }) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
      },
      include: {
        relatedProducts: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            coverImage: true,
            categories: true,
            createdAt: true,
            isArchived: true,
            isFeatured: true,
            template: true,
            updatedAt: true,
          },
          take: 15,
        },
        relatedPosts: {
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            coverImage: true,
            categories: true,
            createdAt: true,
            isArchived: true,
            isFeatured: true,
            template: true,
            updatedAt: true,
          },
          take: 15,
        },
        images: true,
        categories: {
          include: {
            products: {
              where: {
                slug: {
                  not: params.slug,
                },
              },
              include: {
                images: true,
              },
              take: 5,
            },
          },
        },
      },
    })
    if (!product) {
      return null
    }
    return product
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getProductMeta({ params }: { params: { slug: string } }) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
      },
      select: {
        id: true,
        title: true,
        description: true,
        metaTitle: true,
        metaDescription: true,
        slug: true,
      },
    })
    if (!product) {
      return null
    }
    return product
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

// Fetch Posts page

type PagesInfo = {
  totalPages: number
  count: number
  pageCount?: number
  postCount?: number
}
const ITEMS_PER_PAGE = 40
export async function fetchProductsPages(query: string): Promise<PagesInfo> {
  // noStore()

  try {
    const count = await prismadb.product.count({
      where: {
        isArchived: false,

        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    })

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return { totalPages, count }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of posts pages.")
  }
}

// Fetch Featured sentences
export async function fetchFilteredProducts(
  query: string,
  currentPage: number
): Promise<Product[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  // noStore()

  try {
    const products = await prismadb.product.findMany({
      where: {
        isArchived: false,

        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    })

    return products // Return the array directly, not wrapped in NextResponse
  } catch (error) {
    console.log("PRODUCTS_GET_ERROR", error)
    throw new Error("Internal Server Error")
  }
}

export async function fetchProductCategories(): Promise<ProductCategory[]> {
  try {
    const categories = await prismadb.productCategory.findMany({
      where: {
        isArchived: false,
      },
      include: {
        products: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            images: true,
          },
          where: {
            isArchived: false,
          },
        },
      },
    })

    return categories
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Product Categories.")
  }
}

export async function fetchFilteredProductCategory(
  query: string,
  currentPage: number,
  {
    params,
  }: {
    params: { slug: string }
  }
): Promise<ProductCategory | null> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const category = await prismadb.productCategory.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
      },
      include: {
        products: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            images: true,
          },
          where: {
            isArchived: false,
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
          take: ITEMS_PER_PAGE,
          skip: offset,
        },
      },
    })
    if (!category) {
      return null
    }

    return category
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}
export async function fetchFilteredProductCategoryPages(
  query: string,
  { params }: { params?: { slug?: string } }
): Promise<PagesInfo | null> {
  // noStore()

  try {
    const products = await prismadb.productCategory.findUnique({
      where: {
        slug: params?.slug,
        isArchived: false,
      },
      include: {
        products: {
          where: {
            isArchived: false,
            OR: [
              {
                title: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                description: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      },
    })

    if (!products || !products.products) {
      return null
    }

    const count = products.products.length
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return { totalPages, count }
  } catch (error) {
    console.log("Products_GET_ERROR", error)
    throw new Error("Internal Server Error")
  }
}

export async function getProductCategoryMeta({
  params,
}: {
  params: { slug: string }
}) {
  // noStore()

  try {
    const category = await prismadb.productCategory.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
      },
      select: {
        metaTitle: true,
        metaDescription: true,
        name: true,
        id: true,
        slug: true,
      },
    })
    if (!category) {
      return null
    }
    return category
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Product Category.")
  }
}

export async function getProductCategory({
  params,
}: {
  params: { slug: string }
}) {
  // noStore()

  try {
    const category = await prismadb.productCategory.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
      },
    })
    if (!category) {
      return null
    }
    return category
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Product Category.")
  }
}

export async function getfeaturedProducts() {
  // noStore()

  try {
    const products = await prismadb.product.findMany({
      where: {
        isArchived: false,
        isFeatured: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        categories: true,
      },
      take: 9,
    })
    return products || null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch featured products.")
  }
}
