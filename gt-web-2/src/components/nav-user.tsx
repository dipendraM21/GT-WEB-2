"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="w-full px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-full bg-gray-200">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4 text-gray-400" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-white border border-gray-200 shadow-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-1.5 text-left">
                <Avatar className="h-8 w-8 rounded-full bg-gray-200">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                <Sparkles className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-900">Upgrade to Pro</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                <BadgeCheck className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-900">Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-900">Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 p-2 hover:bg-gray-50 cursor-pointer">
                <Bell className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-900">Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem className="gap-2 p-2 hover:bg-gray-50 cursor-pointer">
              <LogOut className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-900">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
