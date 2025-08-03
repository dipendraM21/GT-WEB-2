import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  CommonFormElement,
  DeleteRecordModal,
} from "../CommonElement/CommonFormElement";
import {
  CommonInputField,
  CommonSelectField,
  CommonTextareaField,
} from "../CommonElement/CommonInputField";
import { getCommonCrudApiSafe } from "../commonCrudStore";
import { createCommonCrud } from "../createCommonCrud";

// Define the User interface
interface User {
  id?: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  description?: string;
}

// Create the CRUD API for users
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

// Validation schema for the user form
const userValidationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
  status: Yup.string().required("Status is required"),
  description: Yup.string().max(
    500,
    "Description must be less than 500 characters"
  ),
});

// User Form Component
const UserForm: React.FC<{
  toggle: () => void;
  moduleMode: "ADD" | "EDIT" | "DELETE";
  fetchRecord: Record<string, unknown>;
  isUpdateRecord: boolean;
}> = ({ toggle, moduleMode, fetchRecord, isUpdateRecord }) => {
  const API = getCommonCrudApiSafe("users");
  const { useSubmitHandler } = API.crudApi.crudHandler;
  const { mutate, isPending } = useSubmitHandler();

  const formik = useFormik({
    initialValues: {
      name: isUpdateRecord ? (fetchRecord.name as string) || "" : "",
      email: isUpdateRecord ? (fetchRecord.email as string) || "" : "",
      role: isUpdateRecord ? (fetchRecord.role as string) || "" : "",
      status: isUpdateRecord
        ? (fetchRecord.status as string) || "active"
        : "active",
      description: isUpdateRecord
        ? (fetchRecord.description as string) || ""
        : "",
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
    { value: "manager", label: "Manager" },
    { value: "user", label: "User" },
    { value: "guest", label: "Guest" },
  ];

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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

          <CommonSelectField
            name="status"
            label="Status"
            placeholder="Select status"
            required
            options={statusOptions}
            value={formik.values.status}
            onChange={(value) =>
              formik.setFieldValue("status", value.value || "")
            }
            errors={formik.errors}
            touched={formik.touched}
          />

          <CommonTextareaField
            name="description"
            label="Description"
            placeholder="Enter description (optional)"
            rows={3}
            value={formik.values.description}
            onChange={(value) => formik.setFieldValue("description", value)}
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

// User Table Component
const UserTable: React.FC = () => {
  const API = getCommonCrudApiSafe("users");
  const {
    useDataHandler,
    addRecordHandler,
    editRecordHandler,
    deleteRecordHandler,
  } = API.crudApi.crudHandler;
  const { data, isLoading } = useDataHandler();

  // Mock table data - in real implementation, you'd use @tanstack/react-table
  const users = data?.data || [];

  const handleEdit = (user: User) => {
    editRecordHandler({ data: user });
  };

  const handleDelete = (user: User) => {
    deleteRecordHandler({ data: user });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user: User) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main User Management Component
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

export default UserManagement;
