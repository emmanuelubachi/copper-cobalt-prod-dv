"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { ErrorType } from "@/types";

export default function ErrorNotification({
  errorType,
}: {
  errorType?: ErrorType;
}) {
  useEffect(() => {
    if (errorType === "invalidParams") {
      toast.info("Please select a valid Project");
    }
  }, [errorType]);

  return null;
}
