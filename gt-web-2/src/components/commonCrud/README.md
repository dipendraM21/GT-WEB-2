# TypeScript CommonCrud System

A comprehensive TypeScript CRUD system that provides reusable components for creating, reading, updating, and deleting data with proper typing and state management.

## Features

- **TypeScript Support**: Full TypeScript support with proper type definitions
- **Reusable Components**: Common form elements, tables, and CRUD operations
- **State Management**: Built-in state management for CRUD operations
- **API Integration**: Easy integration with REST APIs
- **Validation**: Form validation with Yup schemas
- **Pagination**: Built-in pagination support
- **Modal Forms**: Modal-based forms for add/edit operations
- **Delete Confirmation**: Built-in delete confirmation modals

## Quick Start

### 1. Create a CRUD API

```typescript
import { createCommonCrud } from "@/components/commonCrud/createCommonCrud";

const userCrudApi = createCommonCrud({
  apiName: "users",
  apiUrl: "/api/users",
  pageTitle: "User Management",
  initialState: {
    // Add any additional state here
  },
  reducers: {
    // Add custom reducers here
  },
  crudApi: {
    formCrud: {
      action_alias: "user",
    },
    tableCrud: {
      action_alias: "users",
    },
  },
});
```

### 2. Create a Form Component

```typescript
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getCommonCrudApiSafe } from "@/components/commonCrud/commonCrudStore";
import {
  CommonInputField,
  CommonSelectField,
} from "@/components/commonCrud/CommonElement/CommonInputField";

interface UserFormProps {
  toggle: () => void;
  moduleMode: "ADD" | "EDIT" | "DELETE";
  fetchRecord: Record<string, unknown>;
  isUpdateRecord: boolean;
}

const userValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
});

export const UserForm: React.FC<UserFormProps> = ({
  toggle,
  moduleMode,
  fetchRecord,
  isUpdateRecord,
}) => {
  const API = getCommonCrudApiSafe("users");
  const { useSubmitHandler } = API.crudApi.crudHandler;
  const { mutate, isPending } = useSubmitHandler();

  const formik = useFormik({
    initialValues: {
      name: isUpdateRecord ? (fetchRecord.name as string) || "" : "",
      email: isUpdateRecord ? (fetchRecord.email as string) || "" : "",
      role: isUpdateRecord ? (fetchRecord.role as string) || "" : "",
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      mutate({
        data: values,
        control: formik,
      });
    },
  });

  const roleOptions = [
    { value: "admin", label: "Administrator" },
    { value: "user", label: "User" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {moduleMode === "ADD" ? "Add New User" : "Edit User"}
          </h2>
          <button
            onClick={toggle}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <CommonInputField
            name="name"
            label="Full Name"
            placeholder="Enter full name"
            required
            value={formik.values.name}
            onChange={(value) => formik.setFieldValue("name", value)}
            errors={formik.errors}
            touched={formik.touched}
          />

          <CommonInputField
            name="email"
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            required
            value={formik.values.email}
            onChange={(value) => formik.setFieldValue("email", value)}
            errors={formik.errors}
            touched={formik.touched}
          />

          <CommonSelectField
            name="role"
            label="Role"
            placeholder="Select role"
            required
            options={roleOptions}
            value={formik.values.role}
            onChange={(value) =>
              formik.setFieldValue("role", value.value || "")
            }
            errors={formik.errors}
            touched={formik.touched}
          />

          <div className="flex gap-2 justify-end pt-4">
            <button
              type="button"
              onClick={toggle}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isPending}
            >
              {isPending
                ? "Saving..."
                : moduleMode === "ADD"
                ? "Create User"
                : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
```

### 3. Create a Table Component

