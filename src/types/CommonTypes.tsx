/** @format */

import type { ElementType } from "react";

// this is the nav item props interface
export interface NavItemProps {
  href: string;
  icon: ElementType;
  label: string;
  active: boolean;
  collapsed?: boolean;
}
