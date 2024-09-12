"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import Script from "next/script";
import dynamic from "next/dynamic";

const TurnstileWidget = dynamic(() => import("@/components/turnstileWidget"), {
  ssr: false,
});

export default function GuestbookForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    content: "",
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [notSolved, setNotSolved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const turnstileInput = document.querySelectorAll(
      'input[id ^= "cf-chl-widget-"]'
    );
    if (turnstileInput[0]?.value == "") {
      setNotSolved(true);
      setIsLoading(false);
      return;
    } else {
      setNotSolved(false);
      formData.turnstile = turnstileInput[0]?.value;
    }

    console.log(formData);

    try {
      const response = await fetch(`/social/guestbook/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
      // 폼 초기화
      setFormData({
        username: "",
        password: "",
        content: "",
      });
      setIsLoading(false);
      setTimeout(() => {
        window.dispatchEvent(new Event("guestbookUpdated", { bubbles: true }));
      }, 500);
      // 여기에 성공 메시지를 표시하는 로직을 추가할 수 있습니다.
    } catch (error) {
      // 여기에 에러 메시지를 표시하는 로직을 추가할 수 있습니다.
      alert("방명록 작성 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full md:px-16 flex flex-col items-center gap-4"
      onSubmit={handleSubmit}
    >
      <fieldset className="w-full flex flex-row flex-wrap justify-center items-center gap-x-4 gap-y-2">
        <legend className="sr-only">사용자 정보</legend>
        <label className="sr-only" htmlFor="username">
          이름
        </label>
        <input
          className="basis-6 flex-grow h-12 px-4 rounded-md border-[1px] border-sugar-cane-600"
          type="text"
          id="username"
          name="username"
          placeholder="이름"
          value={formData.username}
          onChange={handleChange}
          required
          {...(isLoading && { disabled: true })}
        />

        <label className="sr-only" htmlFor="password">
          비밀번호
        </label>
        <input
          className="w-fit flex-grow h-12 px-4 rounded-md border-[1px] border-sugar-cane-600"
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
          {...(isLoading && { disabled: true })}
        />
      </fieldset>

      <label className="sr-only" htmlFor="content">
        내용
      </label>
      <textarea
        className="w-full p-4 rounded-md border-[1px] border-sugar-cane-600"
        id="content"
        name="content"
        rows="7"
        value={formData.content}
        onChange={handleChange}
        placeholder="타인의 권리를 침해하거나 관련 법령에 위반되는 내용을 게시할 경우 삭제 및 제재될 수 있습니다."
        required
        {...(isLoading && { disabled: true })}
      ></textarea>
      <div className="w-full h-[148px] flex flex-row justify-between items-start">
        <TurnstileWidget />
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
          strategy="afterInteractive"
        ></Script>
        <Button className="ml-auto break-keep" type="submit">
          {notSolved
            ? "사람인지 확인하십시오..."
            : isLoading
            ? "처리 중..."
            : "작성"}
        </Button>
      </div>
    </form>
  );
}
