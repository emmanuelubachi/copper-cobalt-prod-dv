"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import ErrorProjectNotFound from "@/components/error-pages/projectNotFound";
import ProjectSection from "@/components/sections/projectSection";

import { IndustralProjectName, SearchParams, ErrorType } from "@/types";

type PageProps = {
  searchParams: SearchParams;
  projectInfo?: IndustralProjectName;
  errorType?: ErrorType;
};

export default function ProjectPage({
  searchParams,
  projectInfo,
  errorType,
}: PageProps) {
  const router = useRouter();

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

  if (errorType === "invalidParams" && !projectInfo) {
    router.push(`/companies`);
  }

  if (!projectInfo || projectInfo.length === 0) {
    return <ErrorProjectNotFound />;
  }

  return <ProjectSection projectInfo={projectInfo} />;
}
