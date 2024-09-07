"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

export default function GuestbookForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    content: "",
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

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
      router.refresh(); // 방명록 목록을 다시 불러오기

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
        required
        {...(isLoading && { disabled: true })}
      ></textarea>
      <Button className="ml-auto" type="submit">
        {isLoading ? "처리 중..." : "작성"}
      </Button>
    </form>
  );
}
