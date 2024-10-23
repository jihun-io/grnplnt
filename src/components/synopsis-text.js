"use client";

import { useState, useEffect, useRef } from "react";

// ScrollTrigger 컴포넌트
const ScrollTrigger = ({ onVisible, threshold = 0.1, children }) => {
  const ref = useRef(null);

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
    <p
      className="text-sugar-cane-50 text-md md:text-lg md:leading-normal xl:text-xl xl:leading-normal break-keep text-center px-12 md:px-24 lg:px-48"
      aria-hidden="true"
      ref={ref}
    >
      {children}
    </p>
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
