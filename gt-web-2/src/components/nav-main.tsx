"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import * as React from "react";
import { Text } from "theme-ui";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon | React.ComponentType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
        Platform
      </SidebarGroupLabel> */}
      <SidebarMenu className="space-y-[20px]">
        {items?.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="w-full px-4 py-3 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <div className="flex-shrink-0">
                          <item.icon className="h-5 w-5 text-gray-500" />
                        </div>
                      )}
                      <Text variant="Maison16Regular20" className="text-left">
                        {item.title}
                      </Text>
                    </div>
                    <ChevronRight className="h-5 mr-[-10px] w-5 text-gray-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="ml-6 mt-2 space-y-1">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                      >
                        <Link className="no-underline" href={subItem.url}>
                          <Text
                            variant="Maison14Regular20"
                            className="text-wrap-style-balance"
                          >
                            {subItem.title}
                          </Text>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
