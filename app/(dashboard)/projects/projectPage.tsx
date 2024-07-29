"use client";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import ErrorProjectNotFound from "@/components/error-pages/projectNotFound";
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
}
