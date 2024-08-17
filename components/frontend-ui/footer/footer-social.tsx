import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SocialMedia } from "@/types"
import {
  BiLogoFacebook,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTwitter,
  BiLogoYoutube,
} from "react-icons/bi"

interface FooterSocialProps {
  media: SocialMedia
  title: string
}
const classes =
  "flex items-center gap-x-4 transition-all hover:translate-y-[-3px] opacity-100 hover:opacity-100 text-gray-600"
export const FooterSocial: React.FC<FooterSocialProps> = ({ media, title }) => {
  return (
    <div className="px-4 flex items-center flex-wrap justify-center text-center">
      <h4 className="py-4 font-semibold tracking-tight flex items-center gap-3">
        {title}
        <span className="inline-flex w-8 border border-white/40"></span>
      </h4>
      <ul
        className={cn(
          media.showTitle ? "grid gap-4" : "flex items-center gap-2 flex-wrap"
        )}
      >
        {media.facebook && media.facebookLink && (
          <li>
            <a
              className={classes}
              href={`https://www.facebook.com/${media.facebookLink}`}
              target="_blank"
            >
              {media.showIcon && (
                <Button size="icon" variant="ghost" className="text-white">
                  <BiLogoFacebook size={36} />
                </Button>
              )}
              {media.showTitle && (
                <span className="tracking-tighter text-sm font-semibold">
                  FACEBOOK
                </span>
              )}
            </a>
          </li>
        )}
        {media.twitter && media.twitterLink && (
          <li>
            <a
              className={classes}
              href={`https://www.twitter.com/${media.twitterLink}`}
              target="_blank"
            >
              {media.showIcon && (
                <Button size="icon" variant="ghost" className="text-white">
                  <BiLogoTwitter size={24} />
                </Button>
              )}
              {media.showTitle && (
                <span className="tracking-tighter text-sm font-semibold">
                  TWITTER
                </span>
              )}
            </a>
          </li>
        )}
        {media.youtube && media.youtubeLink && (
          <li>
            <a
              className={classes}
              href={`https://www.youtube.com/${media.youtubeLink}`}
              target="_blank"
            >
              {media.showIcon && (
                <Button size="icon" variant="ghost" className="text-white">
                  <BiLogoYoutube size={24} />
                </Button>
              )}
              {media.showTitle && (
                <span className="tracking-tighter text-sm font-semibold">
                  YOUTUBE
                </span>
              )}
            </a>
          </li>
        )}
        {media.instagram && media.instagramLink && (
          <li>
            <a
              className={classes}
              href={`https://www.instagram.com/${media.instagramLink}`}
              target="_blank"
            >
              {media.showIcon && (
                <Button size="icon" variant="ghost" className="text-white">
                  <BiLogoInstagram size={24} />
                </Button>
              )}
              {media.showTitle && (
                <span className="tracking-tighter text-sm font-semibold">
                  INSTAGRAM
                </span>
              )}
            </a>
          </li>
        )}
        {media.linkedin && media.linkedinLink && (
          <li>
            <a
              className={classes}
              href={`https://www.linkedin.com/${media.linkedinLink}`}
              target="_blank"
            >
              {media.showIcon && (
                <Button size="icon" variant="ghost" className="text-white">
                  <BiLogoLinkedin size={24} />
                </Button>
              )}
              {media.showTitle && (
                <span className="tracking-tighter text-sm font-semibold">
                  LINKEDIN
                </span>
              )}
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}
