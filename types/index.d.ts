interface NavItem {
  name: string;
  path: string;
  icon: React.N<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >;
}

// Define the types for searchParams
export type SearchParams = {
  [key: string]: string | undefined;
};

// Define the possible error types
export type ErrorType = "invalidParams" | "projectNotFound" | "serverError";

export type ProjectData = {
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
