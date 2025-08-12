"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import * as React from "react";

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
import CustomText from "./core/Text/CustomText";

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
      <SidebarMenu className="space-y-1">
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
                  className="w-full px-3 py-2.5 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200 group-data-[state=open]:bg-gray-50"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <div className="flex-shrink-0">
                          <item.icon className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
                        </div>
                      )}
                      <CustomText
                        variant="font-14-medium-20"
                        className="text-left text-gray-700 group-hover:text-gray-900"
                      >
                        {item.title}
                      </CustomText>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="ml-4 mt-1 space-y-1">
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className="px-3 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
                      >
                        <Link className="no-underline" href={subItem.url}>
                          <CustomText
                            variant="font-13-regular-20"
                            className="text-wrap-style-balance"
                          >
                            {subItem.title}
                          </CustomText>
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
