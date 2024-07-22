import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useMarkerVisibilityStore from "@/store/markerVisibilityStore";
import useMapFilterStore from "@/store/mapFilterStore";
import CheckBoxTreeWithFilter from "@/components/m-ui/checkbox-tree";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { Toggle } from "@/components/ui/toggle";
import { IndustralProjectsNode } from "@/constants/application";

const nodes = IndustralProjectsNode;

const checked = ["Australia"];

const expanded = [""];

export function ArtisanalSites() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useUpdateSearchParams();
  const active_site_sParams = searchParams.get("active_site");
  const inactive_site_sParams = searchParams.get("inactive_site");
  const {
    showActiveSiteMarkers,
    toggleActiveSiteMarkers,

    showInactiveSiteMarkers,
    toggleInactiveSiteMarkers,
  } = useMarkerVisibilityStore();
  const {
    isActiveSitesButtonVisible,
    toggleActiveSiteButton,
    showActiveSiteButton,

    isInactiveSitesButtonVisible,
    toggleInactiveSiteButton,
    showInactiveSiteButton,
  } = useMapFilterStore();

  useEffect(() => {
    if (active_site_sParams === "true") {
      showActiveSiteButton();
      showActiveSiteMarkers();
    }
  }, [active_site_sParams, showActiveSiteButton, showActiveSiteMarkers]);

  useEffect(() => {
    if (inactive_site_sParams === "true") {
      showInactiveSiteButton();
      showInactiveSiteMarkers();
    }
  }, [inactive_site_sParams, showInactiveSiteButton, showInactiveSiteMarkers]);

  return (
    <div className="flex w-full flex-col gap-4">
      <h6 className="text-p font-semibold">Artisanal Mining Sites</h6>
      <div className="flex gap-3 px-1">
        <Toggle
          size="sm"
          pressed={isActiveSitesButtonVisible}
          onPressedChange={() => {
            const new_active_site = !isActiveSitesButtonVisible;
            toggleActiveSiteButton();
            toggleActiveSiteMarkers(),
              router.push(
                pathname +
                  "?" +
                  createQueryString("active_site", new_active_site.toString()),
              );
          }}
          className="__button_pressed data-[state=on]:__button_pressed w-full rounded-full bg-accent px-2 py-1 text-sm text-cyan-500 ring-2 ring-cyan-500 hover:bg-accent hover:text-cyan-600 hover:ring-cyan-600 data-[state=on]:bg-cyan-500 data-[state=on]:text-background data-[state=on]:hover:bg-cyan-600"
        >
          Active Sites
        </Toggle>
        <Toggle
          size="sm"
          pressed={isInactiveSitesButtonVisible}
          onPressedChange={() => {
            const new_inactive_site = !isInactiveSitesButtonVisible;
            toggleInactiveSiteButton();
            toggleInactiveSiteMarkers(),
              router.push(
                pathname +
                  "?" +
                  createQueryString(
                    "inactive_site",
                    new_inactive_site.toString(),
                  ),
              );
          }}
          className="__button_pressed data-[state=on]:__button_pressed w-full rounded-full bg-accent px-2 py-1 text-sm text-neutral-500 ring-2 ring-neutral-500 hover:bg-accent hover:text-neutral-600 hover:ring-neutral-600 data-[state=on]:bg-neutral-500 data-[state=on]:text-background data-[state=on]:hover:bg-neutral-600"
        >
          Inactive Sites
        </Toggle>
      </div>
    </div>
  );
}

export function IndustralProjects() {
  return (
    <div className="flex flex-col gap-4">
      <h6 className="text-p font-semibold">Industral Projects</h6>

      <CheckBoxTreeWithFilter
        nodes={nodes}
        checkedNodes={checked}
        expandedNodes={expanded}
      />
    </div>
  );
}
