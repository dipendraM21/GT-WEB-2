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
      className="bg-white border-r border-gray-200"
      {...props}
    >
      {/* <SidebarHeader className="px-4 py-4 border-b border-gray-100"> */}
      {/* <TeamSwitcher teams={data.teams} /> */}
      {/* <Link
          href="/admin-dashboard"
          className="flex items-center justify-center"
        >
          <Image
            src={gtLogo}
            alt="Gayatri Travels Logo"
            className="h-12 w-auto object-contain transition-transform hover:scale-105"
            priority
          />
        </Link> */}
      {/* </SidebarHeader> */}
      <SidebarHeader className="pt-4 flex flex-col h-full">
        <SidebarContent className="px-1 py-6">
          <NavMain items={menuItems || []} />
        </SidebarContent>
      </SidebarHeader>

      <SidebarFooter className="px-4 py-4 border-t border-gray-100">
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
