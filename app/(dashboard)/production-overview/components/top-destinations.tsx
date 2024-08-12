import CustomLabelBarChart from "@/components/charts/shadcn/bar-chart/custom-label-bar-chart";
// import { coDestSumChartConfig, cuDestSumChartConfig } from "@/constants/chart";
const coDestSumChartConfig = {
  quantity: {
    label: `Qty (T) ${" "}`,
    color: "hsl(var(--chart-6))",
  },
  label: {
    color: "hsl(var(--background))",
  },
};

const cuDestSumChartConfig = {
  quantity: {
    label: `Qty (T) ${" "}`,
    color: "hsl(var(--chart-5))",
  },
  label: {
    color: "hsl(var(--background))",
  },
};

export default function TopDestinations({
  selectedYear,
  coDestSum,
  cuDestSum,
}: any) {
  const year = selectedYear;
  return (
    <section className="grid items-start gap-2 xl:col-span-2">
      <div className="grid gap-4 lg:grid-cols-2">
        <CustomLabelBarChart
          title={`Top Destinations of Cobalt Production in ${year}`}
          description="Quantity in Tonnes"
          config={coDestSumChartConfig}
          chartData={coDestSum}
          yAxisDataKey="short_destination"
          xAxisDataKey="quantity"
        />

        <CustomLabelBarChart
          title={`Top Destinations of Copper Production in ${year}`}
          description="Quantity in Tonnes"
          config={cuDestSumChartConfig}
          chartData={cuDestSum}
          yAxisDataKey="short_destination"
          xAxisDataKey="quantity"
        />
      </div>
    </section>
  );
}
