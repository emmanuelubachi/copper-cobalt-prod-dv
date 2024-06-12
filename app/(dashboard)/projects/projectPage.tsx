"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import ErrorProjectNotFound from "@/components/error-pages/projectNotFound";
import ProjectSection from "@/components/sections/projectSection";

import { ProjectData, SearchParams, ErrorType } from "@/types";

type PageProps = {
  searchParams: SearchParams;
  projectData?: ProjectData;
  errorType?: ErrorType;
};

export default function ProjectPage({
  searchParams,
  projectData,
  errorType,
}: PageProps) {
  const router = useRouter();
  console.log("searchParams", searchParams);
  console.log("projectData", projectData);
  console.log("errorType", errorType);

  React.useEffect(() => {
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

  if (errorType === "invalidParams" && !projectData) {
    router.push(`/companies`);
  }

  if (!projectData || projectData.data.length === 0) {
    return <ErrorProjectNotFound />;
  }

  return <ProjectSection projectData={projectData} />;
}
