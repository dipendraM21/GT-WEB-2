"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { menuItems } from "@/utils/menuItmData";
import { usePathname } from "next/navigation";

export default function Page({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Function to get page title based on pathname
  const getPageTitle = (path: string) => {
    const pathSegments = path.split("/").filter(Boolean);
    const currentSegment = pathSegments[pathSegments.length - 1];

    // Convert path to readable title
    const titleMap: { [key: string]: string } = {
      dashboard: "Dashboard",
      "user-list": "User Management",
      coupons: "Coupon Management",
      "add-coupon": "Add Coupon",
      "markup-management": "Markup Management",
      "booking-management": "Booking Management",
      "my-bookings": "My Bookings",
      "ledger-management": "Ledger Management",
      "cancellation-queues": "Cancellation Queues",
      "reschedule-queues": "Reschedule Queues",
      "hold-queues": "Hold Queues",
      "transaction-management": "Transaction Management",
      "upload-balance": "Upload Balance",
    };

    return titleMap[currentSegment] || "Current Page";
  };

  const currentPageTitle = getPageTitle(pathname);

  return (
    <SidebarProvider>
      <AppSidebar data={menuItems} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className=" ml-auto flex flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
