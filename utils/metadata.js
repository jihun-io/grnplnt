export function generateMetadata(
  title = "혹성의 아이",
  description = "자신의 고향이 게자리 너머에 위치한 초록빛 M5107 행성이라고 주장하는 수상한 소녀 젤리는 일주일 째 학교에 나오지 않고, 이에 선생님의 부탁을 받은 허쉬와 포니가 그녀를 찾아 나선다.",
  currentUrl = "https://grnplnt.life/"
) {
  return {
    metadataBase: new URL("https://grnplnt.life"), //실제 배포할 때는 수정해야 함!!
    title: title,
    description: description,
    icons: {
      icon: [
        { url: "/metadata/favicon.ico" },
        {
          url: "/metadata/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/metadata/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/metadata/favicon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/metadata/apple-icon-57x57.png",
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-60x60.png",
          sizes: "60x60",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-76x76.png",
          sizes: "76x76",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-114x114.png",
          sizes: "114x114",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-120x120.png",
          sizes: "120x120",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          url: "/metadata/apple-icon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "icon",
          url: "/metadata/android-icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
      ],
    },
    manifest: "/metadata/manifest.json",
    openGraph: {
      type: "website",
      url: "https://grnplnt.life/",
      title: "혹성의 아이",
      description: description,
      images: [
        {
          url: "/images/hero-2.jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "혹성의 아이",
      description: description,
      images: ["/images/hero-2.jpeg"],
    },
    other: {
      "msapplication-TileImage": "/metadata/ms-icon-144x144.png",
    },
  };
}
