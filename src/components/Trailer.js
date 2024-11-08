"use client";

import YouTube from "react-youtube";
import React, { useState } from "react";
import OptimizedImage from "./OptimizedImage";

export default function Trailer({ videoId, className }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    setIsLoaded(true);
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!isLoaded) {
    return (
      <div
        className="relative w-full aspect-video bg-gray-100 cursor-pointer"
        onClick={handleClick}
        role="button"
        aria-label="예고편 재생하기"
      >
        <OptimizedImage
          src="/images/thumbnail.jpeg"
          alt="혹성의 아이 예고편"
          className="w-full h-full object-cover"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#64b900"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-24 -translate-x-1/2 -translate-y-1/2 opacity-90 absolute top-1/2 left-1/2 inset-0 flex items-center justify-center"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
      </div>
    );
  }

  return (
    <>
      <YouTube
        videoId="M91mq47DVe0"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        opts={{ playerVars: { autoplay: 1 } }}
        iframeClassName="w-full h-full"
      />
    </>
  );
}
