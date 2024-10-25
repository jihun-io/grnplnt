export function generateMetadata(
  title,
  description,
  currentUrl = "https://grnplnt.life/"
) {
  return {
    title,
    description,
    openGraph: {
      type: "website",
      url: currentUrl,
      title,
      description,
      images: [
        {
          url: "/images/hero-2.png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero-2.png"],
    },
  };
}
