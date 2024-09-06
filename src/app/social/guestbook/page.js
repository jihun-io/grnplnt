import { generateMetadata } from "/utils/metadata";
import Link from "next/link";
import dynamic from "next/dynamic";

import SocialNav from "@/components/social-nav";
import Button from "@/components/button";
// import GuestbookForm from "@/components/guestbook-form";
// import Modal from "@/components/modify-modal";
const Modal = dynamic(() => import("@/components/modify-modal"), {
  ssr: false,
});

const GuestbookForm = dynamic(() => import("@/components/guestbook-form"), {
  ssr: false,
});

const GuestbookList = dynamic(() => import("@/components/guestbook-list"), {
  ssr: false,
});

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
        <GuestbookList API_URL={API_URL} API_KEY={API_KEY} />
      </section>
    </main>
  );
}
