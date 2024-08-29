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

export type ProjectSummary = {
  _project_id: string;
  totalCobalt: number;
  totalCopper: number;
};

export type DestinationSummary = {
  destination: string;
  totalQuantityTons: string;
};

export type CompaniesListProps = {
  value: string;
  label: string;
  flagCode: string;
  children: {
    value: string;
    label: string;
  }[];
}[];
