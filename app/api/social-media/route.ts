import { getSession } from "@/actions"
import { isAdmin } from "@/lib/admin"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
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
      facebook,
      facebookLink,
      twitter,
      twitterLink,
      linkedin,
      linkedinLink,
      youtube,
      youtubeLink,
      instagram,
      instagramLink,
      showIcon,
      showTitle,
      showFooter,
      showHeader,
    } = body

    const footerLogo = await prismadb.socialMedia.create({
      data: {
        name: "socialMedia",
        facebook,
        facebookLink,
        twitter,
        twitterLink,
        linkedin,
        linkedinLink,
        youtube,
        youtubeLink,
        instagram,
        instagramLink,
        showIcon,
        showTitle,
        showFooter,
        showHeader,
      },
    })
    return NextResponse.json(footerLogo)
  } catch (error) {
    console.log("PAGE_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PATCH(req: Request) {
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
      facebook,
      facebookLink,
      twitter,
      twitterLink,
      linkedin,
      linkedinLink,
      youtube,
      youtubeLink,
      instagram,
      instagramLink,
      showIcon,
      showTitle,
      showFooter,
      showHeader,
    } = body

    const socialMedia = await prismadb.socialMedia.update({
      where: {
        name: "socialMedia",
      },
      data: {
        facebook,
        facebookLink,
        twitter,
        twitterLink,
        linkedin,
        linkedinLink,
        youtube,
        youtubeLink,
        instagram,
        instagramLink,
        showIcon,
        showTitle,
        showFooter,
        showHeader,
      },
    })
    return NextResponse.json(socialMedia)
  } catch (error) {
    console.log("PAGE_POST_ERROR", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
