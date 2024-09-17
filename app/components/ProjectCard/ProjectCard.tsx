import { PRD } from "@/app/_types/prd.type";
import Link from "next/link";
import React from "react";

const ProjectCard: React.FC<PRD> = ({
  send_at,
  receiver,
  message,
  prd_url,
  checked,
  complated,
}) => {
  const cardClass = complated
    ? "bg-slate-100"
    : "bg-white border border-solid border-slate-200";
  const statusClass = complated
    ? "bg-slate-200 text-neutral-500"
    : "text-rose-500 bg-rose-50";

  return (
    <Link
      href={prd_url}
      target="_blank"
      className={`flex flex-col grow shrink justify-between self-stretch p-6 my-auto rounded-2xl min-h-[200px] min-w-[240px] shadow-[0px_4px_10px_rgba(0,0,0,0.06)] w-[297px] max-md:px-5 max-w-[370px] cursor-pointer ${cardClass}`}
    >
      <article>
        <div className="flex gap-10 justify-between items-start w-full">
          <div className="flex flex-col whitespace-nowrap w-[75px]">
            <time className="text-sm font-medium text-gray-400">
              {send_at.toLocaleDateString("ko-KR")}
            </time>
            <div className="mt-1.5 text-base font-semibold text-neutral-700">
              {receiver}
            </div>
          </div>
          {!checked && (
            <div
              className={`h-[26px] gap-2.5 self-stretch px-2 py-1 text-sm font-semibold rounded-md ${statusClass}`}
            >
              확인전
            </div>
          )}
          {complated && (
            <div
              className={`h-[26px] gap-2.5 self-stretch px-2 py-1 text-sm font-semibold rounded-md ${statusClass}`}
            >
              제작완료
            </div>
          )}
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-neutral-900">
          여긴 뭐가 들어가지
        </h3>
        <p className="mt-6 text-sm font-medium text-neutral-500">{message}</p>
      </article>
    </Link>
  );
};

export default ProjectCard;
