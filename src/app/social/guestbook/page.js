import { generateMetadata } from "/utils/metadata";
import dynamic from "next/dynamic";

import SocialNav from "@/components/social-nav";

import GuestbookForm from "@/components/guestbook-form";
import GuestbookList from "@/components/guestbook-list";
// const GuestbookForm = dynamic(() => import("@/components/guestbook-form"), {
//   ssr: false,
// });

// const GuestbookList = dynamic(() => import("@/components/guestbook-list"), {
//   ssr: false,
// });

const title = "소셜 - 혹성의 아이";
const description = "혹성의 아이에 관한 소식을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export const runtime = "edge";

export default async function Guestbook() {
  // const posts = await getPosts();
  // console.log(posts);
  return (
    <main className="px-6 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-4xl font-bold mb-4">소셜</h2>
      <SocialNav />
      <section className="w-full flex flex-col items-center gap-8">
        <GuestbookForm />
        <GuestbookList />
      </section>
    </main>
  );
}
