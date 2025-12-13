import { LucideIconType } from "@/types/common/LucideIcon";
import * as Icon from "lucide-react";

const LucideIcon = ({ iconName, className, onClick }: LucideIconType) => {
  const IconComp = Icon[iconName];
  return <IconComp onClick={onClick} className={className} />;
};

export default LucideIcon;
