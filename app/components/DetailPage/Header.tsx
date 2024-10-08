import React from "react";
import { Logo } from "@/app/components/Logo.svg";

const Header: React.FC = () => {
  return (
    <header className="overflow-hidden gap-2.5 self-stretch px-36 py-4 text-left text-2xl font-extrabold leading-snug whitespace-nowrap border-b border-zinc-200 text-neutral-900 max-md:px-5">
      <Logo />
    </header>
  );
};

export default Header;
