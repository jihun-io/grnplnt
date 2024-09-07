"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/button";

export default function ModalWrapper({ type, id, variant, children }) {
  const [formData, setFormData] = useState({
    id: id,
    pw: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAction = async (e, actionType, sn) => {
    e.preventDefault();

    try {
      const response = await fetch(`/social/guestbook/api/${actionType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        mode: "cors", // 명시적으로 CORS 모드 설정
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // 여기에 성공 메시지를 표시하는 로직을 추가할 수 있습니다.
      // 폼 초기화
      setFormData({
        id: id,
        pw: "",
      });

      router.refresh(); // 방명록 목록을 다시 불러오기
      if (result.result === "checked") {
        if (actionType === "delete") {
          closeModal();
        } else {
          localStorage.setItem("guestbook_session", result.session_id);
          router.push(`/social/guestbook/modify/${sn}`);
        }
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      // 여기에 에러 메시지를 표시하는 로직을 추가할 수 있습니다.
      alert(
        `방명록 ${
          actionType === "modify" ? "수정" : "삭제"
        } 중 오류가 발생했습니다. 다시 시도해 주세요.`
      );
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <>
      <Button variant={variant} onClick={openModal}>
        {children}
      </Button>

      {isOpen && (
        <dialog className="text-[1rem] fixed w-dvw h-dvh inset-0 bg-sugar-cane-50 bg-opacity-50 flex items-center justify-center overflow-hidden z-50">
          <div className="bg-[#fff] p-4 rounded-lg flex flex-col gap-y-4 shadow-md">
            <h3 className="font-bold text-lg">
              방명록 {type === "modify" ? "수정" : "삭제"}
            </h3>
            <form
              onSubmit={(e) => handleAction(e, type, id)}
              onChange={handleChange}
              className="flex flex-col gap-y-4 justify-center"
            >
              <label className="sr-only" htmlFor="pw">
                비밀번호
              </label>
              <input
                type="password"
                id="pw"
                name="pw"
                placeholder="비밀번호"
                className="w-full h-12 px-4 border-[1px] border-sugar-cane-600 rounded-md"
                required
              />
              <div className="flex justify-between">
                <Button variant="outline" onClick={closeModal}>
                  취소
                </Button>
                {type === "modify" ? (
                  <Button type="submit">수정</Button>
                ) : (
                  <Button variant="red" type="submit">
                    삭제
                  </Button>
                )}
              </div>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}
