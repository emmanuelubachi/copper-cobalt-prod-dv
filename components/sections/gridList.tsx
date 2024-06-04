// 'use client';
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
        <h3 className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          Members
        </h3>
        <span className="rounded-tremor-full bg-tremor-background-subtle text-tremor-label text-tremor-content-strong dark:bg-dark-tremor-background-subtle dark:text-dark-tremor-content-strong inline-flex h-6 w-6 items-center justify-center font-medium">
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
                  "text-tremor-default flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-medium",
                )}
                aria-hidden={true}
              >
                {member.initials}
              </span>
              <div className="truncate">
                <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong truncate font-medium">
                  <a href={member.href} className="focus:outline-none">
                    {/* Extend link to entire card */}
                    <span className="absolute inset-0" aria-hidden={true} />
                    {member.name}
                  </a>
                </p>
                <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content truncate">
                  {member.email}
                </p>
              </div>
            </div>
            <span
              className="text-tremor-content-subtle group-hover:text-tremor-content dark:text-dark-tremor-content-subtle group-hover:dark:text-dark-tremor-content pointer-events-none absolute right-4 top-4"
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
