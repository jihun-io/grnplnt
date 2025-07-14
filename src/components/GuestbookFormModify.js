"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function GuestbookFormModify({ id }) {
  const [formData, setFormData] = useState({
    id: id,
    session_id: "",
    username: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // 세션 ID 가져오기 및 유효성 검사
  const getSessionId = () => {
    const sessionId = localStorage.getItem("guestbook_session");
    if (!sessionId) {
      router.push("/social/guestbook/");
      alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
      return null;
    }
    return sessionId;
  };

  useEffect(() => {
    const getData = async () => {
      const sessionId = getSessionId();
      if (!sessionId) {
        return;
      }

      const API_GET = `/social/guestbook/api/entries/${id}`;
      try {
        const response = await fetch(API_GET, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Session-ID": sessionId,
          },
          mode: "cors", // 명시적으로 CORS 모드 설정
        });

        if (!response.ok) {
          let errorMessage = "방명록을 가져오는 중 오류가 발생했습니다.";
          
          switch (response.status) {
            case 401:
              errorMessage = "인증에 실패했습니다. 다시 로그인해 주세요.";
              break;
            case 403:
              errorMessage = "해당 방명록에 접근할 권한이 없습니다.";
              break;
            case 404:
              errorMessage = "방명록을 찾을 수 없습니다.";
              break;
            case 500:
              errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
              break;
          }
          
          throw new Error(errorMessage);
        }

        const result = await response.json();
        
        if (result.result === "fail") {
          router.push(`/social/guestbook/`);
          alert(result.message || "방명록을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
          return;
        }

        setFormData({
          id: id,
          session_id: sessionId,
          username: result.username,
          content: result.content,
        });
        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
        router.push(`/social/guestbook/`);
        alert(error.message || "방명록을 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    };
    getData();
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 입력값 유효성 검사
    if (!formData.username.trim()) {
      setIsLoading(false);
      alert("이름을 입력해주세요.");
      return;
    }

    if (!formData.content.trim()) {
      setIsLoading(false);
      alert("내용을 입력해주세요.");
      return;
    }

    if (formData.username.length > 50) {
      setIsLoading(false);
      alert("이름은 50자 이내로 입력해주세요.");
      return;
    }

    if (formData.content.length > 500) {
      setIsLoading(false);
      alert("내용은 500자 이내로 입력해주세요.");
      return;
    }

    const sessionId = getSessionId();
    if (!sessionId) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/social/guestbook/api/entries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Session-ID": sessionId,
        },
        body: JSON.stringify({
          username: formData.username,
          content: formData.content,
        }),
        mode: "cors", // 명시적으로 CORS 모드 설정
      });

      if (!response.ok) {
        let errorMessage = "방명록 수정 중 오류가 발생했습니다.";
        
        switch (response.status) {
          case 400:
            errorMessage = "입력한 정보가 올바르지 않습니다. 다시 확인해 주세요.";
            break;
          case 401:
            errorMessage = "인증에 실패했습니다. 다시 로그인해 주세요.";
            break;
          case 403:
            errorMessage = "해당 방명록을 수정할 권한이 없습니다.";
            break;
          case 404:
            errorMessage = "방명록을 찾을 수 없습니다.";
            break;
          case 500:
            errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
            break;
        }
        
        throw new Error(errorMessage);
      }

      const result = await response.json();

      if (result.result === "success") {
        router.push("/social/guestbook");
        router.refresh(); // 방명록 목록을 다시 불러오기
        alert("방명록이 성공적으로 수정되었습니다.");
      } else {
        throw new Error(result.message || "방명록 수정에 실패했습니다.");
      }

    } catch (error) {
      setIsLoading(false);
      alert(error.message || "방명록 수정 중 오류가 발생했습니다. 다시 시도해 주세요.");
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
      <Button className="ml-auto" type="submit">
        {isLoading ? "처리 중..." : "수정"}
      </Button>
    </form>
  );
}
