# ActionDropdown Component

A reusable dropdown menu component for table actions that can be used across all tables in the application.

## Features

- **Type-safe**: Uses TypeScript generics for better type safety
- **Customizable**: Supports custom styling for trigger, content, and menu items
- **Flexible**: Can be used with any data type
- **Consistent**: Provides a unified look and feel across all tables
- **Accessible**: Includes proper ARIA labels and keyboard navigation

## Basic Usage

```tsx
import {
  ActionDropdown,
  ActionItem,
} from "@/components/core/Table/ActionDropdown";
import { Eye, Edit, Trash2 } from "lucide-react";

// Define your data type
interface UserData {
  id: string;
  name: string;
  email: string;
}

// Define actions
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

// Use in table column
const columns = [
  // ... other columns
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionDropdown<UserData>
        actions={getUserActions()}
        record={row.original}
      />
    ),
  },
];
```

## Props

### ActionDropdownProps<T>

| Prop               | Type              | Default                                                                                         | Description                                       |
| ------------------ | ----------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `actions`          | `ActionItem<T>[]` | -                                                                                               | Array of action items to display                  |
| `record`           | `T`               | -                                                                                               | The data record for the current row               |
| `className`        | `string`          | `""`                                                                                            | Additional CSS classes for the dropdown container |
| `triggerClassName` | `string`          | `"h-8 w-8 p-0 hover:bg-gray-100"`                                                               | CSS classes for the trigger button                |
| `contentClassName` | `string`          | `"bg-gray-800 border-gray-700"`                                                                 | CSS classes for the dropdown content              |
| `itemClassName`    | `string`          | `"text-white hover:text-black hover:bg-gray-600 cursor-pointer transition-colors duration-200"` | CSS classes for menu items                        |

### ActionItem<T>

| Prop            | Type                  | Default | Description                                                  |
| --------------- | --------------------- | ------- | ------------------------------------------------------------ |
| `key`           | `string`              | -       | Unique identifier for the action                             |
| `label`         | `string`              | -       | Display text for the action                                  |
| `icon`          | `LucideIcon`          | -       | Icon component to display                                    |
| `onClick`       | `(record: T) => void` | -       | Function to call when action is clicked                      |
| `disabled`      | `boolean`             | `false` | Whether the action is disabled                               |
| `isDestructive` | `boolean`             | `false` | Whether this is a destructive action (will be styled in red) |

## Examples

### Basic Example

```tsx
<ActionDropdown<UserData> actions={getUserActions()} record={userData} />
```

### Custom Styling

```tsx
<ActionDropdown<UserData>
  actions={getUserActions()}
  record={userData}
  triggerClassName="h-10 w-10 p-0 hover:bg-blue-100"
  contentClassName="bg-white border border-gray-200 shadow-lg"
  itemClassName="text-gray-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer transition-colors duration-200"
/>
```

### Conditional Actions

```tsx
const getConditionalActions = (user: UserData): ActionItem<UserData>[] => {
  const actions: ActionItem<UserData>[] = [
    {
      key: "view",
      label: "View Details",
      icon: Eye,
      onClick: (user) => console.log("View user:", user),
    },
  ];

  // Only show edit action for admin users
  if (user.role === "admin") {
    actions.push({
      key: "edit",
      label: "Edit User",
      icon: Edit,
      onClick: (user) => console.log("Edit user:", user),
    });
  }

  // Only show delete action for non-admin users
  if (user.role !== "admin") {
    actions.push({
      key: "delete",
      label: "Delete User",
      icon: Trash2,
      onClick: (user) => console.log("Delete user:", user),
      isDestructive: true,
    });
  }

  return actions;
};
```

### Disabled Actions

```tsx
const getActionsWithDisabled = (user: UserData): ActionItem<UserData>[] => [
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
    disabled: user.status === "inactive", // Disable for inactive users
  },
  {
    key: "delete",
    label: "Delete User",
    icon: Trash2,
    onClick: (user) => console.log("Delete user:", user),
    isDestructive: true,
    disabled: user.role === "admin", // Disable for admin users
  },
];
```

## Migration Guide

### From Inline DropdownMenu

**Before:**

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
      <span className="sr-only">Open menu</span>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
    <DropdownMenuItem
      onClick={() => handleDetails(row.original)}
      className="text-white hover:text-black hover:bg-gray-600 cursor-pointer transition-colors duration-200"
    >
      <Eye className="mr-2 h-4 w-4" />
      Details
    </DropdownMenuItem>
    <DropdownMenuItem
      onClick={() => handleEdit(row.original)}
      className="text-white hover:text-black hover:bg-gray-600 cursor-pointer transition-colors duration-200"
    >
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**After:**

```tsx
const getTableActions = (): ActionItem<UserData>[] => [
  {
    key: "details",
    label: "Details",
    icon: Eye,
    onClick: handleDetails,
  },
  {
    key: "edit",
    label: "Edit",
    icon: Edit,
    onClick: handleEdit,
  },
];

<ActionDropdown<UserData> actions={getTableActions()} record={row.original} />;
```

## Best Practices

1. **Define actions outside the component** to avoid recreating them on every render
2. **Use descriptive keys** for better debugging and testing
3. **Group related actions** together in the array
4. **Use appropriate icons** from Lucide React
5. **Mark destructive actions** with `isDestructive: true`
6. **Handle disabled states** appropriately
7. **Keep action labels concise** and clear

## Accessibility

The component includes:

- Proper ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- Semantic HTML structure
