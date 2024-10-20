"use client";
import { PRD } from "@/app/_types/prd.type";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { getClientSideClient } from "@/app/utils/supabase/client";
import { PrdCard } from "../PrdCard/PrdCard";

type Project = PRD;

export const ProjectCards = ({
  projects: serverProjects,
  userId,
}: {
  projects: Project[];
  userId: string;
}) => {
  const supabase = getClientSideClient();

  const [projects, setProjects] = useState(serverProjects);

  const [selectedTab] = useQueryState("tab", { defaultValue: "all" });
  const filteredProjects = projects.filter((project) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "checked") return project.checked && !project.completed;
    if (selectedTab === "completed") return project.completed;
    return false;
  });

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

      setProjects(projects as Project[]);
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  return (
    <div className="flex flex-wrap gap-8 items-center mt-8 w-full max-md:max-w-full">
      {filteredProjects.length === 0 ? (
        <div className="flex justify-center items-center w-full h-full py-10">
          <p>
            {selectedTab === "completed"
              ? "아직 제작을 완료한 기획서가 없네요!"
              : "아직 기획서가 없네요!"}
          </p>
        </div>
      ) : (
        filteredProjects.map((project: Project) => (
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
