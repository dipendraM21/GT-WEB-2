"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { menuItems } from "@/utils/menuItmData";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import { useState } from "react";

// Define the data type
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

// Define columns for the table
const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
        {row.getValue("role")}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColor =
        status === "Active"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800";
      return (
        <div
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor}`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "lastLogin",
    header: "Last Login",
    enableSorting: true,
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("lastLogin")}</div>
    ),
  },
];

// Dummy data
const dummyData: UserData[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15 10:30 AM",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-14 02:15 PM",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Manager",
    status: "Inactive",
    lastLogin: "2024-01-10 09:45 AM",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-15 11:20 AM",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15 08:30 AM",
  },
  {
    id: "6",
    name: "Diana Davis",
    email: "diana.davis@example.com",
    role: "User",
    status: "Inactive",
    lastLogin: "2024-01-08 04:10 PM",
  },
  {
    id: "7",
    name: "Edward Miller",
    email: "edward.miller@example.com",
    role: "Manager",
    status: "Active",
    lastLogin: "2024-01-15 12:45 PM",
  },
  {
    id: "8",
    name: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-14 06:30 PM",
  },
];

export default function Page({ children }: { children: React.ReactNode }) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleRowClick = (row: UserData) => {
    console.log("Clicked row:", row);
    // You can add navigation or modal logic here
  };

  return (
    <SidebarProvider>
      <AppSidebar data={menuItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {/* <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem> */}
                {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                {/* <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem> */}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="items-center gap-2 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 h-[calc(100vh-4rem)] overflow-auto pt-4">
          {/* <div className="py-6">
            <AdminCard
              heading="User Management"
              // subtitle="Manage your application users and their permissions"
              cardVariant="selectStoreCard"
            >
              <CommonTable
                columns={columns}
                data={dummyData}
                sorting={sorting}
                setSorting={setSorting}
                onRowClick={handleRowClick}
                dataLength={dummyData.length}
                className="user-table"
                isLoading={false}
              />
            </AdminCard>
          </div> */}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
