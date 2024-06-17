import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function LoadingSpinner() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ClimbingBoxLoader loading={true} color="#36d7b7" />
    </div>
  );
}
