"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/modify-modal";

export default function GuestbookList({ posts }) {
  // const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <ul className="w-11/12 flex flex-col gap-6 items-center">
      {Array.isArray(posts) &&
        posts.map((post) => (
          <li
            key={post.sn}
            className="flex flex-col w-9/12 bg-white gap-8 px-6 py-8 rounded-lg shadow-md shadow-slate-100 bg-[#fff] relative overflow-hidden"
            id={post.sn}
          >
            <div className="flex flex-row items-center flex-wrap justify-between">
              <p className=" m-0 font-bold">{post.username}</p>
              <p className=" m-0 font-semibold">
                <time>{post.date}</time>
              </p>
            </div>
            <div className="absolute bottom-2 right-2">
              <ul className="flex flex-row gap-x-2 justify-between items-center text-xs">
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
                <li></li>
              </ul>
            </div>
            <p className="m-0  break-keep text-left">{post.content}</p>
          </li>
        ))}
    </ul>
  );
}
