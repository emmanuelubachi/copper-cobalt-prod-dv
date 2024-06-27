import { useState, useEffect } from "react";
import { ArtisanalSite } from "@/types";
import { fetchTinybirdData } from "@/lib/fetchData";

const ACTIVE_SITES_API_URL =
  "https://api.tinybird.co/v0/pipes/artisanal_sites_active.json";
const INACTIVE_SITES_API_URL =
  "https://api.tinybird.co/v0/pipes/artisanal_sites_inactive.json";

export const useArtisanalData = () => {
  const [activeSites, setActiveSites] = useState<ArtisanalSite[]>([]);
  const [inactiveSites, setInactiveSites] = useState<ArtisanalSite[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const active_sites_data = await fetchTinybirdData(ACTIVE_SITES_API_URL);
        const inactive_sites_data = await fetchTinybirdData(
          INACTIVE_SITES_API_URL,
        );
        setActiveSites(active_sites_data);
        setInactiveSites(inactive_sites_data);
      } catch (error) {
        console.error("Error fetching site data:", error);
      }
    }
    getData();
  }, []);

  return { activeSites, inactiveSites };
};
