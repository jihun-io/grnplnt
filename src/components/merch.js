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
      <ul className="embla__container w-[50vw] gap-x-6 flex flex-row before:w-[50vw] before:h-auto after:w-[50vw] after:h-auto ">
        <li className="embla__slide flex  rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-disc.png"
            className=" select-none drag-none"
          />
        </li>
        <li className="embla__slide flex  rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-hood.png"
            className=" select-none drag-none"
          />
        </li>
        <li className="embla__slide flex  rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-shirt-animal.png"
            className=" select-none drag-none"
          />
        </li>
        <li className="embla__slide flex  rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-shirt-dont-call-me.png"
            className=" select-none drag-none"
          />
        </li>
        <li className="embla__slide flex  rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-shirts.png"
            className=" select-none drag-none"
          />
        </li>
        <li className="embla__slide flex  rounded-xl shadow-xl my-8 overflow-hidden w-[50vw]">
          <OptimizedImage
            src="/images/mockup-book.png"
            className=" select-none drag-none"
          />
        </li>
      </ul>
    </div>
  );
}
