import {
  MonthlyProductionData,
  TMonthlyProductionData,
  DestinationData,
  TDestinationData,
} from "@/types/map";
import {
  DestinationSummary,
  DetailedYearlySummary,
  ProjectSummary,
  YearlySummary,
} from "@/types/projects";

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
  });

  // Remove months without any data for Cobalt or Copper
  return result.filter((monthData) => monthData.Cobalt || monthData.Copper);
}

interface AggregatedData {
  [key: string]: {
    destination: string;
    quantity_tons: number;
  };
}

export function transformDestinationData(
  data: DestinationData[],
): TDestinationData[] {
  // Step 1: Aggregate quantities based on _project_id and destination
  const aggregatedData: AggregatedData = data.reduce(
    (acc: AggregatedData, entry) => {
      const key = `${entry._project_id}_${entry.destination}`;
      if (!acc[key]) {
        acc[key] = {
          destination: entry.destination,
          quantity_tons: 0,
        };
      }
      acc[key].quantity_tons += parseFloat(entry.quantity_tons);
      return acc;
    },
    {},
  );

  // Step 2: Transform aggregated data
  const transformedData = Object.values(aggregatedData).map((entry) => {
    const roundedWeight = entry.quantity_tons.toFixed(1);
    return {
      destination: entry.destination,
      quantity_tons: roundedWeight.toLocaleString(),
      label: `${roundedWeight}T`,
    };
  });

  // Step 3: Sort the transformed data in descending order based on quantity_tons
  return transformedData.sort(
    (a, b) =>
      parseFloat(b.quantity_tons.replace(/,/g, "")) -
      parseFloat(a.quantity_tons.replace(/,/g, "")),
  );
}

export function transformSortTopDestination(
  data: DestinationData[],
): TDestinationData[] {
  // Step 1: Aggregate quantities based on _project_id and destination
  const aggregatedData: AggregatedData = data.reduce(
    (acc: AggregatedData, entry) => {
      const key = `${entry._project_id}_${entry.destination}`;
      if (!acc[key]) {
        acc[key] = {
          destination: entry.destination,
          quantity_tons: 0,
        };
      }
      acc[key].quantity_tons += parseFloat(entry.quantity_tons);
      return acc;
    },
    {},
  );

  // Step 2: Transform aggregated data
  const transformedData = Object.values(aggregatedData).map((entry) => {
    const roundedWeight = entry.quantity_tons.toFixed(1);
    return {
      destination: entry.destination,
      quantity_tons: roundedWeight.toLocaleString(),
      label: `${roundedWeight}T`,
    };
  });

  // Step 3: Sort the transformed data in descending order based on quantity_tons
  const sortedData = transformedData.sort(
    (a, b) =>
      parseFloat(b.quantity_tons.replace(/,/g, "")) -
      parseFloat(a.quantity_tons.replace(/,/g, "")),
  );

  // Step 4: Return the top 5 destinations
  return sortedData.slice(0, 5);
}

type MiningData = {
  short_name: string;
  type: string;
  copper: string;
  cobalt: string;
  year: string;
  _project_id: string;
  [key: string]: any; // To handle any additional properties
};

export function calculateYearlySums(data: MiningData[]): YearlySummary[] {
  const result: { [year: string]: YearlySummary } = {};

  data.forEach((item) => {
    const year = item.year;
    const copper = parseFloat(item.copper);
    const cobalt = parseFloat(item.cobalt);

    if (!result[year]) {
      result[year] = {
        year: year,
        totalCopper: 0,
        totalCobalt: 0,
      };
    }

    result[year].totalCopper += copper;
    result[year].totalCobalt += cobalt;
  });

  return Object.values(result);
}

