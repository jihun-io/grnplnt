"use client";

import { useEffect, useRef } from "react";

export default function TurnstileWidget() {
  const widgetRef = useRef(null);
  const widgetId = useRef(null);

  const renderTurnstile = () => {
    if (window.turnstile && widgetRef.current) {
      if (widgetId.current) {
        window.turnstile.remove(widgetId.current);
      }
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: "0x4AAAAAAAh5X07CUer4bS3L",
        callback: function (token) {
          console.log(`Challenge Success ${token}`);
        },
      });
    }
  };

  useEffect(() => {
    renderTurnstile();

    const handleGuestbookUpdated = () => {
      setTimeout(renderTurnstile, 500);
    };

    window.addEventListener("guestbookUpdated", handleGuestbookUpdated);

    return () => {
      window.removeEventListener("guestbookUpdated", handleGuestbookUpdated);
      if (widgetId.current) {
        window.turnstile.remove(widgetId.current);
      }
    };
  }, []);

  return <div ref={widgetRef} />;
}
