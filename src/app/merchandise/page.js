import { generateMetadata } from "/utils/metadata";

const title = "상품 - 혹성의 아이";
const description = "혹성의 아이의 공식 상품을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export default function privacy() {
  return (
    <main className="flex flex-col justify-center items-center capitalize futura text-3xl">
      <p>Green Planet Merchandise</p> <p>Coming Soon</p>
    </main>
  );
}
