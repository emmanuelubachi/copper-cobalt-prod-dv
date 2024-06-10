// lib/fetchData.ts
import * as z from "zod";
import { companyData } from "@/data/chartData";
import { ErrorType, ProjectData, SearchParams } from "@/types";

type ValidatedProps = {
  projectId?: string;
  errorType?: ErrorType;
};

const searchParamsSchema = z.object({
  project_id: z.string().min(3),
});

async function validateSearchParam(query: any): Promise<ValidatedProps> {
  const validation = searchParamsSchema.safeParse(query);

  if (!validation.success) {
    return {
      projectId: query.project_id,
      errorType: "invalidParams",
    };
  }

  const { project_id } = validation.data;

  return { projectId: project_id };
}

async function getProjectData(projectId: string): Promise<ProjectData | null> {
  const filteredData = companyData.filter(
    (data) => data.project_id === projectId,
  );

  if (filteredData.length === 0) {
    return null;
  }

  return filteredData[0];
}

export async function fetchData(
  searchParams: SearchParams,
): Promise<{ projectData?: ProjectData; errorType?: ErrorType }> {
  const props = await validateSearchParam(searchParams);
  if (props.errorType === "invalidParams") {
    return { errorType: "invalidParams" };
  }

  try {
    const projectData = await getProjectData(props.projectId as string);
    if (!projectData) {
      return { errorType: "projectNotFound" };
    }
    return {
      projectData,
      errorType: undefined,
    };
  } catch (err) {
    console.error("Error fetching project data:", err);
    return { errorType: "serverError" };
  }
}
