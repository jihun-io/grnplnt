import { generateMetadata } from "/utils/metadata";

import Link from "next/link";
import SocialNav from "@/components/social-nav";
import Button from "@/components/button";
import GuestbookForm from "@/components/guestbook-form";
import Modal from "@/components/modify-modal";

const title = "소셜 - 혹성의 아이";
const description = "혹성의 아이에 관한 소식을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export const runtime = "edge";

async function getPosts() {
  const API_LIST = process.env.API_URL + "guestbook/json";
  const API_KEY = process.env.API_KEY;
  const response = await fetch(API_LIST, {
    headers: {
      "X-API-Key": API_KEY,
    },
    "Cache-Control": "no-store, max-age=0",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default async function Guestbook() {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;

  const posts = await getPosts();
  return (
    <main className="px-6 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-4xl font-bold mb-4">소셜</h2>
      <SocialNav />
      <section className="w-full flex flex-col items-center gap-8">
        <GuestbookForm API_URL={API_URL} API_KEY={API_KEY} />
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
      </section>
    </main>
  );
}
