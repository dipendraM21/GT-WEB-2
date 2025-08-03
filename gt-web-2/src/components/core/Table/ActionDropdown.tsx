"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LucideIcon, MoreHorizontal } from "lucide-react";

export interface ActionItem<T = object> {
  key: string;
  label: string;
  icon: LucideIcon;
  onClick: (record: T) => void;
  disabled?: boolean;
  isDestructive?: boolean;
}

export interface ActionDropdownProps<T = object> {
  actions: ActionItem<T>[];
  record: T;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
}

export const ActionDropdown = <T extends object>({
  actions,
  record,
  className = "",
  triggerClassName = "h-8 w-8 p-0 hover:bg-gray-100",
  contentClassName = "bg-gray-800 border-gray-700",
  itemClassName = "text-white hover:text-black hover:bg-gray-600 cursor-pointer transition-colors duration-200",
}: ActionDropdownProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={triggerClassName}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={contentClassName}>
        {actions?.map((action) => {
          const IconComponent = action.icon;
          return (
            <DropdownMenuItem
              key={action.key}
              onClick={() => action.onClick(record)}
              disabled={action.disabled}
              className={`${itemClassName} ${
                action.isDestructive ? "text-red-400 hover:text-red-300" : ""
              }`}
            >
              <IconComponent className="mr-2 h-4 w-4" />
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
