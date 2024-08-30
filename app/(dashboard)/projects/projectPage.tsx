// import { redirect } from "next/navigation";
// import ProjectDetails from "./components/project-details";
// import { ProjectInfo, SearchParams, ErrorType } from "@/types";
// import ErrorNotification from "@/components/elements/notification";
// import ProductCompositionData from "@/data/projects/product_composition.json";

// import totalProductionData from "@/data/projects/totals_production_quantity_by_projects_&_type.json";
// import montlyProductionData from "@/data/map/2023 Industrial Projects Monthly cobalt-copper Production - origin Statistiques M.json";
// import cobaltDestinationData from "@/data/map/2023 cobalt production destination - origin situation des.json";
// import copperDestinationData from "@/data/map/2023 copper production destination - origin situation des.json";
// import { defaultPRoject } from "@/constants/application";

// type PageProps = {
//   searchParams: SearchParams;
//   projectInfo?: ProjectInfo;
//   errorType?: ErrorType;
//   projectsData?: any[];
// };

// export default function ProjectPage({
//   searchParams,
//   projectInfo,
//   errorType,
//   projectsData,
// }: PageProps) {
//   if (errorType === "invalidParams") {
//     if (!searchParams.project_id) {
//       redirect(`/projects?project_id=${defaultPRoject}`);
//     } else {
//       redirect("/companies");
//     }
//   }

//   if (!projectInfo || projectInfo.project_name === "") {
//     redirect("/companies");
//   }

//   const projectData = projectsData?.find(
//     (d) => d._project_id === projectInfo._project_id,
//   );
//   // Filter based on `_project_id`
//   const productData = ProductCompositionData.filter(
//     (d) => d._project_id === projectInfo._project_id,
//   );

//   // Extract a list of unique years from the filtered data
//   const productionYears = Array.from(
//     new Set(productData.map((item) => item.year)),
//   ).sort((a, b) => parseInt(a) - parseInt(b));

//   return (
//     <>
//       <ErrorNotification errorType={errorType} />
//       <ProjectDetails
//         projectInfo={projectInfo}
//         projectData={projectData}
//         productData={productData}
//         productionYears={productionYears}
//         totalProductionData={totalProductionData}
//       />
//     </>
//   );
// }

// // "use client";
// // import React, { useEffect } from "react";
// // import { toast } from "sonner";
// // import { useRouter } from "next/navigation";
// // import ProjectDetails from "./components/project-details";
// // import { ProjectInfo, SearchParams, ErrorType } from "@/types";

// // type PageProps = {
// //   searchParams: SearchParams;
// //   projectInfo?: ProjectInfo;
// //   errorType?: ErrorType;
// //   jsonData?: any[];
// // };

// // export default function ProjectPage({
// //   searchParams,
// //   projectInfo,
// //   errorType,
// //   jsonData,
// // }: PageProps) {
// //   const router = useRouter();

// //   useEffect(() => {
// //     if (errorType === "invalidParams" && !searchParams.project_id) {
// //       toast.info("Please select a valid Project");
// //     }

// //     if (errorType === "invalidParams" && searchParams.project_id) {
// //       toast.info("Please select a valid Project");
// //     }
// //   }, [errorType, searchParams.project_id]);

// //   if (errorType === "invalidParams" && searchParams.project_id) {
// //     router.push(`/companies`);
// //   }

// //   if (errorType === "invalidParams" && !projectInfo) {
// //     router.push(`/companies`);
// //   }

// //   if (!projectInfo || projectInfo.project_name === "") {
// //     router.push(`/companies`);
// //     return null;
// //   }

// //   const data = jsonData?.find((d) => d._project_id === projectInfo._project_id);

// //   return <ProjectDetails projectInfo={projectInfo} projectData={data} />;
// // }
