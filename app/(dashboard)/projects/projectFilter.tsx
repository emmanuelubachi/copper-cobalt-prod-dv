"use client";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { Card, Divider } from "@tremor/react";
import useFilterStore from "@/store/filterstore";

import { industralProjectName } from "@/data/industral-projects";

export default function ProjectFilter() {
  const data = industralProjectName;
  const { closeFilter } = useFilterStore();

  return (
    <>
      <div className="flex items-center space-x-2">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Projects
        </h3>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">
          {data.length}
        </span>
      </div>
      <Divider className="my-4" />
      <div className="mt-4 grid grid-cols-1 gap-4 p-2">
        {data.map((member) => (
          <Card key={member["project-name"]} className="group px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="truncate">
                <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  <Link
                    href={`/projects?project_id=${member["short-name"].toLowerCase().trim()}`}
                    className="focus:outline-none"
                    onClick={closeFilter}
                  >
                    {/* Extend link to entire card */}
                    <span className="absolute inset-0" aria-hidden={true} />
                    {member["short-name"]}
                  </Link>
                </p>
                <p className="truncate text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  {member["project-name"]}
                </p>
              </div>
            </div>
            <span
              className="pointer-events-none absolute right-4 top-4 text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content"
              aria-hidden={true}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden={true} />
            </span>
          </Card>
        ))}
      </div>
    </>
  );
}
