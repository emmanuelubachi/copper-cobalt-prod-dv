import { fetchData } from "@/lib/fetchData";
import IndustrialProjectsData from "@/data/projects/industrial_projects.json";

import { redirect } from "next/navigation";
import ProjectDetails from "./components/project-details";
import { SearchParams } from "@/types";
import ErrorNotification from "@/components/elements/notification";
import ProductCompositionData from "@/data/projects/product_composition.json";

import totalProductionData from "@/data/projects/totals_production_quantity_by_projects_&_type.json";
// import montlyProductionData from "@/data/map/2023 Industrial Projects Monthly cobalt-copper Production - origin Statistiques M.json";
// import cobaltDestinationData from "@/data/map/2023 cobalt production destination - origin situation des.json";
// import copperDestinationData from "@/data/map/2023 copper production destination - origin situation des.json";
import { defaultPRoject } from "@/constants/application";
import { ProjectDataProps } from "@/types/projects";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { projectInfo, errorType } = await fetchData(searchParams);

  // Handle invalid parameters
  if (errorType === "invalidParams") {
    if (!searchParams.project_id) {
      redirect(`/projects?project_id=${defaultPRoject}`);
    } else {
      redirect("/companies");
    }
  }

  // Redirect if project info is missing
  if (!projectInfo || projectInfo.project_name === "") {
    redirect("/companies");
  }

  // Find the specific project data
  const projectData = IndustrialProjectsData?.find(
    (d) => d._project_id === projectInfo._project_id,
  );

  // Filter product composition data for the current project
  const productData = ProductCompositionData.filter(
    (d) => d._project_id === projectInfo._project_id,
  );

  // Extract unique production years and sort them
  const productionYears = Array.from(
    new Set(productData.map((item) => item.year)),
  ).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <>
      <ErrorNotification errorType={errorType} />
      <ProjectDetails
        projectInfo={projectInfo}
        projectData={projectData as unknown as ProjectDataProps}
        productData={productData}
        productionYears={productionYears}
        totalProductionData={totalProductionData}
      />
    </>
  );
}
