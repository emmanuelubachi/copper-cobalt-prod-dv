import React from "react";
import ExportFlow from "@/components/elements/export-flow";
import ExportFlowFromProjData from "@/data/export-flow/export_flow_from_projects.json";
import ExportFlowFromImportData from "@/data/export-flow/export_flow_from_importers.json";

export default function Page() {
  return (
    <section className="space-y-4">
      <ExportFlow
        data={ExportFlowFromProjData}
        data2={ExportFlowFromImportData}
      />
    </section>
  );
}
