// App Router (src/app/not-found.js)
import Link from "next/link";
import { generateMetadata } from "/utils/metadata";

const title = "404 - 혹성의 아이";
const description = "요청하신 페이지를 찾을 수 없습니다.";

export const metadata = generateMetadata(title, description);

export default function NotFound() {
  return (
    <main>
      <h2>404 - 페이지를 찾을 수 없습니다</h2>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/">홈으로 돌아가기</Link>
    </main>
  );
}
