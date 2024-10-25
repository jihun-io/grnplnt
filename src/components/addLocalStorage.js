"use client";

// /social 페이지에 접속한 현재의 날짜와 시간을 LocalStorage에 저장하는 컴포넌트

import React from "react";
import { useEffect } from "react";

export default function AddLocalStorage() {
  useEffect(() => {
    localStorage.setItem("socialVisit", new Date().toString());
  }, []);

  return <></>;
}
