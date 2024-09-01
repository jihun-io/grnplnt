"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Header({ title }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className={`flex-row ${isNavOpen ? "open" : "close"}`}>
      <div className="title-row flex-row flex-center">
        <Link className="title flex-row flex-center" href="/">
          <Image
            className="logo"
            src="/images/logo.svg"
            alt=""
            width={40}
            height={40}
          />
          <h1>{title}</h1>
        </Link>
        <button id="nav-toggle-col" className="flex-center" onClick={toggleNav}>
          <Image
            src="/images/hamburger.svg"
            alt="메뉴"
            width={26}
            height={26}
          />
        </button>
      </div>
      <nav className="flex-row">
        <button id="nav-toggle-row" className="flex-center" onClick={toggleNav}>
          <Image
            src="/images/chevron-right.svg"
            alt="메뉴"
            width={16}
            height={28}
          />
        </button>
        <ul>
          <li>
            <Link href="/social">소셜</Link>
          </li>
          <li>
            <Link href="/videos">영상</Link>
          </li>
          <li>
            <Link href="/downloads">다운로드</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
