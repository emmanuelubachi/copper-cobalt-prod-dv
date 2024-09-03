import React, { useState } from "react";

import { ProjectInfo } from "@/types";

/**
 * Component to display a project comparison view.
 *
 * @param {ProjectInfo} projectInfo - Project data to display.
 * @returns {JSX.Element} - The project comparison view.
 */
export default function ProjectComparison({
  projectInfo,
}: {
  projectInfo: ProjectInfo;
}) {
  const [selectedYear, setSelectedYear] = useState<string>("2022");

  return (
    <section className="space-y-4">
      {/* <div className="left-0 right-0 z-20 items-center justify-between gap-6 space-y-4 bg-background/50 py-4 backdrop-blur-md dark:bg-neutral-900/50 lg:sticky lg:top-0 lg:flex lg:space-y-0">
        <h2 className="text-center text-h5 font-medium tracking-tight lg:text-start">
          {projectInfo.project_name}
        </h2>
        <div className="flex items-center justify-center sm:items-start lg:justify-end">
          <YearToggle
            defaultValue={selectedYear}
            onChangeFunction={setSelectedYear}
            years={Years}
          />
        </div>
      </div> */}
    </section>
  );
}
