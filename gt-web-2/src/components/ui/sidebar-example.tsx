"use client";

import {
  BarChart3,
  ChevronRight,
  CreditCard,
  FileText,
  Home,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./sidebar";

export function SidebarExample() {
  return (
    <SidebarProvider>
      <Sidebar>
        {/* <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-xs font-bold">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Acme Inc</span>
              <span className="text-xs text-muted-foreground">Enterprise</span>
            </div>
          </div>
        </SidebarHeader> */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>PLATFORM</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#dashboard">
                      <Home className="h-4 w-4" />
                      <span>Dashboard</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#users">
                      <Users className="h-4 w-4" />
                      <span>Users</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#fares">
                      <BarChart3 className="h-4 w-4" />
                      <span>Fares</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#accounting">
                      <CreditCard className="h-4 w-4" />
                      <span>Accounting & Reports</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#queues">
                      <FileText className="h-4 w-4" />
                      <span>Queues</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#transactions">
                      <FileText className="h-4 w-4" />
                      <span>Transactions</span>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <span className="text-sm font-medium">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">shadcn</span>
              <span className="text-xs text-muted-foreground">
                m@example.com
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="rounded-lg border bg-card p-8">
            <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
            <p className="text-muted-foreground">
              This is an example of the improved sidebar with proper text
              alignment and right arrow positioning.
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
