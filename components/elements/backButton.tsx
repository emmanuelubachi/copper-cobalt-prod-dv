"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RiArrowLeftLine } from "@remixicon/react";

export default function BackButton() {
  const router = useRouter();

  return (
    <div>
      <Button
        className="flex gap-2 text-muted-foreground"
        variant={"link"}
        onClick={() => router.back()}
      >
        <RiArrowLeftLine /> Back
      </Button>
    </div>
  );
}
