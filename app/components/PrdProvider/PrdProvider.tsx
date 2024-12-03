"use client";
import { PRD } from "@/app/_types/prd.type";
import { useQueryState } from "nuqs";
import { createContext, useContext, useState } from "react";

interface PrdContextType {
  prd: PRD[];
  filteredPrd: PRD[];
  // setFilteredPrd: (prd: PRD[]) => void;
  setPrd: (prd: PRD[]) => void;
  prdType: "received" | "sent";
  setPrdType: (type: "received" | "sent") => void;
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
  sendPrd: PRD[];
}
export const PrdContext = createContext<PrdContextType>({
  prd: [],
  filteredPrd: [],
  // setFilteredPrd: () => {},
  setPrd: () => {},
  prdType: "received",
  setPrdType: () => {},
  searchKeyword: "",
  setSearchKeyword: () => {},
  sendPrd: [],
});

export const usePrd = () => {
  return useContext(PrdContext);
};

export const PrdProvider = ({
  children,
  projects,
  sendPrd,
}: {
  children: React.ReactNode;
  projects: PRD[];
  sendPrd: PRD[];
}) => {
  const [selectedTab] = useQueryState("tab", { defaultValue: "all" });
  const [prd, setPrd] = useState(projects);
  const [prdType, setPrdType] = useState<"received" | "sent">("received");
  const [searchKeyword, setSearchKeyword] = useState("");

  const selectedPrd = prdType === "received" ? prd : sendPrd;

  const filteredPrd = selectedPrd
    .filter((project) =>
      project.title.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter((project) => {
      if (selectedTab === "all") return true;
      if (selectedTab === "checked")
        return project.checked && !project.completed;
      if (selectedTab === "completed") return project.completed;
      return false;
    });

  return (
    <PrdContext.Provider
      value={{
        prd,
        setPrd,
        prdType,
        setPrdType,
        searchKeyword,
        setSearchKeyword,
        filteredPrd,
        sendPrd,
      }}
    >
      {children}
    </PrdContext.Provider>
  );
};
