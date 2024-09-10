"use client";
import React from "react";
import { useRouter } from "next/navigation";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/custom-tabs";
import { GitCompareArrows, ShipIcon } from "lucide-react";
import { ShareButton } from "@/components/elements/shareButton";
import { ProjectDataProps } from "@/types/projects";
import Projects from "./projects";
import ExportFlow from "@/components/elements/export-flow";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

import { usePathname, useSearchParams } from "next/navigation";
import SearchBarDialog from "@/components/elements/searchBar";
import { CompaniesList } from "@/constants/application";

export default function MainPage({
  projectInfo,
  projectData,
  productData,
  productionYears,
  monthlyExportsData,
  exportFlowFromProjData,
  exportFlowFromImportData,
}: any) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const tab = search.get("tab");
  const createQueryString = useUpdateSearchParams();

  return (
    <Tabs defaultValue={tab || "overview"} className="">
      <header className="sticky left-0 right-0 top-0 z-20 flex h-16 items-center justify-between gap-6 space-y-0 bg-muted/90 pr-4 backdrop-blur-lg dark:bg-background/70 sm:pr-8 md:shadow-sm">
        <TabsList>
          <TabsTrigger
            value="overview"
            onClick={() => {
              router.push(
                pathname + "?" + createQueryString("tab", "overview"),
              );
            }}
          >
            <div className="flex items-center gap-2 text-xs">
              <ShipIcon className="h-4 w-4" />
              Export Overview
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="flow"
            onClick={() => {
              router.push(pathname + "?" + createQueryString("tab", "flow"));
            }}
          >
            <div className="flex items-center gap-2 text-xs">
              <GitCompareArrows className="h-4 w-4" />
              Export Flows
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="flex w-full max-w-96 items-center justify-end gap-1 sm:gap-2">
          <SearchBarDialog data={CompaniesList} />
          <ShareButton />
        </div>
      </header>

      {/* <div className="mb-24 items-start space-y-4 px-4 sm:mb-0 sm:px-8 sm:pb-8"> */}
      <TabsContent value="overview">
        <Projects
          projectInfo={projectInfo}
          projectData={projectData as unknown as ProjectDataProps}
          productData={productData}
          productionYears={productionYears}
          monthlyExportData={monthlyExportsData}
        />
      </TabsContent>
      <TabsContent
        value="flow"
        className="mb-24 items-start space-y-4 px-2 sm:mb-0 sm:px-8 sm:pb-8"
      >
        <ExportFlow
          projectInfo={projectInfo}
          data={exportFlowFromProjData}
          data2={exportFlowFromImportData}
        />
      </TabsContent>
      {/* </div> */}
    </Tabs>
  );
}
