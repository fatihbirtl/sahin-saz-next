/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/product/bambu-avize-ve-rattan-avizeler",
        destination: "/product/bambu-avize",
        permanent: true,
      },
      {
        source: "/blog/12-balkon-dekorasyon-onerisi",
        destination: "/blog/balkon-dekorasyon-onerileri",
        permanent: true,
      },
      {
        source:
          "/blog/bambu-dekorasyon-onerileri-bahcenize-dogallik-ve-siklik-katin",
        destination: "/blog/bahceniz-icin-bambu-dekorasyon-onerileri",
        permanent: true,
      },

      {
        source: "/blog/hasir-balkon-uygulamasi-nasil-yapilir",
        destination: "/product/balkon-hasiri",
        permanent: true,
      },
      {
        source: "/blog/kamis-semsiye",
        destination: "/product/saz-kamis-semsiye",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
