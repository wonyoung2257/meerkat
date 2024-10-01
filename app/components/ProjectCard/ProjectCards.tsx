"use client";
import { PRD } from "@/app/_types/prd.type";
import ProjectCard from "./ProjectCard";
import { useQueryState } from "nuqs";

type Project = PRD;

export const ProjectCards = ({ projects }: { projects: Project[] }) => {
  const [selectedTab] = useQueryState("tab");
  const filteredProjects = projects.filter((project) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "before") return !project.checked;
    if (selectedTab === "completed") return project.complated;
    return false;
  });

  return (
    <div className="flex flex-wrap gap-8 items-center mt-8 w-full max-md:max-w-full">
      {filteredProjects.map((project: Project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
};
