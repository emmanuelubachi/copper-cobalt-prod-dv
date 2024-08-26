"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProjectDetails from "./components/project-details";
import { ProjectInfo, SearchParams, ErrorType } from "@/types";

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

  return <ProjectDetails projectInfo={projectInfo} />;
  // return (
  //   <main>
  //     <Tabs defaultValue="overview" className="">
  //       <header className="sticky left-0 right-0 top-0 z-20 flex h-16 items-center justify-between gap-6 space-y-0 bg-muted/90 pr-4 backdrop-blur-sm dark:bg-background/70 sm:pr-8 md:shadow-sm">
  //         <TabsList>
  //           <TabsTrigger value="overview">
  //             <div className="flex items-center gap-2 text-xs">
  //               <ShipIcon className="h-4 w-4" />
  //               Export Overview
  //             </div>
  //           </TabsTrigger>
  //           <TabsTrigger value="flow">
  //             <div className="flex items-center gap-2 text-xs">
  //               <GitCompareArrows className="h-4 w-4" />
  //               Export Flows
  //             </div>
  //           </TabsTrigger>
  //         </TabsList>

  //         <div className="flex items-center justify-end gap-1 sm:gap-2">
  //           <ShareButton />
  //         </div>
  //       </header>

  //       <div className="mb-24 items-start space-y-4 px-4 sm:mb-0 sm:px-8 sm:pb-8">
  //         <TabsContent value="overview">
  //           <ProjectDetails projectInfo={projectInfo} />
  //         </TabsContent>
  //         <TabsContent value="flow">
  //           <ExportFlow />
  //         </TabsContent>
  //       </div>
  //     </Tabs>
  //   </main>
  // );
}
