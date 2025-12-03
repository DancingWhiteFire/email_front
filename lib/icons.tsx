import type { IconType } from "react-icons";

export function createIconComponent(Icon: IconType): React.ComponentType<{ className?: string }> {
    return Icon as React.ComponentType<{ className?: string }>;
}