"use client";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { Card, Divider } from "@tremor/react";
import useFilterStore from "@/store/filterStore";

import { companyData } from "@/data/chartData";
import { industralProjectName } from "@/data/industral-projects";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function GridList() {
  const data = industralProjectName;
  const { closeFilter } = useFilterStore();

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Projects
        </h3>
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-tremor-full bg-tremor-background-subtle text-tremor-label font-medium text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong">
          {data.length}
        </span>
      </div>
      {/* <Divider className="" /> */}
      <div className="mt-2 grid grid-cols-2 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((member) => (
          <Card key={member["project_name"]} className="__button_pressed group">
            <div className="flex items-center space-x-4">
              <div className="truncate">
                <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  <Link
                    href={`/projects?project_id=${member["_project_id"].toLowerCase().trim()}`}
                    className="focus:outline-none"
                    onClick={closeFilter}
                  >
                    {/* Extend link to entire card */}
                    <span className="absolute inset-0" aria-hidden={true} />
                    {member["short_name"]}
                  </Link>
                </p>
                <p className="truncate text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  {member["project_name"]}
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
    </section>
  );
}
