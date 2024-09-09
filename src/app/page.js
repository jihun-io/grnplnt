import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "../components/hero-carousel";

export default function Home() {
  return (
    <main className="w-[100vw]">
      <h2 className="sr-only">홈</h2>
      <section className="hero">
        <h3 className="sr-only">메인 이미지</h3>
        <HeroCarousel />
      </section>
      <section className="synopsis w-full h-[100vh] bg-[url('/images/synopsis-background_1920.jpg')] bg-cover flex justify-center items-center">
        <div className="flex flex-col gap-16 justify-center items-center">
          <h3 className="pyeongchangpeace-bold text-sugar-cane-50 text-4xl md:text-5xl lg:text-6xl ">
            SYNOPSIS
          </h3>
          <p className=" text-sugar-cane-50 text-2xl md:text-3xl md:leading-normal xl:text-3xl xl:leading-normal break-keep text-center px-12 md:px-24 lg:px-48">
            자신의 고향이 게자리 너머에 위치한 초록빛 M5107 행성이라고 주장하는
            수상한 소녀 젤리는 일주일 째 학교에 나오지 않고, 이에 선생님의
            부탁을 받은 허쉬와 포니가 그녀를 찾아 나선다.
          </p>
        </div>
      </section>
      <section className="trailer w-full h-[100vh] bg-[#000] flex flex-col justify-center items-center">
        <h3 className="sr-only">예고편</h3>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=duJ2z1mHm0nLZxCT"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          className="w-full aspect-video"
        ></iframe>
      </section>
      <section className="character w-full h-fit">
        <div className="bg-wrapper bg-[url('/images/character-hero_1920.jpg')] h-[720px] bg-top bg-cover">
          <h3 className="pyeongchangpeace-bold text-sugar-cane-950 text-center pt-32 text-5xl md:text-5xl lg:text-6xl ">
            캐릭터
          </h3>
        </div>
        <ul className="px-12 md:px-24 lg:px-48">
          <li className="flex flex-row justify-center items-center flex-wrap gap-4 px-8 py-7">
            <Image
              class="rounded-full w-48 h-48 object-cover bg-[#fff]"
              src="/images/hush.png"
              width={320}
              height={320}
            />
            <div className="flex flex-col justify-center flex-1 gap-y-10 min-w-44 h-[240px]">
              <h4 className="pyeongchangpeace text-3xl">허쉬 (18)</h4>
              <p className="break-keep">
                어딘가 심드렁 하고 무미건조한 듯 보이는 소녀. 그러나 장난기
                넘치는 포니와 맞장구 칠 줄 알고 엉뚱한 젤리의 마음을
                들여다보려고 노력하는 세심함을 가지고 있다. 의외로 늦둥이
                외동딸.
              </p>
            </div>
          </li>
          <li className="flex flex-row justify-center items-center flex-wrap gap-4 px-8 py-7">
            <Image
              class="rounded-full w-48 h-48 object-cover bg-[#fff]"
              src="/images/jelly.png"
              width={320}
              height={320}
            />
            <div className="flex flex-col justify-center flex-1 gap-y-10 min-w-44 h-[240px]">
              <h4 className="pyeongchangpeace text-3xl">젤리 (18)</h4>
              <p className="break-keep">
                남들이 기억 못하는 자신의 &lsquo;고향별&rsquo;을 기억한다는 별난
                소녀. 겁도 많고 자신감도 살짝 떨어지는 것 같지만, 어떻게든
                고향별과 연락하고 말겠다는 자신의 목표에 진심으로 임한다.
              </p>
            </div>
          </li>
          <li className="flex flex-row justify-center items-center flex-wrap gap-4 px-8 py-7">
            <Image
              class="rounded-full w-48 h-48 object-cover bg-[#fff]"
              src="/images/pony.png"
              width={320}
              height={320}
            />
            <div className="flex flex-col justify-center flex-1 gap-y-10 min-w-44 h-[240px]">
              <h4 className="pyeongchangpeace text-3xl">포니 (18)</h4>
              <p className="break-keep">
                훤칠한 키에 뛰어난 운동신경, 거기에 컴퓨터까지 잘 다루지만 정작
                좋아하는 건 실없이 수다떨기와 시종일관 허쉬에게 장난치기.
                젤리와의 첫 만남에서도 서슴없이 다가간다.
              </p>
            </div>
          </li>
          <li className="flex flex-row justify-center items-center flex-wrap gap-4 px-8 py-7">
            <Image
              class="rounded-full w-48 h-48 object-cover bg-[#fff]"
              src="/images/fullface.png"
              width={320}
              height={320}
            />
            <div className="flex flex-col justify-center flex-1 gap-y-10 min-w-44 h-[240px]">
              <h4 className="pyeongchangpeace text-3xl">풀페이스 (미상)</h4>
              <p className="break-keep">
                허쉬와 포니, 젤리 앞에 나타난 수상한 남자.
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section className="more">
        <div className="bg-[url('/images/firework.png')] w-full aspect-video bg-cover bg-center flex flex-col justify-center">
          <h2 className="pyeongchangpeace-bold text-2xl md:text-3xl lg:text-4xl  text-center">
            더 보기
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-x-32">
          <article className="w-full h-80 bg-[url('https://via.placeholder.com/900x300')] bg-cover bg-center flex flex-col justify-center items-center gap-y-6">
            <h3 className="text-4xl font-bold">Merchandise</h3>
            <p className="text-xl leading-loose">
              혹성의 아이의 공식 상품을 소개합니다.
            </p>
            <Link
              className="bg-sugar-cane-700 rounded-xl py-2 px-6 font-bold text-sugar-cane-50 hover:bg-sugar-cane-800 transition-colors"
              href="./merchandise"
            >
              공식 상품 보기
            </Link>
          </article>
          <article className="w-full h-80 bg-[url('https://via.placeholder.com/900x300')] bg-cover bg-center flex flex-col justify-center items-center gap-y-6">
            <h3 className="text-4xl font-bold">Social</h3>
            <p className="text-xl leading-loose">
              혹성의 아이의 소식을 만나 보세요.
            </p>
            <Link
              className="bg-sugar-cane-700 rounded-xl py-2 px-6 font-bold text-sugar-cane-50 hover:bg-sugar-cane-800 transition-colors"
              href="./social"
            >
              소셜
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
