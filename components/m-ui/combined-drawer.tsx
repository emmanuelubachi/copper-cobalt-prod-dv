"use client";
import { useEffect, useState } from "react";
import LargeScreenDrawer from "./large-screen-drawer";
import MobileBottomDrawer from "./mobile-bottom-drawer";
import useDeviceType from "@/hooks/useDeviceType";

export default function CombinedDrawer() {
  const { isMobile } = useDeviceType();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileBottomDrawer /> : <LargeScreenDrawer />;
}
