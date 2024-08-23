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

import { Years } from "@/data/chartData";
import YearToggle from "@/components/year-toggle";

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
  const [selectedYear, setSelectedYear] = useState<string>("2022");

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
        <header className="sticky left-0 right-0 top-0 z-20 flex h-16 items-center justify-between gap-6 space-y-0 bg-muted/50 pr-4 backdrop-blur-md dark:bg-background/50 sm:pr-8 md:shadow-sm">
          <TabsList>
            <TabsTrigger value="flow">Export Flow</TabsTrigger>
            <TabsTrigger value="comparison">Project Comparison</TabsTrigger>
          </TabsList>

          <div className="flex items-center justify-end gap-1">
            <div>
              <FilterButton
                content={<ProjectFilter />}
                label="Projects"
                type="tooltip"
                tooltip="Select a project"
                className=""
              />
            </div>
            <ShareButton />
          </div>
        </header>

        <div className="mb-24 items-start space-y-4 p-4 sm:mb-20 sm:px-8 sm:py-3">
          <TabsContent value="flow">
            <ProjectDetails projectInfo={projectInfo} />
          </TabsContent>
          <TabsContent value="comparison">
            <section className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <h2 className="text-center text-h5 font-medium tracking-tight lg:text-start">
                  {projectInfo.project_name}
                </h2>
                <div className="hidden lg:block">
                  <YearToggle
                    defaultValue={selectedYear}
                    onChangeFunction={setSelectedYear}
                    years={Years}
                  />
                </div>
              </div>
            </section>
          </TabsContent>
        </div>
      </Tabs>
    </main>
  );
}

// px-4 sm:px-8
