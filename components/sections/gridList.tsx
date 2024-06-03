// 'use client';
import { ArrowUpRight } from "lucide-react";
import { Card, Divider } from "@tremor/react";

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const data = [
  {
    name: "Shituru Mining",
    initials: "AS",
    email: "a.stone@gmail.com",
    textColor: "text-fuchsia-800 dark:text-fuchsia-500",
    bgColor: "bg-fuchsia-100 dark:bg-fuchsia-500/20",
    href: "#",
  },
  {
    name: "Anvil Mining",
    initials: "EB",
    email: "e.bern@gmail.com",
    textColor: "text-blue-800 dark:text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-500/20",
    href: "#",
  },
  {
    name: "MMG Kinsevere",
    initials: "AM",
    email: "a.flow@acme.com",
    textColor: "text-pink-800 dark:text-pink-500",
    bgColor: "bg-pink-100 dark:bg-pink-500/20",
    href: "#",
  },
  {
    name: "Mutanda Mining",
    initials: "TP",
    email: "t.palstein@acme.com",
    textColor: "text-emerald-800 dark:text-emerald-500",
    bgColor: "bg-emerald-100 dark:bg-emerald-500/20",
    href: "#",
  },
  {
    name: "Shituru Mining",
    initials: "SJ",
    email: "s.johnson@gmail.com",
    textColor: "text-orange-800 dark:text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-500/20",
    href: "#",
  },
  {
    name: "Musonoi Project",
    initials: "DS",
    email: "d.smith@gmail.com",
    textColor: "text-indigo-800 dark:text-indigo-500",
    bgColor: "bg-indigo-100 dark:bg-indigo-500/20",
    href: "#",
  },
  {
    name: "Megan Brown",
    initials: "MB",
    email: "m.brown@gmail.com",
    textColor: "text-yellow-800 dark:text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-500/20",
    href: "#",
  },
];

export default function GridList() {
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
