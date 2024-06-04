// "use client";
import React from "react";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import GridList from "@/components/sections/gridList";

export default function Page() {
  // const router = useRouter();

  return (
    <main className="mb-24 mt-10 flex-col space-y-8 p-4 sm:mb-20 sm:mt-16 sm:px-6 sm:py-4">
      <div className="flex">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard-01">Production Overview</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbPage>Companies</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <GridList />
    </main>
  );
}
