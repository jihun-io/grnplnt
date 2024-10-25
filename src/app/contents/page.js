import OptimizedImage from "@/components/OptimizedImage";
import Image from "next/image";
import Link from "next/link";

import ImagesCarousel from "@/components/ImagesCarousel";

import { generateMetadata } from "../../../utils/metadata";

function ImageLink({ src, alt, style }) {
  return (
    <Link href={src}>
      <OptimizedImage src={src} alt={alt} style={style} />
    </Link>
  );
}

const title = "콘텐츠 - 혹성의 아이";
const description = "혹성의 아이의 콘텐츠를 만나 보세요.";

export const metadata = generateMetadata(title, description);

export default function Contents() {
  return (
    <main className="px-8">
      <h2 className="font-bold text-3xl mb-4">콘텐츠</h2>
      <p className="mb-8">이미지를 클릭하면 전체 해상도로 보실 수 있습니다.</p>
      <section>
        <h3 className="text-xl my-4">포스터</h3>
        <article className="grid grid-cols-2 gap-x-2">
          <ImageLink src="/images/poster-1.jpg" alt="혹성의 아이 포스터 1" />
          <ImageLink src="/images/poster-2.jpg" alt="혹성의 아이 포스터 2" />
        </article>
      </section>
      <section>
        <h3 className="text-xl mt-8 mb-4">콘셉트 아트</h3>
        <article className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 items-center ">
          <ImageLink
            style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
            src="/images/art-card-hush.jpg"
          />
          <ImageLink
            style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
            src="/images/art-card-jelly.jpg"
          />
          <ImageLink
            style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
            src="/images/art-card-pony.jpg"
          />
          <ImageLink
            style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
            src="/images/art-cover.jpg"
          />
          <ImageLink
            style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
            src="/images/art-fitting.jpg"
          />
          <ImageLink
            style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
            src="/images/art-jelly-heart.jpg"
          />
          <ImageLink
            style={{ aspectRatio: 1 / 1, objectFit: "cover" }}
            src="/images/art-main.jpg"
          />
        </article>
      </section>
    </main>
  );
}
