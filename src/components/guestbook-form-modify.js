"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

export default function GuestbookFormModify({ API_URL, API_KEY, id }) {
  const [formData, setFormData] = useState({
    username: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const API_GET = `${API_URL}guestbook/modify/getdata?id=${id}`;
      try {
        const response = await fetch(API_GET, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": API_KEY,
          },
          body: JSON.stringify({
            session_id: localStorage.getItem("guestbook_session"),
          }),
          mode: "cors", // 명시적으로 CORS 모드 설정
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        setFormData({
          username: result.username,
          content: result.content,
        });

        // 여기에 성공 메시지를 표시하는 로직을 추가할 수 있습니다.
      } catch (error) {
        // 여기에 에러 메시지를 표시하는 로직을 추가할 수 있습니다.
        router.push(`/social/guestbook/`);
        alert("방명록을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    };
    getData();
  }, [API_URL, API_KEY, id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = `${API_URL}guestbook/modify/submit?id=${id}`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
          "Session-ID": localStorage.getItem("guestbook_session"),
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
        content: "",
      });
      if (result.result === "success") {
        router.push("/social/guestbook");
        router.refresh(); // 방명록 목록을 다시 불러오기
      }

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
          required
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
        required
      ></textarea>
      <Button className="ml-auto" type="submit">
        작성
      </Button>
    </form>
  );
}