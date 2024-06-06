// 'use client';
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";
import { Card, Divider } from "@tremor/react";
import { companyData } from "@/data/chartData";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function GridList() {
  const data = companyData;
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
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((member) => (
          <Card key={member.name} className="group">
            <div className="flex items-center space-x-4">
              <span
                className={classNames(
                  member.bgColor,
                  member.textColor,
                  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-tremor-default font-medium",
                )}
                aria-hidden={true}
              >
                {member.initials}
              </span>
              <div className="truncate">
                <p className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                  <Link
                    href={`/projects?project_id=${member.project_id}`}
                    className="focus:outline-none"
                  >
                    {/* Extend link to entire card */}
                    <span className="absolute inset-0" aria-hidden={true} />
                    {member.name}
                  </Link>
                </p>
                <p className="truncate text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                  {member.email}
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
