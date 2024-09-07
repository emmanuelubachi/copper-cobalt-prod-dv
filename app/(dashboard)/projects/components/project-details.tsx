import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { calculateProductSummary } from "@/lib/dataProcessing";

export default function ProjectDetails({
  projectData,
  productData,
  year,
}: any) {
  const totalExports = calculateProductSummary(productData);
  const copperData = totalExports.filter((row) => row.product === "Copper");
  const cobaltData = totalExports.filter((row) => row.product === "Cobalt");

  return (
    <div className="shrink border-none bg-transparent shadow-none lg:col-span-2 lg:h-fit">
      <div className="px-0 lg:pt-2">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
          {/* Project Info */}
          <div className="flex flex-col flex-wrap gap-2 text-start text-xs tracking-tight text-muted-foreground sm:text-sm">
            <h4 className="leading-none">
              Nationality:{" "}
              <span className="font-medium text-foreground">
                {projectData && projectData.Nationality}
              </span>
            </h4>

            <h4 className="leading-none">
              Province:{" "}
              <span className="font-medium text-foreground">
                {projectData && projectData.Province}
              </span>
            </h4>

            <h4 className="leading-none">
              Coordinates:{" "}
              <span className="font-medium text-foreground">
                {projectData && projectData.Geographical_coordinates}
              </span>
            </h4>
            <h4 className="leading-none">
              Ownership:{" "}
              <span className="font-medium text-foreground">
                {projectData && projectData.Ownership}
              </span>
            </h4>
          </div>

          {/* Annual Exports */}
          <div className="space-y-2">
            <div>
              <h4 className="font-semibold leading-none tracking-tight">
                {totalExports.length > 0 && `${year} Annual Exports`}
              </h4>
            </div>

            <div className="flex gap-10">
              {cobaltData.length > 0 && (
                <div className="space-y-4">
                  <div className="border-l-4 border-chart6 pl-4 font-bold">
                    <p className="text-h5 font-bold text-foreground/90">
                      {cobaltData[0].totalQuantity > 0 &&
                        cobaltData[0].totalQuantity
                          .toFixed(1)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      {" t"}
                    </p>
                    <p className="text-sm text-foreground/70">
                      <span className="text-chart6">Cobalt</span> Production
                    </p>
                  </div>
                </div>
              )}

              {copperData.length > 0 && (
                <div className="space-y-4">
                  <div className="border-l-4 border-chart5 pl-4 font-bold">
                    <p className="text-h5 font-bold text-foreground/90">
                      {copperData[0].totalQuantity > 0 &&
                        copperData[0].totalQuantity
                          .toFixed(1)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      {" t"}
                    </p>
                    <p className="text-sm text-foreground/70">
                      <span className="text-chart5">Copper</span> Production
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
