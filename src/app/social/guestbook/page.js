import { generateMetadata } from "/utils/metadata";
import Link from "next/link";
import SocialNav from "@/components/social-nav";
import Button from "@/components/button";

const title = "소셜 - 혹성의 아이";
const description = "혹성의 아이에 관한 소식을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export const runtime = "edge";

async function getPosts() {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;
  const response = await fetch(API_URL, {
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
  const posts = await getPosts();
  return (
    <main className="px-6 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-4xl font-bold mb-4">소셜</h2>
      <SocialNav />

      <section className="w-full flex flex-col items-center gap-8">
        <form
          className="w-full md:px-16 flex flex-col items-center gap-4"
          action="/social/guestbook/submit"
          method="POST"
        >
          <fieldset className="w-full flex flex-row flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <legend className="sr-only">사용자 정보</legend>
            <label className="sr-only" htmlFor="user">
              이름
            </label>
            <input
              className="basis-6 flex-grow h-12 px-4 rounded-md shadow-md"
              type="text"
              id="user"
              name="user"
              placeholder="이름"
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
            />
          </fieldset>

          <label className="sr-only" htmlFor="content">
            내용
          </label>
          <textarea
            class="w-full p-4 rounded-md shadow-md"
            id="content"
            name="content"
            rows="7"
          ></textarea>
          <Button type="submit">작성</Button>
        </form>
        <ul className="w-11/12 flex flex-col gap-6 items-center">
          {posts.map(([title, date, content, id]) => (
            <li
              key={id}
              className="flex flex-col w-9/12 bg-white gap-8 px-6 py-8 rounded-lg shadow-md shadow-slate-100 bg-[#fff]"
              id={id}
            >
              <div className="flex flex-row items-center flex-wrap justify-between">
                <p className=" m-0 font-bold">{title}</p>
                <p className=" m-0 font-semibold">
                  <time>{date}</time>
                </p>
              </div>
              <p className="m-0  break-keep text-left">{content}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
