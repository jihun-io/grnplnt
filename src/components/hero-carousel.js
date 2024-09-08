"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";

import "/src/styles/custom-bootstrap.scss";

const HeroCarousel = () => {
  return (
    <Carousel
      className="bootstrap-scope"
      indicators={false}
      touch={true}
      interval={10000}
    >
      <Carousel.Item className="h-[calc(100vh-4rem-2.5rem)]">
        <Image
          src="/images/hero-image1.jpg"
          width={1920}
          height={1080}
          loading="lazy"
          alt="허쉬, 포니, 젤리가 풀밭에 서서 위를 향해 바라보고 있다."
          className="h-[calc(100vh-4rem-2.5rem)] object-cover"
        />
      </Carousel.Item>
      <Carousel.Item className="h-[calc(100vh-4rem-2.5rem)]">
        <Image
          src="/images/hero-image2.jpg"
          width={1920}
          height={1080}
          loading="lazy"
          alt="허쉬와 젤리가 해안 도로를 걸어가고 있다."
          className="h-[calc(100vh-4rem-2.5rem)] object-cover"
        />
      </Carousel.Item>
      <Carousel.Item className="h-[calc(100vh-4rem-2.5rem)]">
        <Image
          src="/images/hero-image3.jpg"
          width={1920}
          height={1080}
          loading="lazy"
          alt="젤리, 허쉬, 포니가 횡단보도를 나란히 걸어가고 있다."
          className="h-[calc(100vh-4rem-2.5rem)] object-cover"
        />
      </Carousel.Item>
      <Carousel.Item className="h-[calc(100vh-4rem-2.5rem)]">
        <Image
          src="/images/hero-image4.jpg"
          width={1920}
          height={1080}
          loading="lazy"
          alt="은하를 배경으로 젤리가 서서 위를 바라보고 있다."
          className="h-[calc(100vh-4rem-2.5rem)] object-cover"
        />
      </Carousel.Item>
      <Carousel.Item className="h-[calc(100vh-4rem-2.5rem)]">
        <Image
          src="/images/hero-image5.jpg"
          width={1920}
          height={1080}
          loading="lazy"
          alt="푸른 하늘을 배경으로 포니, 젤리, 허쉬가 서 있다."
          className="h-[calc(100vh-4rem-2.5rem)] object-cover"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroCarousel;
