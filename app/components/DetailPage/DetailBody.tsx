"use client";

import { PRD } from "@/app/_types/prd.type";
import { ProjectCards } from "../ProjectCard/ProjectCards";
import TabNavigation from "../TabNavigation/TabNavigation";
import { useState } from "react";

export const DetailBody = ({
  userId,
  projects,
}: {
  userId: string;
  projects: PRD[];
}) => {
  const [search, setSearch] = useState("");

  return (
    <section className="flex relative flex-col w-full leading-snug max-md:mt-10 max-md:max-w-full">
      <div className="flex items-center justify-between mb-10">
        {/* 제목 */}
        <h2 className="text-3xl font-semibold text-neutral-900">
          내가 받은 기획서
        </h2>

        {/* 검색바 */}
        <div className="flex items-center">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="제목 키워드로 검색해 보세요."
              className="w-[300px] px-4 py-2 pr-10 bg-white border rounded-full focus:outline-none focus:ring-1 focus:ring-gray-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="#666666"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* TabNavigation 및 ProjectCards */}
      <div className="flex z-0 flex-col mt-10 w-full max-md:max-w-full">
        <TabNavigation userId={userId} />
        <ProjectCards projects={projects} userId={userId} search={search} />
      </div>
    </section>
  );
};
