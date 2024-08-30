import { Suspense } from "react";

import ProjectPage from "./projectPage";
import { PageLoadingFallback } from "@/components/loading";

import { fetchData } from "@/lib/fetchData";
import IndustrialProjectsData from "@/data/projects/industrial_projects.json";

import { SearchParams } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const result = await fetchData(searchParams);

  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <ProjectPage
        searchParams={searchParams}
        {...result}
        projectsData={IndustrialProjectsData}
      />
    </Suspense>
  );
}
