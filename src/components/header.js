"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";

function NewDot() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="fill-wisp-pink-500 size-2 absolute top-2/4 -translate-y-1/2 -left-[10px]"
    >
      <circle cx="8" cy="8" r="8" />
    </svg>
  );
}

export default function Header({ title, className, socialLastDate }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSocialVisited, setIsSocialVisited] = useState(new Date());
  const [isNew, setIsNew] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const date = new Date(localStorage.getItem("socialVisit"));
    setIsSocialVisited(date);
  }, [pathname]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const defaultClasses =
    "grid grid-cols-2 sm:flex sm:flex-row sm:justify-between sm:items-center py-8 text-lg px-6 md:px-8 lg:px-10 xl:px-12";

  const headerClasses = classNames(defaultClasses, className);
  return (
    <header className={headerClasses}>
      <Link href="/">
        <h1>
          <Image
            src="/images/logo.svg"
            alt="혹성의 아이"
            width={0}
            height={0}
            className="w-10"
          />
        </h1>
      </Link>
      <button
        className="relative ml-auto sm:hidden w-10 h-10 flex justify-center items-center"
        onClick={toggleNav}
        tabIndex={0}
      >
        <span className="sr-only">메뉴 바 열기</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className={`absolute transition-opacity top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 size-8 ${
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
          className={`absolute transition-opacity top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 size-8 ${
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
        className={`flex col-span-2 sm:row-span-1 sm:col-span-1 justify-center overflow-hidden transition-all ${
          isNavOpen ? "h-9" : "h-0 sm:h-8"
        }`}
      >
        <ul className="font-extrabold text-sm sm:text-lg px-0 sm:px-0 mt-4 sm:mt-0 flex flex-row w-full justify-around items-center sm:gap-x-6 sm:justify-between">
          <li className="hidden sm:list-item">
            <Link
              className="hover:text-sugar-cane-800 transition-colors"
              href="/"
              tabIndex={isNavOpen ? 0 : -1}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-sugar-cane-800 transition-colors"
              href="/merchandise"
              tabIndex={isNavOpen ? 0 : -1}
            >
              Merchandise
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-sugar-cane-800 transition-colors"
              href="/contents"
              tabIndex={isNavOpen ? 0 : -1}
            >
              Contents
            </Link>
          </li>
          <li>
            <Link
              className="relative hover:text-sugar-cane-800 transition-colors"
              href="/social"
              tabIndex={isNavOpen ? 0 : -1}
            >
              {" "}
              {pathname === "/social" ? null : socialLastDate >
                isSocialVisited ? (
                <NewDot />
              ) : null}
              Social
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
