"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
// import ErrorProjectNotFound from "@/components/error-pages/projectNotFound";
import ProjectDetails from "./components/project-details";
import { ProjectInfo, SearchParams, ErrorType } from "@/types";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/custom-tabs";
import FilterButton from "@/components/elements/filterButton";
import ProjectFilter from "./components/project-filter";
import { ShareButton } from "@/components/elements/shareButton";
import ProjectComparison from "./components/project-comparison";
import { ShipIcon, GitCompareArrows } from "lucide-react";
import useDeviceType from "@/hooks/useDeviceType";

type PageProps = {
  searchParams: SearchParams;
  projectInfo?: ProjectInfo;
  errorType?: ErrorType;
};

export default function ProjectPage({
  searchParams,
  projectInfo,
  errorType,
}: PageProps) {
  const router = useRouter();
  const { isMobile } = useDeviceType();

  // TODO: look into this later
  useEffect(() => {
    if (errorType === "invalidParams" && !searchParams.project_id) {
      toast.info("Please select a valid Project");
      // TODO: update URL with default value of project_id
    }

    if (errorType === "invalidParams" && searchParams.project_id) {
      toast.info("Please select a valid Project");
    }
  }, [errorType, searchParams.project_id]);

  if (errorType === "invalidParams" && searchParams.project_id) {
    router.push(`/companies`);
  }

  if (errorType === "invalidParams" && !projectInfo) {
    router.push(`/companies`);
  }

  if (!projectInfo || projectInfo.project_name === "") {
    // return <ErrorProjectNotFound />;
    router.push(`/companies`);
    return null;
  }

  // return <ProjectDetails projectInfo={projectInfo} />;
  return (
    <main>
      <Tabs defaultValue="flow" className="">
        <header className="sticky left-0 right-0 top-0 z-20 flex h-16 items-center justify-between gap-6 space-y-0 bg-muted/70 pr-4 backdrop-blur-md dark:bg-background/70 sm:pr-8 md:shadow-sm">
          <TabsList>
            <TabsTrigger value="flow">
              <div className="flex items-center gap-2 text-xs">
                <ShipIcon className="h-4 w-4" />
                Export Overview
              </div>
            </TabsTrigger>
            <TabsTrigger value="comparison">
              <div className="flex items-center gap-2 text-xs">
                <GitCompareArrows className="h-4 w-4" />
                Export Flows
              </div>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-end gap-1 sm:gap-2">
            <div>
              {isMobile ? (
                <FilterButton
                  content={<ProjectFilter />}
                  label="Projects"
                  type="tooltip"
                  tooltip="Select a project"
                  className="!rounded-full text-xs transition-all duration-300"
                  size={"icon"}
                />
              ) : (
                <FilterButton
                  content={<ProjectFilter />}
                  label="Projects"
                  type="tooltip"
                  tooltip="Select a project"
                  className="text-xs"
                />
              )}
            </div>
            <ShareButton />
          </div>
        </header>

        <div className="mb-24 items-start space-y-4 px-4 sm:mb-0 sm:px-8 sm:pb-8">
          <TabsContent value="flow">
            <ProjectDetails projectInfo={projectInfo} />
          </TabsContent>
          <TabsContent value="comparison">
            <ProjectComparison projectInfo={projectInfo} />
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}

// px-4 sm:px-8
