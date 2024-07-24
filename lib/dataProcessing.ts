import {
  MonthlyProductionData,
  TMonthlyProductionData,
  DestinationData,
  TDestinationData,
} from "@/types/miningActivities";

export function transformMonthlyData(
  data: MonthlyProductionData[],
): TMonthlyProductionData[] {
  const result: TMonthlyProductionData[] = [];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Initialize result array with months
  months.forEach((month) => {
    result.push({ month, Cobalt: 0, Copper: 0 });
  });

  // Process each entry in the data
  data.forEach((entry) => {
    const { month, quantity_tons, product } = entry;
    const targetMonth = result.find((m) => m.month === month);

    if (targetMonth) {
      if (product === "Cobalt" || product === "Copper") {
        targetMonth[product] += parseFloat(quantity_tons);
      }
    }
    // if (targetMonth) {
    //   targetMonth[product as keyof MonthData] += parseFloat(quantity_tons);
    //   //   (targetMonth as MonthData)[product as keyof MonthData] ;
    // }
  });

  // Remove months without any data for Cobalt or Copper
  return result.filter((monthData) => monthData.Cobalt || monthData.Copper);
}

export function transformDestinationData(
  data: DestinationData[],
): TDestinationData[] {
  return data
    .map((entry) => {
      const weight = parseFloat(entry["quantity_tons"]);
      const roundedWeight = weight.toFixed(1);
      return {
        destination: entry.destination,
        quantity_tons: roundedWeight.toLocaleString(),
        label: `${roundedWeight}T`,
      };
    })
    .sort(
      (a, b) =>
        parseFloat(b["quantity_tons"].replace(/,/g, "")) -
        parseFloat(a["quantity_tons"].replace(/,/g, "")),
    );
}

export function transformSortTopDestination(
  data: DestinationData[],
): TDestinationData[] {
  return data
    .map((entry) => {
      const weight = parseFloat(entry["quantity_tons"]);
      const roundedWeight = weight.toFixed(1);
      return {
        destination: entry.destination,
        quantity_tons: roundedWeight.toLocaleString(),
        label: `${roundedWeight}T`,
      };
    })
    .sort(
      (a, b) =>
        parseFloat(b["quantity_tons"].replace(/,/g, "")) -
        parseFloat(a["quantity_tons"].replace(/,/g, "")),
    )
    .slice(0, 5);
}
