"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "@remixicon/react";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <div>
      <Button
        className="flex gap-2 pr-6 text-muted-foreground"
        variant={"secondary"}
        size={"sm"}
        onClick={() => router.back()}
      >
        <ChevronLeft className="h-5 w-5" />
        Back
      </Button>
    </div>
  );
}
