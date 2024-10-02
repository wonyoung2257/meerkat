"use client";
import { PRD } from "@/app/_types/prd.type";
import { getClientSideClient } from "@/app/utils/supabase/client";
import React, { useState } from "react";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

type ProjectCardProps = PRD & {
  handleUpdateProject: () => void;
};
const ProjectCard = ({
  id,
  send_at,
  sender,
  message,
  prd_url,
  checked,
  complated,
  handleUpdateProject,
}: ProjectCardProps) => {
  const [isHover, setIsHover] = useState(false);

  const supabase = getClientSideClient();
  const cardClass = complated
    ? "bg-slate-100"
    : "bg-white border border-solid border-slate-200";
  const statusClass = complated
    ? "bg-slate-200 text-neutral-500"
    : "text-rose-500 bg-rose-50";

  const handleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLButtonElement) return;
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("prd")
        .update({ checked: true })
        .eq("id", id);

      await handleUpdateProject();

      if (error) {
        throw error;
      }
      console.log(data);
      window.open(prd_url, "_blank");
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log("버튼 클릭");
    try {
      const { data, error } = await supabase
        .from("prd")
        .update({ complated: !complated })
        .eq("id", id);

      if (error) {
        throw error;
      }
      console.log(data);
      await handleUpdateProject();
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClick}
      className={`flex flex-col grow shrink justify-between self-stretch p-6 my-auto rounded-2xl min-h-[200px] min-w-[240px] shadow-[0px_4px_10px_rgba(0,0,0,0.06)] w-[297px] max-md:px-5 max-w-[370px] cursor-pointer ${cardClass}`}
    >
      <article>
        <div className="flex gap-10 justify-between items-start w-full">
          <div className="flex flex-col whitespace-nowrap w-[75px]">
            <time className="text-sm font-medium text-gray-400">
              {new Date(send_at).toLocaleDateString("ko-KR")}
            </time>
            <div className="mt-1.5 text-base font-semibold text-neutral-700">
              {sender}
            </div>
          </div>
          {!checked && (
            <div
              className={`h-[26px] gap-2.5 self-stretch px-2 py-1 text-sm font-semibold rounded-md ${statusClass}`}
            >
              확인전
            </div>
          )}
          {!complated && isHover && (
            <button
              onClick={handleButtonClick}
              className={`h-[26px] gap-1 self-stretch px-2 py-1 text-sm font-semibold rounded-md bg-slate-200 text-neutral-500 flex items-center`}
            >
              <CheckIcon className="w-4 h-4 text-[#5F666B]" /> 제작 완료함
            </button>
          )}
          {complated && !isHover && (
            <div
              className={`h-[26px] gap-2.5 self-stretch px-2 py-1 text-sm font-semibold rounded-md ${statusClass}`}
            >
              제작 완료
            </div>
          )}
          {complated && isHover && (
            <button
              onClick={handleButtonClick}
              className={`h-[26px] gap-1 self-stretch px-2 py-1 text-sm font-semibold rounded-md ${statusClass} flex items-center`}
            >
              제작 완료 취소 <Cross2Icon className="w-4 h-4 text-[#5F666B]" />
            </button>
          )}
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-neutral-900">
          여긴 뭐가 들어가지
        </h3>
        <p className="mt-6 text-sm font-medium text-neutral-500">{message}</p>
      </article>
    </div>
  );
};

export default ProjectCard;
