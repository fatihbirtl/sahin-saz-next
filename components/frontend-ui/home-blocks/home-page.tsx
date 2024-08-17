import { Suspense } from "react"
import { getHomeAboutSlider, getHomeSlider, getfeaturedPosts } from "@/lib/data"
import { FeaturedPosts } from "@/components/frontend-ui/home-blocks/home-posts"

import { HomeAbout } from "@/components/frontend-ui/home-blocks/home-about"
import { Container } from "@/components/ui/container"
import Slider from "@/components/frontend-ui/slider/slider"
import { getFeaturedProducts } from "@/lib/product-data"
import { FeaturedProducts } from "./featured-products"

async function GetHomeAbout() {
  const homeAbout = await getHomeAboutSlider()
  return (
    <>
      {homeAbout && homeAbout.sliderItems.length > 0 && (
        <HomeAbout
          className="py-[100px] max-w-[1400px] px-6 mx-auto"
          data={homeAbout}
        />
      )}
    </>
  )
}

async function GetFeaturedPosts() {
  const featuredPosts = await getfeaturedPosts()
  return (
    <>
      {featuredPosts && featuredPosts.length > 0 && (
        <FeaturedPosts
          title="Saz Kamış Dekorasyon, Hasır Dekorasyon ve Bambu Dekorasyon Hizmetlerimiz "
          description="Kamış Hasır olarak, Türkiye'nin her yerinde saz kamışı, doğal saz hasır otları ve kargı kamışları ile doğayı mekanlarınıza taşıyoruz. Modern, egzotik ve doğal hasır, saz ve bambu dekorasyon hizmetlerimizi keşfedin."
          posts={featuredPosts}
        />
      )}
    </>
  )
}

async function GetFeaturedProducts() {
  const featuredProducts = await getFeaturedProducts()
  return (
    <>
      {featuredProducts && featuredProducts.length > 0 && (
        <FeaturedProducts
          title="Hasır, Bambu ve Saz Kamış Dekorasyon Ürünlerimiz"
          description="Tamamen Doğal ve egzotik bambu çit, hasır şemsiye, kamış çit, bambu şemsiye, saçaklı hasır çatı kaplama örtüsü ürünlerimizi keşfedin. Montaja hazır hasır ve bambu dekorasyon ürünlerimiz ile mekanlarınızı doğal, pratik ve ekonomik bir şekilde doğallaştırın. "
          posts={featuredProducts}
        />
      )}
    </>
  )
}

async function GetSlider() {
  const getSlider = await getHomeSlider()
  return (
    <>
      {getSlider && getSlider.sliderItems.length > 0 && (
        <Slider data={getSlider} />
      )}
    </>
  )
}

export default function HomePage() {
  return (
    <>
      <Suspense
        fallback={
          <p className="md:h-[780px] h-[600px] flex items-center justify-center font-semibold p-4">
            Slider YÜkleniyor...
          </p>
        }
      >
        <GetSlider />
      </Suspense>

      <Suspense
        fallback={
          <p className="h-[600px] flex items-center justify-center font-semibold p-4">
            İçerik YÜkleniyor...
          </p>
        }
      >
        <GetHomeAbout />
      </Suspense>
      <Suspense
        fallback={
          <p className="h-[600px] flex items-center justify-center font-semibold p-4">
            Hizmetler YÜkleniyor...
          </p>
        }
      >
        <GetFeaturedPosts />
      </Suspense>

      <Suspense
        fallback={
          <p className="h-[600px] flex items-center justify-center font-semibold p-4">
            Ürünler YÜkleniyor...
          </p>
        }
      >
        <GetFeaturedProducts />
      </Suspense>
    </>
  )
}
