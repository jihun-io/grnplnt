"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";

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
      if (actionType === "delete") {
        // 삭제 API: DELETE /social/guestbook/api/entries/[id]
        const response = await fetch(`/social/guestbook/api/entries/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: formData.pw }),
          mode: "cors",
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            alert("비밀번호가 일치하지 않습니다.");
          } else if (response.status === 404) {
            alert("방명록을 찾을 수 없습니다.");
          } else {
            alert(`오류가 발생했습니다: ${errorData.error}`);
          }
          return;
        }

        const result = await response.json();
        
        // 성공 처리
        setTimeout(() => {
          window.dispatchEvent(new Event("guestbookUpdated", { bubbles: true }));
        }, 500);
        
        setFormData({
          id: id,
          pw: "",
        });
        
        router.refresh();
        closeModal();
        
      } else if (actionType === "modify") {
        // 수정 권한 확인 API: POST /social/guestbook/api/entries/[id]/auth
        const response = await fetch(`/social/guestbook/api/entries/${id}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: formData.pw }),
          mode: "cors",
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            alert("비밀번호가 일치하지 않습니다.");
          } else if (response.status === 404) {
            alert("방명록을 찾을 수 없습니다.");
          } else {
            alert(`오류가 발생했습니다: ${errorData.error}`);
          }
          return;
        }

        const result = await response.json();
        
        // 세션 ID 저장 및 수정 페이지로 이동
        localStorage.setItem("guestbook_session", result.session_id);
        router.push(`/social/guestbook/modify/${sn}`);
        
        setFormData({
          id: id,
          pw: "",
        });
      }
    } catch (error) {
      console.error("Error in handleAction:", error);
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
