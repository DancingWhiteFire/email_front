import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type IconName = {
  [K in keyof typeof Icons]: (typeof Icons)[K] extends LucideIcon ? K : never;
}[keyof typeof Icons];

export interface LucideIconType {
  iconName: IconName;
  className?: string;
  onClick?: () => void;
}
