"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import NewDot from "./NewDot";

export default function SocialButton({ data }) {
  const [isSocialVisited, setIsSocialVisited] = useState(new Date());

  useEffect(() => {
    const date = new Date(localStorage.getItem("socialVisit"));
    setIsSocialVisited(date);
  }, []);

  const socialLastDate = data
    .map((item) => new Date(item.date))
    .sort()
    .reverse()[0];

  return (
    <Link
      className="relative bg-sugar-cane-700 rounded-xl py-2 px-6 mt-5 font-bold text-sugar-cane-50 hover:bg-sugar-cane-800 transition-colors"
      href="./social"
    >
      {socialLastDate > isSocialVisited ? (
        <NewDot
          style={{
            position: "absolute",
            top: "-3px",
            // transform: "translateY(-50%)",
            left: "-3px",
            width: "1rem",
            height: "1rem",
          }}
        />
      ) : null}
      소셜
    </Link>
  );
}
