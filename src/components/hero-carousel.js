"use client";

import React from "react";
import { useCallback, useEffect, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import useEmblaCarousel from "embla-carousel-react";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";

const HeroCarousel = () => {
  const options = { loop: true };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ delay: 6000 }),
  ]);

  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <article className="embla" ref={emblaRef}>
      <ul className="embla__container">
        <li className="embla__slide relative w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw]">
          <OptimizedImage
            src="/images/hero-1.png"
            fill
            quality={100}
            loading="lazy"
            alt="포니, 젤리, 허쉬가 가방을 메고 나란히 길을 걸어가고 있는 뒷모습."
            className="w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw] object-cover"
          />
        </li>
        <li className="embla__slide relative w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw]">
          <OptimizedImage
            src="/images/hero-2.png"
            fill
            quality={100}
            loading="lazy"
            alt="젤리, 허쉬, 포니가 전자 장비가 놓인 테이블에 앉아 대화를 나누고 있다."
            className="w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw] object-cover"
          />
        </li>
        <li className="embla__slide relative w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw]">
          <OptimizedImage
            src="/images/hero-3.png"
            fill
            quality={100}
            loading="lazy"
            alt="허쉬와 젤리가 나란히 소파에 누워 있다. 허쉬는 자신의 휴대전화를 바라보고 있고, 젤리는 허쉬의 휴대전화를 옆에서 본다."
            className="w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw] object-cover"
          />
        </li>
        <li className="embla__slide relative w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw]">
          <OptimizedImage
            src="/images/hero-4.png"
            fill
            quality={100}
            loading="lazy"
            alt="포니와 허쉬가 젤리와 마주치며 이야기를 나누고 있다."
            className="w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw] object-cover"
          />
        </li>
        <li className="embla__slide relative w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw]">
          <OptimizedImage
            src="/images/hero-5.png"
            fill
            quality={100}
            loading="lazy"
            alt="젤리가 봉지를 들며 허쉬를 향해 웃고 있다."
            className="w-[100vw] h-[calc(100vh-4rem-2.5rem)] max-h-[100vw] object-cover"
          />
        </li>
      </ul>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </article>
  );
};

export default HeroCarousel;
