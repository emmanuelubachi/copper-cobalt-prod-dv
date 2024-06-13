import * as React from "react";

import { fetchData } from "@/lib/fetchData";
import ProjectPage from "./projectPage";

import { SearchParams } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const result = await fetchData(searchParams);

  return <ProjectPage searchParams={searchParams} {...result} />;
}
