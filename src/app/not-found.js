// App Router (src/app/not-found.js)
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/">홈으로 돌아가기</Link>
    </main>
  );
}
