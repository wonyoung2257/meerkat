"use client";
import { PRD } from "@/app/_types/prd.type";
import { useQueryState } from "nuqs";
import { getClientSideClient } from "@/app/utils/supabase/client";
import { PrdCard } from "../PrdCard/PrdCard";
import { usePrd } from "../PrdProvider/PrdProvider";

type Project = PRD;

export const ReceivedPrdCards = ({ userId }: { userId: string }) => {
  const [selectedTab] = useQueryState("tab", { defaultValue: "all" });
  const supabase = getClientSideClient();
  const { filteredPrd, setPrd } = usePrd();

  const handleUpdateProject = async () => {
    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      const { data: projects, error: projectsError } = await supabase
        .from("prd")
        .select("*")
        .eq("receiver", user.user?.email)
        .order("send_at", { ascending: false });

      if (projectsError) {
        throw projectsError;
      }
      if (userError) {
        throw userError;
      }
      setPrd(projects as Project[]);
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-8 items-center mt-8 w-full max-md:max-w-full">
      {filteredPrd.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full py-10">
          <p>
            {selectedTab === "completed"
              ? "아직 제작을 완료한 기획서가 없네요!"
              : "아직 기획서가 없네요!"}
          </p>
        </div>
      ) : (
        filteredPrd.map((project: Project) => (
          <PrdCard
            key={project.id}
            {...project}
            userId={userId}
            handleUpdateProject={handleUpdateProject}
          />
        ))
      )}
    </div>
  );
};
