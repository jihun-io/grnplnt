"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SocialNav = () => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const getLinkClassName = (path) => {
    const baseClasses =
      "border-solid border-2 border-sugar-cane-700 rounded-xl py-2 px-6 font-bold transition-all duration-300";
    const activeClasses = "bg-sugar-cane-700 text-sugar-cane-50";
    const inactiveClasses =
      "bg-sugar-cane-50 text-sugar-cane-950 hover:bg-sugar-cane-200";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="mb-8">
      <ul className="flex flex-row items-center justify-around text-xl">
        <li>
          <Link href="/social" className={getLinkClassName("/social")}>
            공지사항
          </Link>
        </li>
        <li>
          <Link
            href="/social/guestbook"
            className={getLinkClassName("/social/guestbook")}
          >
            방명록
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SocialNav;
