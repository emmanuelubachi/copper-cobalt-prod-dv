"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { industralProjectName } from "@/data/industral-projects";
import { Separator } from "@/components/ui/separator";

export default function ProjectFilter() {
  const searchParams = useSearchParams();
  const project_id = searchParams.get("project_id");
  const data = industralProjectName;

  return (
    <div className="h-screen w-72 space-y-2">
      <div className="flex items-center space-x-2 p-4">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Projects
        </h3>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">
          {data.length}
        </span>
      </div>
      <Separator />
      <div className="h-full pb-32">
        <div className="mt-0 grid h-full grid-cols-1 gap-1 overflow-auto px-2 pb-20 pr-2 pt-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted">
          {data.map((member) => (
            <div
              key={member["project_name"]}
              className={`group rounded-md p-2 hover:bg-neutral-100 dark:hover:bg-muted ${project_id === member["_project_id"] && "bg-neutral-100 text-foreground dark:bg-muted dark:text-foreground"}`}
            >
              <div className="flex w-full items-center space-x-4">
                <div
                  className={`w-full truncate text-xs font-medium ${project_id === member["_project_id"] ? "font-semibold text-foreground" : "text-foreground/70"}`}
                >
                  <Link
                    href={`/projects?project_id=${member["_project_id"].toLowerCase().trim()}`}
                    className="focus:outline-none"
                  >
                    {member["project_name"]}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
