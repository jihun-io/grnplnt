import "./globals.css";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";
import Link from "next/link";
import HeroCarousel from "../components/HeroCarousel";
import SynopsisText from "@/components/SynopsisText";
import Merch from "@/components/Merch";
import SocialButton from "@/components/SocialButton";
import { data } from "./social/page";

export default function Home() {
  const characterDesc =
    "flex flex-col sm:flex-row justify-center flex-1 gap-x-4 gap-y-10 px-8 sm:px-16 lg:px-32 min-w-44 h-[240px]";

  return (
    <main className="w-[100vw]">
      <h2 className="sr-only">홈</h2>
      <section className="hero">
        <h3 className="sr-only">메인 이미지</h3>
        <HeroCarousel />
      </section>
      <section className="synopsis w-full h-[calc(100vh-4rem-2.5rem)] bg-[url('/optimized/synopsis-background_1920-1080.webp')] bg-cover flex flex-col justify-center items-center">
        <h3 className="pyeongchangpeace-bold text-sugar-cane-50 text-4xl md:text-5xl lg:text-6xl mb-16">
          SYNOPSIS
        </h3>
        <SynopsisText />
        <p className="sr-only">
          자신의 고향이 게자리 너머에 위치한 초록빛 M5107 행성이라고 주장하는
          수상한 소녀 젤리는 일주일 째 학교에 나오지 않고, 이에 선생님의 부탁을
          받은 허쉬와 포니가 그녀를 찾아 나선다.
        </p>
      </section>
      <section className="trailer w-full h-[calc(100vh-4rem-2.5rem)] bg-[#000] flex flex-col justify-center items-center">
        <h3 className="sr-only">예고편</h3>
        <iframe
          src={"https://www.youtube.com/embed/dQw4w9WgXcQ?si=duJ2z1mHm0nLZxCT"}
          allowFullScreen
          loading="lazy"
          className="w-full aspect-video"
        ></iframe>
      </section>
      <section className="character w-full h-fit">
        <h3 className="sr-only">캐릭터</h3>
        <ul>
          <li className="flex flex-col justify-center items-center flex-wrap gap-6 pb-10">
            <OptimizedImage
              className="w-full max-h-[60dvh] object-cover aspect-[4/3] bg-[#fff]"
              src="/images/hush.png"
              alt="팔짱을 끼고 앉아 있는 허쉬의 모습."
            />
            <div className={characterDesc}>
              <h4 className="pyeongchangpeace text-3xl whitespace-nowrap">
                허쉬 (18)
              </h4>
              <p className="break-keep">
                어딘가 심드렁 하고 무미건조한 듯 보이는 소녀. 그러나 장난기
                넘치는 포니와 맞장구 칠 줄 알고 엉뚱한 젤리의 마음을
                들여다보려고 노력하는 세심함을 가지고 있다. 의외로 늦둥이
                외동딸.
              </p>
            </div>
          </li>
          <li className="flex flex-col justify-center items-center flex-wrap gap-6 pb-10">
            <OptimizedImage
              className="w-full max-h-[60dvh] object-cover aspect-[4/3] bg-[#fff]"
              src="/images/jelly.png"
              alt="웃고 있는 젤리의 모습."
            />
            <div className={characterDesc}>
              <h4 className="pyeongchangpeace text-3xl whitespace-nowrap">
                젤리 (18)
              </h4>
              <p className="break-keep">
                남들이 기억 못하는 자신의 &lsquo;고향별&rsquo;을 기억한다는 별난
                소녀. 겁도 많고 자신감도 살짝 떨어지는 것 같지만, 어떻게든
                고향별과 연락하고 말겠다는 자신의 목표에 진심으로 임한다.
              </p>
            </div>
          </li>
          <li className="flex flex-col justify-center items-center flex-wrap gap-6">
            <OptimizedImage
              className="w-full max-h-[60dvh] object-cover aspect-[4/3] bg-[#fff]"
              src="/images/pony.png"
              alt="미소를 짓고 있는 포니의 모습."
            />
            <div className={characterDesc}>
              <h4 className="pyeongchangpeace text-3xl whitespace-nowrap">
                포니 (18)
              </h4>
              <p className="break-keep">
                훤칠한 키에 뛰어난 운동신경, 거기에 컴퓨터까지 잘 다루지만 정작
                좋아하는 건 실없이 수다떨기와 시종일관 허쉬에게 장난치기.
                젤리와의 첫 만남에서도 서슴없이 다가간다.
              </p>
            </div>
          </li>
        </ul>
      </section>
      <hr className="mx-32 my-32 border-sugar-cane-950" />
      <section className="more">
        <h2 className="sr-only">더 보기</h2>
        <OptimizedImage
          src="/images/more-1280.jpeg"
          className="mt-10 w-full aspect-video bg-cover bg-center flex flex-col justify-center"
          alt="헤드폰을 쓴 젤리가 무언가를 집중해서 듣고 있다."
        />
        <article className="w-full p-8 bg-contain bg-no-repeat bg-center flex flex-col justify-center items-center gap-y-1`">
          <Merch />
          <h3 className="text-4xl font-bold">Merchandise</h3>
          <p className="text-xl leading-8 break-keep text-center">
            Coming Soon
          </p>
          <Link
            className="bg-sugar-cane-700 rounded-xl py-2 px-6 mt-5 font-bold text-sugar-cane-50 hover:bg-sugar-cane-800 transition-colors"
            href="./merchandise"
          >
            공식 상품 보기
          </Link>
        </article>
        <article className="w-full bg-cover bg-center flex flex-col justify-center items-center gap-y-1 mb-32">
          <OptimizedImage
            className="w-full my-8 max-h-[60vh] object-cover"
            src="/images/fireworks.png"
            alt="두 개의 스파클라가 타면서 반짝이고 있고, 끄트머리가 서로 맞닿아 있다."
          />
          <h3 className="text-4xl font-bold">Social</h3>
          <p className="text-xl leading-8 break-keep text-center">
            혹성의 아이의 소식을 만나 보세요.
          </p>
          <SocialButton data={data} />
        </article>
      </section>
    </main>
  );
}
