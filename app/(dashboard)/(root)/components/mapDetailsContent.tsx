import React from "react";
import { useSearchParams } from "next/navigation";

export default function MapDetailsContent() {
  const searchParams = useSearchParams();
  const artisanal_site = searchParams.get("artisanal_site_id");

  return <div>{artisanal_site}</div>;
}