```typescript
import React from "react";
import { getCommonCrudApiSafe } from "@/components/commonCrud/commonCrudStore";
import { CommonTable } from "@/components/core/Table/CommonTable";
import {
  ActionDropdown,
  ActionItem,
} from "@/components/core/Table/ActionDropdown";
import { Edit, Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const UserTable: React.FC = () => {
  const API = getCommonCrudApiSafe("users");
  const {
    useDataHandler,
    addRecordHandler,
    editRecordHandler,
    deleteRecordHandler,
  } = API.crudApi.crudHandler;
  const { data: userData, isLoading } = useDataHandler();

  const users = userData?.data || [];

  const getUserActions = (): ActionItem<User>[] => [
    {
      key: "edit",
      label: "Edit",
      icon: Edit,
      onClick: (user) => editRecordHandler({ data: user }),
    },
    {
      key: "delete",
      label: "Delete",
      icon: Trash2,
      onClick: (user) => deleteRecordHandler({ data: user }),
      isDestructive: true,
    },
  ];

  const userColumns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: User } }) => (
        <ActionDropdown<User>
          actions={getUserActions()}
          record={row.original}
        />
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Users</h2>
          <button
            onClick={() => addRecordHandler()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </div>

      <CommonTable<User>
        columns={userColumns}
        data={users}
        isLoading={isLoading}
        dataLength={userData?.totalRecords || 0}
        className="user-table"
        sortable={false}
        hasPagination={true}
        currentPage={userData?.currentPage || 1}
        totalPage={userData?.totalPages || 0}
        pageSize={userData?.limit || 10}
        defaultPageSize={10}
        showQuickJumper={true}
        onPageChange={(page, size) => console.log("Page changed:", page, size)}
      />
    </div>
  );
};
```

### 4. Create the Main Component

```typescript
import React from "react";
import {
  CommonFormElement,
  DeleteRecordModal,
} from "@/components/commonCrud/CommonElement/CommonFormElement";
import { UserForm } from "./UserForm";
import { UserTable } from "./UserTable";

export const UserManagement: React.FC = () => {
  return (
    <div className="p-6">
      <UserTable />

      {/* Form Modal */}
      <CommonFormElement form={UserForm} apiName="users" />

      {/* Delete Confirmation Modal */}
      <DeleteRecordModal apiName="users" />
    </div>
  );
};
```

## API Configuration

### CommonCrud Configuration

```typescript
interface CreateCommonCrudConfig {
  apiName: string; // Unique identifier for the API
  apiUrl: string; // Base API URL
  pageTitle: string; // Page title for modals
  initialState?: Partial<ModuleState>; // Initial state
  reducers?: Reducers; // Custom reducers
  crudApi?: Partial<CrudApiConfig>; // API configuration
}
```

### API Response Format

The system expects API responses in this format:

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

// For paginated data
interface PaginatedResponse<T> {
  data: T[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}
```

## Available Components

### Form Components

- `CommonInputField`: Text input with validation
- `CommonSelectField`: Select dropdown with options
- `CommonTextareaField`: Textarea input
- `CommonFormElement`: Form wrapper with modal

### Table Components

- `CommonCrudTable`: Table with built-in CRUD operations
- `CommonCrudTablePagination`: Pagination component

### Modal Components

- `DeleteRecordModal`: Delete confirmation modal
- `CommonLoader`: Loading spinner

## State Management

The system uses a simple store implementation that provides:

- State management for CRUD operations
- Form visibility control
- Selected record management
- Pagination state

## Error Handling

The system includes built-in error handling:

- Form validation errors
- API error handling
- Network error handling
- User-friendly error messages

## Best Practices

1. **Type Safety**: Always define proper TypeScript interfaces for your data
2. **Validation**: Use Yup schemas for form validation
3. **Error Handling**: Implement proper error handling in your forms
4. **Loading States**: Show loading states during API calls
5. **User Feedback**: Provide clear feedback for user actions

## Example: Coupon Management

See `src/components/admin/CouponsView/CouponListComplete.tsx` for a complete example of how to use the commonCrud system for coupon management.

## Migration from JavaScript

To migrate from the JavaScript version:

1. Replace `.js` files with `.tsx` files
2. Add proper TypeScript interfaces
3. Update component props to use TypeScript types
4. Replace `any` types with specific interfaces
5. Add proper error handling with TypeScript

## Troubleshooting

### Common Issues

1. **Type Errors**: Make sure all props have proper TypeScript interfaces
2. **API Errors**: Check that your API endpoints match the expected format
3. **Form Validation**: Ensure Yup schemas match your form fields
4. **State Management**: Verify that your CRUD API is properly registered

### Debug Tips

1. Use TypeScript strict mode for better type checking
2. Enable ESLint rules for TypeScript
3. Use console.log to debug API responses
4. Check browser network tab for API calls
