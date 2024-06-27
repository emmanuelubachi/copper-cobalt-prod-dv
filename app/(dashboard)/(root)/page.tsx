"use client";
import { useSearchParams } from "next/navigation";
import useDeviceType from "@/hooks/useDeviceType";
import MapComponent from "./components/mapComponent";
import { useArtisanalData } from "@/hooks/useMapData";

export default function Home() {
  const { isMobile } = useDeviceType();
  const { activeSites, inactiveSites } = useArtisanalData();
  const searchParams = useSearchParams();
  const artisanal_site_id = searchParams.get("artisanal_site_id");

  return (
    <main className="relativeh-screen sm:mb-0 sm:ml-0 sm:pr-16">
      <MapComponent
        isMobile={isMobile}
        artisanal_site_id={artisanal_site_id}
        activeSites={activeSites}
        inactiveSites={inactiveSites}
      />
    </main>
  );
}
