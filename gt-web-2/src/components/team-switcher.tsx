"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  if (!activeTeam) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="w-full px-3 py-2 hover:bg-gray-50 rounded-md transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-500 text-white">
                  <activeTeam.logo className="size-4" />
                </div>
                <div className="grid flex-1 text-left">
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {activeTeam.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {activeTeam.plan}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4 text-gray-400" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white border border-gray-200 shadow-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-gray-500 px-2 py-1">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border border-gray-200">
                  <team.logo className="size-4 shrink-0 text-gray-600" />
                </div>
                <span className="text-sm text-gray-900">{team.name}</span>
                <DropdownMenuShortcut className="text-xs text-gray-400">
                  ⌘{index + 1}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem className="gap-2 p-2 hover:bg-gray-50 cursor-pointer">
              <div className="flex size-6 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
                <Plus className="size-4 text-gray-600" />
              </div>
              <div className="font-medium text-gray-600">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
