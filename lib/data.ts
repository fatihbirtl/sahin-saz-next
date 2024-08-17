import {
  HeaderLogoTypes,
  MenuTypes,
  Page as PageTypes,
  SiteSettings,
  Slider,
  SocialMedia as SocialMediaTypes,
  Post,
  PostCategory,
  MaintenanceMode,
} from "@/types"
import prismadb from "./prismadb"

export async function getSiteSettings(): Promise<SiteSettings | null> {
  // noStore()

  try {
    const siteSettings = await prismadb.siteSettings.findUnique({
      where: {
        name: "siteSettings",
      },
    })
    if (!siteSettings) {
      return null
    }

    return siteSettings
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

export async function getMaintenanceMode(): Promise<MaintenanceMode | null> {
  // noStore()

  try {
    const maintenance = await prismadb.maintenanceMode.findUnique({
      where: {
        name: "maintenance",
      },
    })
    if (!maintenance) {
      return null
    }

    return maintenance
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

export async function getSocialMediaSettings(): Promise<SocialMediaTypes | null> {
  // noStore()

  try {
    const socialMediaSttings = await prismadb.socialMedia.findUnique({
      where: {
        name: "socialMedia",
      },
    })
    if (!socialMediaSttings) {
      return null
    }

    return socialMediaSttings
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Social Media Settings.")
  }
}

export async function getHeaderLogo(): Promise<HeaderLogoTypes | null> {
  // noStore()

  try {
    const headerLogo = await prismadb.logo.findUnique({
      where: {
        name: "headerLogo",
      },
    })
    if (!headerLogo) {
      return null
    }

    return headerLogo
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getFooterLogo(): Promise<HeaderLogoTypes | null> {
  // noStore()

  try {
    const footerLogo = await prismadb.logo.findUnique({
      where: {
        name: "footerLogo",
      },
    })
    if (!footerLogo) {
      return null
    }

    return footerLogo
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getMobileLogo(): Promise<HeaderLogoTypes | null> {
  // noStore()

  try {
    const mobileLogo = await prismadb.logo.findUnique({
      where: {
        name: "mobileLogo",
      },
    })
    if (!mobileLogo) {
      return null
    }

    return mobileLogo
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getPosts() {
  //noStore()

  try {
    const posts = await prismadb.post.findMany({
      where: {
        isArchived: false,
        publishedAt: {
          lt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        categories: true,
      },
    })
    return posts || null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getPost({ params }: { params: { slug: string } }) {
  try {
    const post = await prismadb.post.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
        publishedAt: {
          lt: new Date(),
        },
      },
      include: {
        images: true,
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
          where: {
            publishedAt: {
              lt: new Date(),
            },
          },
        },
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
        categories: {
          include: {
            posts: {
              where: {
                slug: {
                  not: params.slug,
                },
              },
              take: 5,
            },
          },
        },
      },
    })
    if (!post) {
      return null
    }
    return post
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getPostMeta({ params }: { params: { slug: string } }) {
  try {
    const post = await prismadb.post.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
        publishedAt: {
          lt: new Date(),
        },
      },
      select: {
        title: true,
        id: true,
        description: true,
        metaDescription: true,
        metaTitle: true,
        slug: true,
      },
    })
    if (!post) {
      return null
    }
    return post
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getPageMeta({ params }: { params: { slug: string } }) {
  try {
    const page = await prismadb.page.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
      },
      select: {
        title: true,
        id: true,
        description: true,
        metaDescription: true,
        metaTitle: true,
        slug: true,
      },
    })
    if (!page) {
      return null
    }
    return page
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
export async function fetchPostsPages(query: string): Promise<PagesInfo> {
  // noStore()

  try {
    const count = await prismadb.post.count({
      where: {
        isArchived: false,
        publishedAt: {
          lt: new Date(),
        },
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
export async function fetchFilteredPosts(
  query: string,
  currentPage: number
): Promise<Post[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  // noStore()

  try {
    const posts = await prismadb.post.findMany({
      where: {
        isArchived: false,
        publishedAt: {
          lt: new Date(),
        },

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
      orderBy: {
        createdAt: "desc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    })

    return posts // Return the array directly, not wrapped in NextResponse
  } catch (error) {
    console.log("POST_GET_ERROR", error)
    throw new Error("Internal Server Error")
  }
}

//// Get Header Menu

export async function getHeaderMenu(): Promise<MenuTypes | null> {
  //noStore()

  try {
    const headerMenu = await prismadb.menu.findUnique({
      where: {
        name: "header-menu",
      },
      include: {
        items: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    if (!headerMenu) {
      return null
    }

    return headerMenu
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

//// Get Footer Menu

export async function getFooterMenu(): Promise<MenuTypes | null> {
  // noStore()

  try {
    const footerMenu = await prismadb.menu.findUnique({
      where: {
        name: "footer-menu",
      },
      include: {
        items: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    if (!footerMenu) {
      return null
    }

    return footerMenu
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

//// Get Header Menu

export async function getFooterMenu1(): Promise<MenuTypes | null> {
  // noStore()

  try {
    const footerMenu1 = await prismadb.menu.findUnique({
      where: {
        name: "footer-menu1",
      },
      include: {
        items: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    if (!footerMenu1) {
      return null
    }

    return footerMenu1
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

export async function getFooterMenu2(): Promise<MenuTypes | null> {
  // noStore()

  try {
    const footerMenu2 = await prismadb.menu.findUnique({
      where: {
        name: "footer-menu2",
      },
      include: {
        items: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    if (!footerMenu2) {
      return null
    }

    return footerMenu2
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

export async function getFooterMenu3(): Promise<MenuTypes | null> {
  // noStore()

  try {
    const footerMenu = await prismadb.menu.findUnique({
      where: {
        name: "footer-menu3",
      },
      include: {
        items: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    if (!footerMenu) {
      return null
    }

    return footerMenu
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

// Fetch Posts page

export async function fetchSearchPages(query: string): Promise<PagesInfo> {
  // noStore()

  try {
    const postCount = await prismadb.post.count({
      where: {
        isArchived: false,
        publishedAt: {
          lt: new Date(),
        },
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

    const pageCount = await prismadb.page.count({
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
    const count = postCount + pageCount

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return { totalPages, count, pageCount, postCount }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of posts pages.")
  }
}

// Fetch Featured Pages
export async function fetchFilteredPages(
  query: string,
  currentPage: number
): Promise<PageTypes[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  // noStore()

  try {
    const pages = await prismadb.page.findMany({
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
      orderBy: {
        createdAt: "asc",
      },
      take: ITEMS_PER_PAGE,
      skip: offset,
    })

    return pages // Return the array directly, not wrapped in NextResponse
  } catch (error) {
    console.log("POST_GET_ERROR", error)
    throw new Error("Internal Server Error")
  }
}

export async function fetchCategories(): Promise<PostCategory[]> {
  // noStore()

  try {
    const categories = await prismadb.postCategory.findMany({
      where: {
        isArchived: false,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
          where: {
            isArchived: false,
            publishedAt: {
              lt: new Date(),
            },
          },
        },
      },
    })

    return categories
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

export async function fetchFilteredCategory(
  query: string,
  currentPage: number,
  {
    params,
  }: {
    params: { slug: string }
  }
): Promise<PostCategory | null> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  // noStore()

  try {
    const category = await prismadb.postCategory.findUnique({
      where: {
        slug: params.slug,
        isArchived: false,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },

          where: {
            isArchived: false,
            publishedAt: {
              lt: new Date(),
            },
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
export async function fetchFilteredCategoryPages(
  query: string,
  { params }: { params?: { slug?: string } }
): Promise<PagesInfo | null> {
  // noStore()

  try {
    const posts = await prismadb.postCategory.findUnique({
      where: {
        slug: params?.slug,
        isArchived: false,
      },
      include: {
        posts: {
          where: {
            isArchived: false,
            publishedAt: {
              lt: new Date(),
            },
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

    if (!posts || !posts.posts) {
      return null
    }

    const count = posts.posts.length
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return { totalPages, count }
  } catch (error) {
    console.log("POSTS_GET_ERROR", error)
    throw new Error("Internal Server Error")
  }
}

export async function getCategory({ params }: { params: { slug: string } }) {
  // noStore()

  try {
    const category = await prismadb.postCategory.findUnique({
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
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

//// Get Footer Menu

export async function getHomeSlider(): Promise<Slider | null> {
  // noStore()

  try {
    const slider = await prismadb.slider.findUnique({
      where: {
        name: "home",
      },
      include: {
        sliderItems: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    if (!slider) {
      return null
    }

    return slider
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

export async function getHomeAboutSlider(): Promise<Slider | null> {
  // noStore()

  try {
    const slider = await prismadb.slider.findUnique({
      where: {
        name: "home-about",
      },
      include: {
        sliderItems: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    if (!slider) {
      return null
    }

    return slider
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

export async function getHomeCustomerSlider(): Promise<Slider | null> {
  // noStore()

  try {
    const slider = await prismadb.slider.findUnique({
      where: {
        name: "customers",
      },
      include: {
        sliderItems: {
          orderBy: {
            position: "asc",
          },
        },
      },
    })
    if (!slider) {
      return null
    }

    return slider
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch Site Settings.")
  }
}

export async function getfeaturedPosts() {
  //noStore()

  try {
    const posts = await prismadb.post.findMany({
      where: {
        isArchived: false,
        isFeatured: true,
        publishedAt: {
          lt: new Date(),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        categories: true,
      },
      take: 12,
    })
    return posts || null
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

export async function getfeaturedPages() {
  //noStore()

  try {
    const pages = await prismadb.page.findMany({
      where: {
        isArchived: false,
        isFeatured: true,
      },
      orderBy: {
        createdAt: "asc",
      },

      take: 6,
    })
    if (!pages) {
      return null
    }
    return pages
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}

// Get USer
export async function getUser() {
  try {
    const users = await prismadb.user.findMany({
      orderBy: {
        username: "desc",
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    })

    return users
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of sentences pages.")
  }
}
