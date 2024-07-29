export type YearlySummary = {
  year: string;
  totalCopper: number;
  totalCobalt: number;
};

export type DetailedYearlySummary = {
  year: string;
  totalCopperExport: number;
  totalCopperLocal: number;
  totalCobaltExport: number;
  totalCobaltLocal: number;
};
