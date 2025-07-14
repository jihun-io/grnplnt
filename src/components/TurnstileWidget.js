"use client";

import { useEffect, useRef } from "react";

export default function TurnstileWidget({ onTokenReceived, onError }) {
  const widgetRef = useRef(null);
  const widgetId = useRef(null);

  const renderTurnstile = () => {
    if (window.turnstile && widgetRef.current) {
      if (widgetId.current) {
        window.turnstile.remove(widgetId.current);
      }
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        size: "compact",
        callback: function (token) {
          console.log(`Challenge Success ${token}`);
          if (onTokenReceived) {
            onTokenReceived(token);
          }
        },
        'error-callback': function (error) {
          console.error('Turnstile error:', error);
          if (onError) {
            onError(error);
          }
        },
        'expired-callback': function () {
          console.log('Turnstile token expired');
          if (onTokenReceived) {
            onTokenReceived(null);
          }
        }
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
