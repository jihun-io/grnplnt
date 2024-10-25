import { generateMetadata } from "/utils/metadata";
import SocialNav from "@/components/SocialNav";
import AddLocalStorage from "@/components/addLocalStorage";

const title = "소셜 - 혹성의 아이";
const description = "혹성의 아이에 관한 소식을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export const data = [
  {
    id: 1,
    title: "혹성의 아이 홈페이지 개편",
    date: "2024-10-25",
    content:
      "혹성의 아이 영화와 상품의 공개를 앞두고 홈페이지를 새롭게 개편했습니다! 앞으로 새로운 콘텐츠가 업데이트될 예정이니, 많은 관심 부탁드립니다.",
  },
];

export default function Social() {
  return (
    <main className="px-6 md:px-8 lg:px-10 xl:px-12">
      <h2 className="text-3xl font-bold mb-4">소셜</h2>
      <SocialNav />
      <AddLocalStorage />
      <section>
        <h2 className="sr-only">공지사항</h2>
        <ul>
          {data
            .sort((a, b) => b.id - a.id)
            .map((item) => (
              <li key={item.id} className="mb-6">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className=" mb-3">
                  <time>{new Date(item.date).toLocaleDateString("ko-KR")}</time>
                </p>
                <p>{item.content}</p>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
