"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/utils/functions";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSidebarProps {
  menuItems: MenuItemProps[];
  collapsed?: boolean;
  onToggle?: () => void;
}

const AdminSidebar = ({
  menuItems,
  collapsed = false,
  onToggle,
}: AdminSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-screen bg-white text-white flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-[270px]"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-800">
        {!collapsed && (
          <span className="font-bold text-lg whitespace-nowrap">
            Gayatri Admin
          </span>
        )}
        {onToggle && (
          <button
            onClick={onToggle}
            className="ml-auto text-gray-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <Accordion type="multiple" className="space-y-1">
          {menuItems?.map((item) => {
            const isActive =
              pathname === item.path ||
              item.subOption?.some((s) => pathname === s.path);

            return (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-none"
              >
                {item.isSubOption ? (
                  <>
                    <AccordionTrigger
                      className={cn(
                        "flex items-center justify-between px-2 py-3 text-sm font-medium rounded hover:bg-gray-800 transition",
                        isActive ? "bg-gray-800 text-white" : "text-gray-400"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-700 p-2 rounded">
                          {item.icon}
                        </span>
                        {!collapsed && item.title}
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="pl-10 py-2 space-y-1">
                      {item.subOption?.map((sub) => {
                        const isSubActive = pathname === sub.path;
                        return (
                          <Link
                            key={sub.title}
                            href={sub.path}
                            className={cn(
                              "block px-2 py-2 rounded hover:bg-gray-700 text-sm transition",
                              isSubActive
                                ? "bg-gray-700 text-white"
                                : "text-gray-400"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span className="bg-blue-800 p-1 rounded">
                                {sub.icon}
                              </span>
                              {!collapsed && sub.title}
                            </div>
                          </Link>
                        );
                      })}
                    </AccordionContent>
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center gap-2 px-2 py-3 text-sm rounded font-medium hover:bg-gray-800 transition",
                      isActive ? "bg-gray-800 text-white" : "text-gray-400"
                    )}
                  >
                    <span className="bg-gray-800 p-2 rounded">{item.icon}</span>
                    {!collapsed && item.title}
                  </Link>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
