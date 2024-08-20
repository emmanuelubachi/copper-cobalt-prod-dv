"use client";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { industrialProjectName } from "@/data/industrial-projects";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProjectFilter() {
  const searchParams = useSearchParams();
  const project_id = searchParams.get("project_id");
  const data = industrialProjectName;

  // State for managing the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter the projects based on the search query
  const filteredData = data.filter((member) =>
    member["project_name"].toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="h-screen w-72 space-y-4 pt-4 sm:pt-0">
      {/* Search bar */}

      <div className="px-4">
        <div className="group relative flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects..."
            className="custom-search w-full rounded-xl bg-muted pl-8 focus:border-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 px-4">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Projects
        </h3>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">
          {filteredData.length}
        </span>
      </div>

      <Separator />

      <div className="h-full pb-32">
        <div className="mt-0 h-full overflow-auto px-2 pb-20 pr-2 pt-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted">
          {/* Render filtered projects */}
          {filteredData.map((member) => (
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
