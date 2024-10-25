"use client";

import { useState, useEffect, useCallback } from "react";
import Modal from "@/components/ModifyModal";

export default function GuestbookList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/social/guestbook/api/json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setPosts(result);
      setIsLoading(false);
      // 여기에 성공 메시지를 표시하는 로직을 추가할 수 있습니다.
    } catch (error) {
      // 여기에 에러 메시지를 표시하는 로직을 추가할 수 있습니다.
      alert("방명록 로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();

    const handleGuestbookUpdate = () => {
      fetchPosts();
    };

    window.addEventListener("guestbookUpdated", handleGuestbookUpdate);

    return () => {
      window.removeEventListener("guestbookUpdated", handleGuestbookUpdate);
    };
  }, [fetchPosts]);

  if (isLoading) return <div></div>;
  if (error) return <div>{error}</div>;

  return (
    <ul className="w-11/12 flex flex-col gap-6 items-center">
      {Array.isArray(posts) &&
        posts.map((post) => (
          <li
            key={post.sn}
            className="flex flex-col w-full bg-white gap-8 px-6 py-8 rounded-lg shadow-md shadow-slate-100 relative overflow-hidden"
            id={post.sn}
          >
            <div className="flex flex-row items-center flex-wrap justify-between">
              <p className=" m-0 font-bold">{post.username}</p>
              <p className=" m-0 font-semibold">
                <time>{post.date}</time>
              </p>
            </div>
            <p className="m-0 mb-4 text-left">{post.content}</p>
            <ul className="flex absolute bottom-4 right-2 flex-row gap-x-2 justify-between items-center text-xs">
              <li>
                <Modal type="modify" id={post.sn} className="px-2">
                  수정
                </Modal>
              </li>
              <li>
                <Modal
                  type="delete"
                  id={post.sn}
                  className="px-2"
                  variant="red"
                >
                  삭제
                </Modal>
              </li>
            </ul>
          </li>
        ))}
    </ul>
  );
}
