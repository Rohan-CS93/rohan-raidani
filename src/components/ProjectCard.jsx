import React, { useEffect } from 'react';
import { useAtom } from "jotai";
import { currentProjectAtom, getProjectsByDomain } from "./Projects";

export const ProjectCard = ({ domain }) => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const projects = getProjectsByDomain(domain);

  // Reset currentProject when domain changes
  useEffect(() => {
    setCurrentProject(0);
  }, [domain, setCurrentProject]);

  const nextProject = () => {
    setCurrentProject((current) => (current + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((current) => 
      current === 0 ? projects.length - 1 : current - 1
    );
  };

  return (
    <div className="flex w-full h-full gap-8 items-center justify-center">
      <button
        className="hover:text-indigo-600 transition-colors"
        onClick={previousProject}
      >
        ← Previous
      </button>
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold">Projects & Certificates</h2>
        <p className="text-sm mt-2">
          {currentProject + 1} / {projects.length}
        </p>
      </div>
      <button
        className="hover:text-indigo-600 transition-colors"
        onClick={nextProject}
      >
        Next →
      </button>
    </div>
  );
};