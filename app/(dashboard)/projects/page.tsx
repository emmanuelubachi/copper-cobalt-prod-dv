import { Suspense } from "react";
import Papa from "papaparse";

import ProjectPage from "./projectPage";
import { PageLoadingFallback } from "@/components/loading";

import { fetchData } from "@/lib/fetchData";
import { readCsvFile } from "@/lib/readFiles";
import IndustrialProjectsData from "@/data/projects/industrial_projects.json";

import { SearchParams } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const result = await fetchData(searchParams);
  // const csvData = readCsvFile("data/map/industrial_projects.csv");

  // // Convert CSV to JSON using PapaParse
  // const jsonData = Papa.parse(csvData, {
  //   header: true,
  //   skipEmptyLines: true,
  //   dynamicTyping: true,
  // }).data;

  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <ProjectPage
        searchParams={searchParams}
        {...result}
        jsonData={IndustrialProjectsData}
      />
    </Suspense>
  );
}
