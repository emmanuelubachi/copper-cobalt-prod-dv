import React from "react";
import Image from "next/image";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { CGSPRedSvgIcon } from "./svg/cdsp_logo";

export function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ClimbingBoxLoader loading={true} color="#36d7b7" />
    </div>
  );
}

export function PageLoadingFallback() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <CGSPRedSvgIcon className="h-14 w-14 animate-spin-slow" />
      <p className="animate-pulse text-p">Loading...</p>
    </div>
  );
}