export function calculateDetailedYearlySums(
  data: MiningData[],
): DetailedYearlySummary[] {
  const result: { [year: string]: DetailedYearlySummary } = {};

  data.forEach((item) => {
    const year = item.year;
    const copper = parseFloat(item.copper);
    const cobalt = parseFloat(item.cobalt);
    const type = item.type;

    if (!result[year]) {
      result[year] = {
        year: year,
        totalCopperExport: 0,
        totalCopperLocal: 0,
        totalCobaltExport: 0,
        totalCobaltLocal: 0,
      };
    }

    if (type === "export") {
      result[year].totalCopperExport += copper;
      result[year].totalCobaltExport += cobalt;
    } else if (type === "local") {
      result[year].totalCopperLocal += copper;
      result[year].totalCobaltLocal += cobalt;
    }
  });

  return Object.values(result);
}

export function calculateProjectSums(data: MiningData[]): ProjectSummary[] {
  const result: {
    [projectId: string]: { totalCopper: number; totalCobalt: number };
  } = {};

  data.forEach((item) => {
    const projectId = item._project_id;
    const copper = parseFloat(item.copper);
    const cobalt = parseFloat(item.cobalt);

    if (!result[projectId]) {
      result[projectId] = {
        totalCopper: 0,
        totalCobalt: 0,
      };
    }

    result[projectId].totalCopper += copper;
    result[projectId].totalCobalt += cobalt;
  });

  return Object.keys(result).map((projectId) => ({
    _project_id: projectId,
    totalCopper: result[projectId].totalCopper,
    totalCobalt: result[projectId].totalCobalt,
  }));
}

interface ShipmentData {
  _project_id: string;
  destination: string;
  quantity_tons: string;
}

export function calculateDestinationSums(
  data: ShipmentData[],
  projectIdFilter?: string,
): DestinationSummary[] {
  const result: { [destination: string]: number } = {};

  data.forEach((item) => {
    if (!projectIdFilter || item._project_id === projectIdFilter) {
      const destination = item.destination;
      const quantityTons = parseFloat(item.quantity_tons);

      if (!result[destination]) {
        result[destination] = 0;
      }

      result[destination] += quantityTons;
    }
  });

  return Object.keys(result)
    .map((destination) => ({
      destination: destination,
      totalQuantityTons: result[destination].toFixed(1), // Keeping the precision
    }))
    .sort(
      (a, b) =>
        parseFloat(b.totalQuantityTons.replace(/,/g, "")) -
        parseFloat(a.totalQuantityTons.replace(/,/g, "")),
    );
}

import { OverviewDestinationSummary } from "@/app/(dashboard)/production-overview/page";
export function summarizeDestinations(
  data: OverviewDestinationSummary[],
  sortBy?: "quantity" | "transaction",
): OverviewDestinationSummary[] {
  const summaryMap = new Map<string, OverviewDestinationSummary>();

  data.forEach((item) => {
    const existing = summaryMap.get(item.short_destination);

    if (existing) {
      existing.quantity += item.quantity;
      existing.transaction += item.transaction;
    } else {
      summaryMap.set(item.short_destination, { ...item });
    }
  });

  let summarizedData = Array.from(summaryMap.values());

  if (sortBy) {
    summarizedData.sort((a, b) => b[sortBy] - a[sortBy]);
  } else {
    summarizedData.sort((a, b) => b.quantity - a.quantity);
  }

  return summarizedData;
}

import {
  InputData,
  TransformedData,
} from "@/app/(dashboard)/production-overview/page";
export function transformTrendData(data: InputData): TransformedData {
  const result: TransformedData = [];

  data.forEach((item) => {
    const { date, quantity, transaction, product } = item;
    const existingEntry = result.find((entry) => entry.date === date);

    // Determine the key (Cobalt or Copper) based on the product
    const key = product as keyof Omit<TransformedData[0], "date">;

    // Get the value from either quantity or transaction
    const value = quantity
      ? parseFloat(quantity)
      : parseFloat(transaction || "0");

    if (existingEntry) {
      // Add the value to the existing entry
      existingEntry[key] = value;
    } else {
      // Create a new entry
      result.push({
        date,
        [key]: value,
      });
    }
  });

  return result;
}
