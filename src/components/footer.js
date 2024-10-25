import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col text-[0.7rem] gap-y-[0.125rem] pt-16 pb-8 px-6 md:px-8 lg:px-10 xl:px-12">
      <div className="flex flex-row gap-x-2 flex-wrap">
        <p>Copyright © 2024 Jun Park. All rights reserved.</p>
        <ul className="flex flex-row gap-x-2">
          <li>
            <Link href="/privacy-policy" className="font-bold">
              개인정보 처리방침
            </Link>
          </li>
          <li>
            <Link href="/terms-and-conditions" className="">
              웹 사이트 이용 약관
            </Link>
          </li>
        </ul>
      </div>
      <ul className="flex flex-row gap-x-2 flex-wrap">
        <li className="font-bold inline-flex">
          <Image
            src="/images/logo.svg"
            width={12}
            height={12}
            className="mr-1"
          />
          혹성의 아이
        </li>
        <li>
          <span className="font-bold">대표: </span>박 준
        </li>
        <li>
          <span className="font-bold">개인정보관리책임자: </span>김지훈
        </li>
        <li>
          <span className="font-bold">이메일: </span>
          <Link href="mailto:greenplanet1415@gmail.com">
            greenplanet1415@gmail.com
          </Link>
        </li>
      </ul>
    </footer>
  );
}
