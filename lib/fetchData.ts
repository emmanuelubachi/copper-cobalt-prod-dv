// lib/fetchData.ts
import * as z from "zod";
import { industralProjectName } from "@/data/industral-projects";
import { ErrorType, IndustralProjectName, SearchParams } from "@/types";

// lib fetch local data ---------------------------------------------------------------
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

async function getProjectData(
  projectId: string,
): Promise<IndustralProjectName | null> {
  const filteredData = industralProjectName.filter(
    (data) => data["short-name"].toLowerCase().trim() === projectId,
  );

  if (filteredData.length === 0) {
    return null;
  }

  return filteredData;
}

export async function fetchData(
  searchParams: SearchParams,
): Promise<{ projectInfo?: IndustralProjectName; errorType?: ErrorType }> {
  const props = await validateSearchParam(searchParams);
  if (props.errorType === "invalidParams") {
    return { errorType: "invalidParams" };
  }

  try {
    const projectInfo = await getProjectData(props.projectId as string);
    if (!projectInfo) {
      return { errorType: "projectNotFound" };
    }
    return {
      projectInfo,
      errorType: undefined,
    };
  } catch (err) {
    console.error("Error fetching project data:", err);
    return { errorType: "serverError" };
  }
}

// --------------------------------------------------------------------------------------

// lib fetch remote data ---------------------------------------------------------------
export async function fetchTinybirdData(url: string) {
  const authorizationToken = process.env.NEXT_PUBLIC_API_AUTHORIZATION;

  if (!authorizationToken) {
    throw new Error("API authorization token is not defined");
  }

  try {
    const result = await fetch(url, {
      headers: {
        Authorization: authorizationToken,
      },
    }).then((r) => r.json());

    if (!result.data) {
      console.error(`There is a problem running the query: ${result}`);
    } else {
      return result.data;
    }
  } catch (e: any) {
    console.error(e.toString());
    return [];
  }
}
