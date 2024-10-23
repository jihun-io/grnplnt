import { generateMetadata } from "/utils/metadata";
import Image from "next/image";

const title = "상품 - 혹성의 아이";
const description = "혹성의 아이의 공식 상품을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export default function privacy() {
  return (
    <main className="flex flex-col justify-center items-center capitalize futura text-3xl">
      <p className="sr-only">Green Planet Merchandise Coming Soon</p>
      <Image width={320} height={320} src="/images/cs-text.svg" />
    </main>
  );
}
