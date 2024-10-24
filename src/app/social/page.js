import styles from "@/styles/privacy.module.css";
import { generateMetadata } from "/utils/metadata";
import SocialNav from "@/components/social-nav";
import Link from "next/link";

const title = "소셜 - 혹성의 아이";
const description = "혹성의 아이에 관한 소식을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export default function social() {
  return (
    <main className="px-6 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-bold mb-4">소셜</h2>
      <SocialNav />
      <section>
        <h2 className="sr-only">공지사항</h2>
        <ul>
          <li className="mb-4">
            <h3 className="text-2xl font-bold">Lorem ipsum dolor sit.</h3>
            <time>2021년 3월 25일</time>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              impedit minus obcaecati sapiente odio animi quod officia assumenda
              similique labore?
            </p>
          </li>
          <li className="mb-4">
            <h3 className="text-2xl font-bold">Lorem ipsum dolor sit.</h3>
            <time>2021년 3월 25일</time>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              impedit minus obcaecati sapiente odio animi quod officia assumenda
              similique labore?
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
