"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

window.onloadTurnstileCallback = function () {
  turnstile.render("#turnstile-widget", {
    sitekey: "0x4AAAAAAAh5X07CUer4bS3L",
    callback: function (token) {
      // console.log(`Challenge Success ${token}`);
    },
  });
};

export default function TurnstileWidget() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleGuestbookUpdated = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      setTimeout(() => {
        onloadTurnstileCallback();
        router.push;
      }, 1000);
    };

    window.addEventListener("guestbookUpdated", handleGuestbookUpdated);

    return () => {
      window.removeEventListener("guestbookUpdated", handleGuestbookUpdated);
    };
  }, [setIsLoading]);

  return <>{!isLoading && <div id="turnstile-widget"></div>}</>;
}
