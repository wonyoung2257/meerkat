"use client";
import { useQueryState } from "nuqs";

const TAB_STATE = {
  ALL: "all",
  BEFORE: "before",
  CHECKED: "checked",
  COMPLETED: "completed",
} as const;

const TabNavigation = () => {
  const [selectedTab, setSelectedTab] = useQueryState("tab", {
    defaultValue: TAB_STATE.ALL,
  });

  return (
    <nav className="flex overflow-hidden flex-wrap items-center w-full text-lg font-semibold text-center text-gray-500 border-b border-zinc-200 max-md:max-w-full">
      <button
        onClick={() => setSelectedTab(TAB_STATE.ALL)}
        className={`flex-1 shrink gap-0.5 self-stretch p-4 my-auto whitespace-nowrap bg-white min-w-[240px] text-neutral-900 ${
          selectedTab === TAB_STATE.ALL ? "border-b-2 border-zinc-900" : ""
        }`}
      >
        전체
      </button>
      <button
        onClick={() => setSelectedTab(TAB_STATE.CHECKED)}
        className={`flex flex-1 shrink gap-0.5 justify-center items-start self-stretch p-4 my-auto bg-white basis-0 min-w-[240px] ${
          selectedTab === TAB_STATE.CHECKED ? "border-b-2 border-zinc-900" : ""
        }`}
      >
        <span>확인 완료</span>
        {/* <span className="flex shrink-0 w-1.5 h-1.5 bg-rose-500 rounded-[99px]" /> */}
      </button>
      <button
        onClick={() => setSelectedTab(TAB_STATE.COMPLETED)}
        className={`flex-1 shrink gap-0.5 self-stretch p-4 my-auto whitespace-nowrap bg-white min-w-[240px] ${
          selectedTab === TAB_STATE.COMPLETED
            ? "border-b-2 border-zinc-900"
            : ""
        }`}
      >
        제작완료
      </button>
    </nav>
  );
};

export default TabNavigation;
