import React from "react";
import TipBox from "./TipBox";
import LoginButton from "./LoginButton";
import PrivacyNotice from "./PrivacyNotice";

const LoginPage: React.FC = () => {

  return (
    <main className="flex flex-col text-center max-w-[500px] ">
      <section className="flex flex-col items-center p-10 w-full bg-white rounded-3xl shadow-[0px_2px_8px_rgba(0,0,0,0.05)] max-md:px-5 max-md:max-w-full gap-10">
        <header className="flex flex-col items-center leading-snug">
          <h1 className="text-lg font-extrabold text-neutral-900">meerkat</h1>
          <p className="mt-3 text-sm font-semibold text-gray-500">
            행복한 협업을 만들어요
          </p>
        </header>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/506157c4c57b0cdb2e0e5f8bee6ae01414680013b1802ddc1e4b109944fb3303?placeholderIfAbsent=true&apiKey=c782f79884a44197a4566a36aa7a1229"
          alt="Meerkat logo"
          className="object-contain w-20 rounded-xl aspect-square"
        />
        <h2 className="text-xl font-semibold leading-8 text-zinc-900">
          반가워! 공유받은 기획서를 <br /> 확인하려면 로그인 해줘
        </h2>
        <div className="flex flex-col self-stretch w-full">
          <TipBox />
          <LoginButton />
          <PrivacyNotice />
        </div>
      </section>
      <a
        href="https://forms.gle/VYVAd6T3Y1YGd5EHA"
        target="_blank"
        rel="noopener noreferrer"
        className="gap-2.5 self-center px-2 py-1 mt-6 text-sm font-medium leading-relaxed text-neutral-500 cursor-pointer"
      >
        로그인 문의하기
      </a>
    </main>
  );
};

export default LoginPage;
