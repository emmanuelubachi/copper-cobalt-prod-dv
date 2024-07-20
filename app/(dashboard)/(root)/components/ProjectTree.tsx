// not used
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { dataCsv } from "@/data/mapData";

const projects = [
  "Australian Projects",
  "Canadian Projects",
  "Chinese Projects",
  "Indian Projects",
  "Kazakhs Projects",
  "Swiss Projects",
];

const borderClasses = [
  "border-start-gray",
  "border-start-java",
  "border-start-carnation",
  "border-start-desert-sand",
  "border-start-pharlap",
  "border-start-neon-carrot",
];

const data = dataCsv.data;

const ProjectTree = () => {
  const [projectFilter, setProjectFilter] = useState<string[]>([]);

  console.log(projectFilter);

  const handleCheckboxChange = useCallback(
    (e: Event) => {
      const target = e.target as HTMLInputElement;
      const projectName = target.value;

      const handleProjectSelect = (project: string) => {
        setProjectFilter((prev) => [...prev, project]);
      };

      const handleProjectDeselect = (project: string) => {
        setProjectFilter((prev) => prev.filter((p) => p !== project));
      };

      if (target.checked) {
        handleProjectSelect(projectName);
      } else {
        handleProjectDeselect(projectName);
      }
    },
    [setProjectFilter],
  );

  useEffect(() => {
    const inputs = document.querySelectorAll('input[type="checkbox"]');
    inputs.forEach((input) => {
      input.addEventListener("change", handleCheckboxChange);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("change", handleCheckboxChange);
      });
    };
  }, [handleCheckboxChange]);

  return (
    <ul className="tree">
      {projects.map((project, index) => (
        <li key={project} className={borderClasses[index]}>
          <input type="checkbox" className="form-check-input rounder-0 p-2" />
          <label className="form-check-label">{project}</label>
          <ul>
            {data.map(
              (item, idx) =>
                item.nationality === project && (
                  <li key={idx}>
                    <input
                      type="checkbox"
                      value={item["project_name"]}
                      className="form-check-input rounder-0 p-2"
                    />
                    <label className="form-check-label">
                      {item["short_name"]}
                    </label>
                  </li>
                ),
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ProjectTree;
