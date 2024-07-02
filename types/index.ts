import { LucideProps } from "lucide-react";

export interface NavItem {
  name: string;
  path: string;
  link: string;
  icon: React.FC<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >;
}

// Define the types for searchParams
export type SearchParams = {
  [key: string]: string | undefined;
};

// Define the possible error types
export type ErrorType = "invalidParams" | "projectNotFound" | "serverError";

export type OldProjectData = {
  name: string;
  initials: string;
  email: string;
  textColor: string;
  bgColor: string;
  project_id: string;
  data: {
    name: string;
    initials: string;
    email: string;
    textColor: string;
    bgColor: string;
    project_id: string;
  }[];
};

export type IndustralProjectName = {
  no: number;
  "project-name": string;
  "short-name": string;
}[];

export type ArtisanalSite = {
  longitude: number;
  latitude: number;
  [key: string]: any;
};

export type ProcessingEntities = {
  project_name: string;
  geographic_coordinates: string;
  latitude_longitude: string;
  longitude: string;
  latitude: string;
  characteristics: string | null;
  annual_production: string | null;
  owners_shareholders: string | null;
  nationality: string | null;
  iso3: string | null;
  affiliation: string | null;
  sources: string | null;
};
