import React, { useState } from "react";
import { UserInfo } from "./UserInfo";
import { getClientSideClient } from "@/app/utils/supabase/client";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { PRD } from "@/app/_types/prd.type";
import { logDashboardPrdClick } from "@/app/logic/logFunctions";

type PrdCardProps = PRD & {
  handleUpdateProject: () => void;
  userId: string;
};

export function PrdCard({
  id,
  sender,
  title,
  prd_url,
  checked,
  completed,
  eta,
  handleUpdateProject,
  userId,
}: PrdCardProps) {
  const [isHover, setIsHover] = useState(false);

  const supabase = getClientSideClient();
  const cardClass = completed
    ? "bg-slate-100 opacity-60"
    : "bg-white border border-solid border-slate-200";
  const statusClass = completed
    ? "bg-slate-200 text-neutral-500"
    : "text-rose-500 bg-rose-50";

  const prdClickLog = ({
    prd_id,
    user_id,
    prd_status,
  }: {
    prd_id: number;
    user_id: string;
    prd_status: string;
  }) => {
    logDashboardPrdClick(user_id, prd_id, prd_status);
  };

  const handleClickCheck = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLButtonElement) return;
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("prd")
        .update({ checked: true })
        .eq("id", id);

      await handleUpdateProject();

      if (error) {
        throw error;
      }

      window.open(prd_url, "_blank");
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    prdClickLog({
      prd_id: id,
      user_id: userId,
      prd_status: completed ? "completed_cancel" : "completed",
    });

    if (
      !confirm(
        completed
          ? "이 문서를 제작 완료되지 않은 상태로 변경할까요?"
          : "이 문서를 제작 완료 상태로 변경할까요?"
      )
    )
      return;

    e.stopPropagation();

    try {
      const { data, error } = await supabase
        .from("prd")
        .update({ completed: !completed })
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
    <article
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClickCheck}
      className={`flex flex-col grow shrink justify-between self-stretch p-6 my-auto rounded-2xl min-h-[200px] min-w-[240px] max-h-[200px] shadow-[0px_4px_10px_rgba(0,0,0,0.06)] w-[297px] max-md:px-5 max-w-[370px] cursor-pointer ${cardClass}`}
    >
      <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
      <div className="flex gap-10 justify-between items-end w-full">
        <UserInfo sender={sender} eta={eta} />
        <div>
          {!checked && (
            <div
              className={`h-[26px] gap-2.5 self-stretch px-2 py-1 text-sm font-semibold rounded-md ${statusClass}`}
            >
              확인 안함
            </div>
          )}
          {checked && !isHover && !completed && (
            <div
              className={`h-[26px] gap-2.5 self-stretch px-2 py-1 text-sm font-semibold rounded-md bg-slate-200 text-neutral-500`}
            >
              확인 완료
            </div>
          )}
          {checked && isHover && !completed && (
            <button
              onClick={handleButtonClick}
              className={`h-[26px] gap-1 self-stretch px-2 py-1 text-sm font-semibold rounded-md bg-slate-200 text-neutral-500 flex items-center`}
            >
              <CheckIcon className="w-4 h-4 text-[#5F666B]" /> 제작 완료
            </button>
          )}
          {completed && !isHover && (
            <button
              onClick={handleButtonClick}
              className={`h-[26px] gap-1 self-stretch px-2 py-1 text-sm font-semibold rounded-md bg-slate-200 text-neutral-500 flex items-center`}
            >
              <CheckIcon className="w-4 h-4 text-[#5F666B]" /> 제작 완료
            </button>
          )}
          {completed && isHover && (
            <button
              onClick={handleButtonClick}
              className={`h-[26px] gap-1 self-stretch px-2 py-1 text-sm font-semibold rounded-md ${statusClass} flex items-center`}
            >
              제작 완료 취소 <Cross2Icon className="w-4 h-4 text-[#5F666B]" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
