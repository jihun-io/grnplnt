"use client";

import OptimizedImage from "./OptimizedImage";
import useEmblaCarousel from "embla-carousel-react";

export default function Merch() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div
      className="embla w-full flex justify-center items-center overflow-hidden scrollbar-hide mb-4 cursor-grab active:cursor-grabbing"
      ref={emblaRef}
    >
      <ul className="embla__container w-[50vw] max-h-[60vh] gap-x-6 flex flex-row before:w-[50vw] before:h-auto after:w-[50vw] after:h-auto ">
        <li className="embla__slide flex justify-center items-center bg-white rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-disc.png"
            className="h-full select-none drag-none"
            alt="혹성의 아이 디스크 목업 이미지"
          />
        </li>
        <li className="embla__slide flex justify-center items-center bg-white rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-hood.png"
            className="h-full select-none drag-none"
            alt="혹성의 아이 후드집업 목업 이미지"
          />
        </li>
        <li className="embla__slide flex justify-center items-center bg-white rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-shirt-animal.png"
            className="h-full select-none drag-none"
            alt="혹성의 아이 티셔츠(WE GO TOGETHER) 목업 이미지"
          />
        </li>
        <li className="embla__slide flex justify-center items-center bg-white rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-shirt-dont-call-me.png"
            className="h-full select-none drag-none"
            alt="혹성의 아이 티셔츠(DON'T CALL ME) 목업 이미지"
          />
        </li>
        <li className="embla__slide flex justify-center items-center bg-white rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-shirts.png"
            className="h-full select-none drag-none"
            alt="혹성의 아이 티셔츠(WE GO TOGETHER, DON'T CALL ME) 목업 이미지"
          />
        </li>
        <li className="embla__slide flex justify-center items-center bg-white rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-book.jpg"
            className="h-full select-none drag-none"
            alt="혹성의 아이 각본집 목업 이미지"
          />
        </li>
      </ul>
    </div>
  );
}
