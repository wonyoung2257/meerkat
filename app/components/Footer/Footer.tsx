import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex flex-col px-6 py-16 leading-snug text-gray-500 border-t border-zinc-200 max-md:px-5">
      <div className="flex gap-10 items-center self-start text-sm text-center">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/400b4ca8e168ca259d5a88197be7f1ca1c6102a7d1bb08afc21d96d88184216b?placeholderIfAbsent=true&apiKey=c782f79884a44197a4566a36aa7a1229"
          className="object-contain shrink-0 self-stretch my-auto aspect-[3.17] w-[108px]"
          alt="Footer logo"
        />
        <nav className="flex gap-6 items-start self-stretch my-auto min-w-[240px]">
          <a
            href="https://excessive-bread-42f.notion.site/105e7393675480abb1efd89a81053a71?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2.5 self-stretch px-2 py-1 font-medium"
          >
            서비스 이용 약관
          </a>
          <a
            href="https://excessive-bread-42f.notion.site/105e739367548025882ccc3fa3031c9e?pvs=74"
            target="_blank"
            rel="noopener noreferrer"
            className="gap-2.5 self-stretch px-2 py-1 font-bold"
          >
            개인정보 처리방침
          </a>
        </nav>
      </div>
      <p className="mt-4 text-xs font-medium">
        meerkat.foryou@gmail.com 서비스 탈퇴는 이메일로 문의 바랍니다.
      </p>
    </footer>
  );
};

export default Footer;
