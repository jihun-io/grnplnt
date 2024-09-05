"use client";

import { useState } from "react";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function GuestbookForm({ API_URL, API_KEY }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    content: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const API_SUBMIT = `${API_URL}guestbook/submit`;

    try {
      const response = await fetch(API_SUBMIT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        body: JSON.stringify(formData),
        mode: "cors", // 명시적으로 CORS 모드 설정
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // 폼 초기화
      setFormData({
        username: "",
        password: "",
        content: "",
      });

      router.refresh(); // 방명록 목록을 다시 불러오기

      // 여기에 성공 메시지를 표시하는 로직을 추가할 수 있습니다.
    } catch (error) {
      // 여기에 에러 메시지를 표시하는 로직을 추가할 수 있습니다.
      alert("방명록 작성 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
          className="basis-6 flex-grow h-12 px-4 rounded-md shadow-md"
          type="text"
          id="username"
          name="username"
          placeholder="이름"
          value={formData.username}
          onChange={handleChange}
        />

        <label className="sr-only" htmlFor="password">
          비밀번호
        </label>
        <input
          className="w-fit flex-grow h-12 px-4 rounded-md shadow-md"
          type="password"
          id="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
        />
      </fieldset>

      <label className="sr-only" htmlFor="content">
        내용
      </label>
      <textarea
        className="w-full p-4 rounded-md shadow-md"
        id="content"
        name="content"
        rows="7"
        value={formData.content}
        onChange={handleChange}
      ></textarea>
      <Button type="submit">작성</Button>
    </form>
  );
}
