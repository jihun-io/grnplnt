"use client";

import Image from "next/image";
import { useState } from "react";

export default function Header({ title }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="flex-row">
      <a className="title flex-row" href="/">
        <Image
          className="logo"
          src="/images/logo.svg"
          alt=""
          width={40}
          height={40}
        />
        <h1>{title}</h1>
      </a>
      <nav className="flex-row">
        <button
          id="nav-toggle"
          className={`flex-center ${isNavOpen ? "open" : "close"}`}
          onClick={toggleNav}
        >
          <Image
            src="/images/chevron-right.svg"
            alt="메뉴"
            width={16}
            height={28}
          />
        </button>
        <ul className={isNavOpen ? "open" : "close"}>
          <li>
            <a href="/social">소셜</a>
          </li>
          <li>
            <a href="/videos">영상</a>
          </li>
          <li>
            <a href="/downloads">다운로드</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
