"use client";
import { login } from "@/app/actions/login/actions";
import React from "react";

const LoginButton = () => {
  const handleLogin = async () => {
    try {
      await login();
      if (typeof window.gtag === "function") {
        window.gtag("event", "login", {
          method: "Email", // 로그인 방법에 따라 변경 가능
        });
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };
  return (
    <button
      onClick={handleLogin}
      className="flex overflow-hidden gap-2 justify-center items-center p-4 mt-4 w-full text-base font-semibold leading-loose bg-white rounded-xl border border-solid border-zinc-200 min-w-[100px] text-zinc-800"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7e3b11cb4008375f7c6d288ee9ee2e511ec90c1c2a64ad02dab9a980d5ab34f0?placeholderIfAbsent=true&apiKey=c782f79884a44197a4566a36aa7a1229"
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
      />
      <span className="self-stretch my-auto">구글 계정으로 시작하기</span>
    </button>
  );
};

export default LoginButton;
