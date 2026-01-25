'use client';

import CustomCursor from '@/components/CustomCursor';
import { useIsDesktop } from '@/hooks/useIsDesktop';

const DesktopOnlyCursor = () => {
  const isDesktop = useIsDesktop();
  return isDesktop ? <CustomCursor /> : null;
};

export default DesktopOnlyCursor;
