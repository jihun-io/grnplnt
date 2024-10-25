"use client";

import { useState, useEffect, useRef } from "react";

const ScrollTrigger = ({ onVisible, threshold = 0.1, children }) => {
  const ref = useRef(null);
  const heightRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [heightCalculated, setHeightCalculated] = useState(false);

  // 전체 텍스트의 높이를 미리 계산
  useEffect(() => {
    if (heightRef.current) {
      const height = heightRef.current.getBoundingClientRect().height;
      setContainerHeight(height);
      setHeightCalculated(true);
    }
  }, [children]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible?.();
        }
      },
      { threshold: threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [onVisible, threshold]);

  return (
    <>
      {/* 높이 계산을 위한 요소 - 계산 후 제거 */}
      {!heightCalculated && (
        <p
          ref={heightRef}
          className="text-sugar-cane-50 text-md md:text-lg md:leading-normal xl:text-xl xl:leading-normal break-keep text-center px-12 md:px-24 lg:px-48 opacity-0"
          aria-hidden="true"
        >
          {text}
        </p>
      )}

      {/* 실제 보여지는 요소 */}
      <p
        ref={ref}
        className="text-sugar-cane-50 text-md md:text-lg md:leading-normal xl:text-xl xl:leading-normal break-keep text-center px-12 md:px-24 lg:px-48"
        aria-hidden="true"
        style={{
          height: containerHeight > 0 ? `${containerHeight}px` : "auto",
        }}
      >
        {children}
      </p>
    </>
  );
};

// 시놉시스 텍스트 컴포넌트
const text = `자신의 고향이 게자리 너머에 위치한 초록빛 M5107 행성이라고 주장하는 수상한 소녀 젤리는 일주일 째 학교에 나오지 않고, 이에 선생님의 부탁을 받은 허쉬와 포니가 그녀를 찾아 나선다.`;

export default function SynopsisText() {
  const [showText, setShowText] = useState("");
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (!startTyping) return;

    const interval = setInterval(() => {
      setShowText((prev) => {
        const next = text.slice(0, prev.length + 1);
        if (next === text) {
          clearInterval(interval);
        }
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [startTyping]);

  return (
    <ScrollTrigger
      onVisible={() => setStartTyping(true)}
      threshold={0.5} // 컴포넌트가 50% 보일 때 시작
    >
      {showText}
    </ScrollTrigger>
  );
}
