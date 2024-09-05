"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Header({ title }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <header className="grid grid-cols-2 sm:flex sm:flex-row sm:justify-between sm:items-center py-8 text-2xl px-6 md:px-8 lg:px-10 xl:px-12">
      <h1 className="sr-only">혹성의 아이</h1>
      <Link href="/">
        <img src="/images/logo.svg" alt="혹성의 아이" className="w-10" />
      </Link>
      <button className="relative ml-auto sm:hidden" onClick={toggleNav}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className={`absolute transition-opacity top-0 right-0 size-10 ${
            isNavOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className={`absolute transition-opacity top-0 right-0 size-10 ${
            isNavOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
        <p className="sr-only">메뉴</p>
      </button>
      <nav
        className={`flex col-span-2 sm:row-span-1 sm:col-span-1 sm:w-96 justify-center overflow-hidden transition-all ${
          isNavOpen ? "h-8" : "h-0 sm:h-8"
        }`}
      >
        <ul className="px-5 sm:px-0 mt-4 sm:mt-0 flex flex-row w-full justify-around items-center sm:gap-x-6 sm:justify-between font-[900]">
          <li>
            <Link
              className="hover:text-sugar-cane-800 transition-colors"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-sugar-cane-800 transition-colors"
              href="/merchandise"
            >
              Merchandise
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-sugar-cane-800 transition-colors"
              href="/social"
            >
              Social
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
