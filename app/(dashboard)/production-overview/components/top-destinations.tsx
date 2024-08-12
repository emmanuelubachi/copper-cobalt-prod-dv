import CustomLabelBarChart from "@/components/charts/shadcn/bar-chart/custom-label-bar-chart";
import { coDestSumChartConfig, cuDestSumChartConfig } from "@/constants/chart";

export default function TopDestinations({ coDestSum, cuDestSum }: any) {
  return (
    <section className="grid items-start gap-2 xl:col-span-2">
      <div className="grid gap-4 lg:grid-cols-2">
        <CustomLabelBarChart
          title="Top Destinations of Cobalt Production in 2023"
          description="Quantity in Tonnes"
          config={coDestSumChartConfig}
          chartData={coDestSum}
          yAxisDataKey="destination"
          xAxisDataKey="totalQuantityTons"
        />

        <CustomLabelBarChart
          title="Top Destinations of Copper Production in 2023"
          description="Quantity in Tonnes"
          config={cuDestSumChartConfig}
          chartData={cuDestSum}
          yAxisDataKey="destination"
          xAxisDataKey="totalQuantityTons"
        />
      </div>
    </section>
  );
}
