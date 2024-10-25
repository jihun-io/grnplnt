import { generateMetadata } from "/utils/metadata";
import Image from "next/image";
import Merch from "@/components/merch";

const title = "상품 - 혹성의 아이";
const description = "혹성의 아이의 공식 상품을 만나 보세요.";

export const metadata = generateMetadata(title, description);

export default function privacy() {
  return (
    <main className="flex flex-col justify-center items-center capitalize px-8 text-3xl">
      <h2 className="sr-only">상품</h2>
      <Merch />
      <Image
        width={320}
        height={320}
        className="mb-32"
        src="/images/cs-text.svg"
        alt="Green Planet Merchandise Coming Soon"
      />
    </main>
  );
}
