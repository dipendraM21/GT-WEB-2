"use client";

import { Download, Edit, Eye, Share, Trash2 } from "lucide-react";
import { ActionDropdown, ActionItem } from "./ActionDropdown";

// Example 1: User Management Table
interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const getUserActions = (): ActionItem<UserData>[] => [
  {
    key: "view",
    label: "View Details",
    icon: Eye,
    onClick: (user) => console.log("View user:", user),
  },
  {
    key: "edit",
    label: "Edit User",
    icon: Edit,
    onClick: (user) => console.log("Edit user:", user),
  },
  {
    key: "delete",
    label: "Delete User",
    icon: Trash2,
    onClick: (user) => console.log("Delete user:", user),
    isDestructive: true,
  },
];

// Example 2: Document Management Table
interface DocumentData {
  id: string;
  title: string;
  type: string;
  size: string;
}

const getDocumentActions = (): ActionItem<DocumentData>[] => [
  {
    key: "view",
    label: "View Document",
    icon: Eye,
    onClick: (doc) => console.log("View document:", doc),
  },
  {
    key: "download",
    label: "Download",
    icon: Download,
    onClick: (doc) => console.log("Download document:", doc),
  },
  {
    key: "share",
    label: "Share",
    icon: Share,
    onClick: (doc) => console.log("Share document:", doc),
  },
  {
    key: "delete",
    label: "Delete",
    icon: Trash2,
    onClick: (doc) => console.log("Delete document:", doc),
    isDestructive: true,
  },
];

// Example 3: Order Management Table
interface OrderData {
  id: string;
  customerName: string;
  amount: number;
  status: string;
}

const getOrderActions = (): ActionItem<OrderData>[] => [
  {
    key: "view",
    label: "View Order",
    icon: Eye,
    onClick: (order) => console.log("View order:", order),
  },
  {
    key: "edit",
    label: "Edit Order",
    icon: Edit,
    onClick: (order) => console.log("Edit order:", order),
  },
  {
    key: "cancel",
    label: "Cancel Order",
    icon: Trash2,
    onClick: (order) => console.log("Cancel order:", order),
    isDestructive: true,
  },
];

// Usage in table columns
export const userTableColumns = [
  // ... other columns
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: { original: UserData } }) => (
      <ActionDropdown<UserData>
        actions={getUserActions()}
        record={row.original}
      />
    ),
  },
];

export const documentTableColumns = [
  // ... other columns
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: { original: DocumentData } }) => (
      <ActionDropdown<DocumentData>
        actions={getDocumentActions()}
        record={row.original}
      />
    ),
  },
];

export const orderTableColumns = [
  // ... other columns
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: { row: { original: OrderData } }) => (
      <ActionDropdown<OrderData>
        actions={getOrderActions()}
        record={row.original}
      />
    ),
  },
];

// Example with custom styling
export const customStyledActionDropdown = (
  <ActionDropdown<UserData>
    actions={getUserActions()}
    record={{
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
    }}
    triggerClassName="h-10 w-10 p-0 hover:bg-blue-100"
    contentClassName="bg-white border border-gray-200 shadow-lg"
    itemClassName="text-gray-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
  />
);
