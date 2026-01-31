"use client";

import CustomCursor from "@/components/CustomCursor";
import {useIsDesktop} from "@/hooks/useIsDesktop";
import {usePathname} from "next/navigation";

const DesktopOnlyCursor = () => {
  const isDesktop = useIsDesktop();
  const pathname = usePathname();

  // Don't show cursor on dashboard routes
  if (pathname.startsWith("/dashboard")) return null;

  return isDesktop ? <CustomCursor /> : null;
};

export default DesktopOnlyCursor;
