"use client";

import Modal from "@/components/modify-modal";

export default async function Guestbook({ API_URL, API_KEY }) {
  async function getPosts() {
    const API_LIST = API_URL + "guestbook/json";

    try {
      const response = await fetch(API_LIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": API_KEY,
        },
        mode: "cors", // 명시적으로 CORS 모드 설정
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const post = await response.json();
      return post;
    } catch (error) {
      console.log("error", error);
      return;
    }
  }

  const posts = await getPosts();

  return (
    <ul className="w-11/12 flex flex-col gap-6 items-center">
      {posts.map(([title, date, content, id]) => (
        <li
          key={id}
          className="flex flex-col w-9/12 bg-white gap-8 px-6 py-8 rounded-lg shadow-md shadow-slate-100 bg-[#fff] relative overflow-hidden"
          id={id}
        >
          <div className="flex flex-row items-center flex-wrap justify-between">
            <p className=" m-0 font-bold">{title}</p>
            <p className=" m-0 font-semibold">
              <time>{date}</time>
            </p>
          </div>
          <div className="absolute bottom-2 right-2">
            <ul className="flex flex-row gap-x-2 justify-between items-center text-xs">
              <li>
                <Modal
                  API_URL={API_URL}
                  API_KEY={API_KEY}
                  type="modify"
                  id={id}
                  className="px-2"
                >
                  수정
                </Modal>
              </li>
              <li>
                <Modal
                  API_URL={API_URL}
                  API_KEY={API_KEY}
                  type="delete"
                  id={id}
                  className="px-2"
                  variant="red"
                >
                  삭제
                </Modal>
              </li>
              <li></li>
            </ul>
          </div>
          <p className="m-0  break-keep text-left">{content}</p>
        </li>
      ))}
    </ul>
  );
}
