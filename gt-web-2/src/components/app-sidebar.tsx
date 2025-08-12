"use client";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  type LucideIcon,
} from "lucide-react";
import * as React from "react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data?: {
    title: string;
    url: string;
    icon?: LucideIcon | React.ComponentType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}

export function AppSidebar({ data: menuItems, ...props }: AppSidebarProps) {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-white border-r border-gray-200 shadow-sm"
      {...props}
    >
      <SidebarHeader className="px-3 py-4">
        {/* Logo or title can go here */}
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <NavMain items={menuItems || []} />
      </SidebarContent>

      <SidebarFooter className="px-3 py-4 border-t border-gray-100">
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
